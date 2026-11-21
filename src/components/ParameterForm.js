import { dispatchEvent } from '../utils/Events.js';
import ParameterObject, { 
  defaultParameterSetFactory, 
  getNullParameter, 
  defaultProperty,
  isNotNull
} from '../models/ParameterObject.js';

const DISPLAY_OPTIONS = [
  { text: "Not initially expanded", value: false },
  { text: "Always expanded", value: true }
];

const EDIT_LINK_OPTIONS = [
  { text: "False", value: "false" },
  { text: "True", value: "true" }
];

const READ_WRITE_PARAMS = {
  RELATIONSHIP_SOURCE_FILTERS: {
    label: "Source Filter List",
    help: "You may add multiple filters for the user's selection (optional). Enter as a JSON array."
  },
  RELATIONSHIP_TARGET: {
    label: "Target",
    help: "The target class attribute for this relationship (optional)"
  }
};

function oneHopRelations(relMeta) {
  const rels = Array.isArray(relMeta.multiHopRelation) && relMeta.multiHopRelation.length > 0
    ? relMeta.multiHopRelation
    : relMeta.oneHopRelation;

  if (isNotNull(relMeta) && isNotNull(rels)) {
    return rels.reduce((acc, oneHop) => {
      if (oneHop.fkClassID == relMeta.fkClassID) {
        acc.push(oneHop);
      }
      return acc;
    }, []);
  }
  return [];
}

function getRelationshipTarget(relationModel) {
  const oneHops = oneHopRelations(relationModel);
  
  return oneHops.map((oh) => ({
    id: oh.pkClassID,
    text: `${oh.fqPkClassName}:${oh.fkAttributeName}`,
    value: oh.fqPkClassName,
    attributeName: oh.fkAttributeName,
    attributeId: oh.fkAttrId,
    fkColumn: oh.fkColumn,
    fqPkClassName: oh.fqPkClassName
  }));
}

class ParameterForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._model = null;
    this._initializedModel = {};
    this._parameters = {};
  }

  static get observedAttributes() {
    return ['model', 'saving'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'model') {
        try {
          this._model = JSON.parse(newValue);
        } catch (e) {
          this._model = null;
        }
        this._initModel();
        this.render();
      } else if (name === 'saving') {
        this.render();
      }
    }
  }

  connectedCallback() {
    try {
      const modelAttr = this.getAttribute('model');
      this._model = modelAttr ? JSON.parse(modelAttr) : null;
    } catch (e) {
      this._model = null;
    }
    this._initModel();
    this.render();
    this._attachListeners();
  }

  disconnectedCallback() {
    this._detachListeners();
  }

  _initModel() {
    if (!this._model) {
      this._initializedModel = {};
      this._parameters = {};
      return;
    }

    const params = defaultParameterSetFactory(this._model.relationID);

    Object.keys(this._model.displayParams || {}).forEach((key) => {
      const param = params[key];
      if (param) {
        param.defaultValue = this._model.displayParams[key];
      }
      if (key === "RELATIONSHIP_TARGET_CLASS") {
        param.options = getRelationshipTarget(this._model);
      }
    });

    this._initializedModel = {
      relationID: this._model.relationID,
      name: this._model.name,
      parameters: params,
      oneHopRelation: this._model.oneHopRelation || this._model.multiHopRelation,
      fkClassID: this._model.fkClassID,
      pkClassID: this._model.pkClassID,
      pkClassName: this._model.pkClassName,
      fqPkClassName: this._model.fqPkClassName,
      fkAid: this._model.fkAid,
      fkAttributeName: this._model.fkAttributeName
    };

    this._parameters = params;
  }

  _attachListeners() {
    this.shadowRoot.addEventListener('parameter-changed', this._handleParameterChange.bind(this));
    this.shadowRoot.addEventListener('save-clicked', this._handleSave.bind(this));
    this.shadowRoot.addEventListener('cancel-clicked', this._handleCancel.bind(this));
  }

  _detachListeners() {
    this.shadowRoot.removeEventListener('parameter-changed', this._handleParameterChange);
    this.shadowRoot.removeEventListener('save-clicked', this._handleSave);
    this.shadowRoot.removeEventListener('cancel-clicked', this._handleCancel);
  }

  _handleParameterChange(event) {
    const { parameter, value, data } = event.detail;
    
    // Handle query ID/lookup switching
    if (parameter === "RELATIONSHIP_QUERY_ID" && value !== "" && !Number.isInteger(Number(value))) {
      this._parameters["RELATIONSHIP_QUERY_LOOKUP"] = this._parameters[parameter];
      this._parameters["RELATIONSHIP_QUERY_LOOKUP"].value = value;
      this._parameters["RELATIONSHIP_QUERY_ID"] = getNullParameter(
        this._initializedModel.relationID,
        "RELATIONSHIP_QUERY_ID"
      );
    } else if (parameter === "RELATIONSHIP_QUERY_ID") {
      this._parameters["RELATIONSHIP_QUERY_LOOKUP"] = getNullParameter(
        this._initializedModel.relationID,
        "RELATIONSHIP_QUERY_LOOKUP"
      );
      this._parameters[parameter].value = value;
    } else if (parameter === "RELATIONSHIP_TARGET_CLASS") {
      const options = data?.options || [];
      const selectedOption = options.find(opt => opt.fqPkClassName === value);
      if (selectedOption) {
        this._parameters["RELATIONSHIP_TARGET_CLASS"].value = selectedOption.fqPkClassName;
        this._parameters["RELATIONSHIP_TARGET_ATTRIBUTE_COLUMN"].value = selectedOption.fkColumn;
      }
    } else {
      if (this._parameters[parameter]) {
        this._parameters[parameter].value = value;
      }
    }

    dispatchEvent(this, 'parameter-changed', {
      parameter,
      value,
      allParameters: this._parameters
    });
  }

  _handleSave() {
    const params = [];
    Object.keys(this._parameters).forEach((key) => {
      const p = this._parameters[key];
      if (p.changed && (p.id !== undefined || p.id !== null)) {
        params.push(p.toJSON());
      }
    });

    const filteredParams = params.filter((p) => p.id !== undefined);

    dispatchEvent(this, 'parameters-save', {
      relationID: this._initializedModel.relationID,
      parameters: filteredParams
    });
  }

  _handleCancel() {
    this._initModel();
    this.render();
  }

  _getParamValue(key) {
    const param = this._parameters[key];
    return param ? param.value : '';
  }

  _renderReadWriteParams() {
    return Object.keys(READ_WRITE_PARAMS).map((key) => {
      const p = this._parameters[key];
      const local = READ_WRITE_PARAMS[key];
      const value = p ? p.value : '';
      const parameter = p ? p.parameter : key;

      return `
        <form-input
          value="${value}"
          label="${local.label}"
          parameter="${parameter}"
          help="${local.help}"
          rows="1">
        </form-input>
      `;
    }).join('');
  }

  render() {
    if (!this._model) {
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; }
          .section-head { font-size: var(--font-size-lg, 1.25rem); font-weight: 600; }
        </style>
        <div>
          <h4 class="section-head">Properties</h4>
        </div>
      `;
      return;
    }

    const relatedTargets = getRelationshipTarget(this._initializedModel);
    const queryValue = this._getParamValue("RELATIONSHIP_QUERY_LOOKUP") || 
                       this._getParamValue("RELATIONSHIP_QUERY_ID") || 
                       "Default";

    this.shadowRoot.innerHTML = `
      <style>
        :host { 
          display: block;
          padding: var(--spacing-md, 1rem);
        }
        
        .section-head { 
          font-size: var(--font-size-lg, 1.25rem); 
          font-weight: 600; 
          margin-bottom: var(--spacing-md, 1rem);
          color: var(--text-color, #333);
        }
        
        .rel-props {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm, 0.5rem);
        }
      </style>
      
      <div>
        <h4 class="section-head">Properties</h4>
        
        <form class="rel-props" onsubmit="return false;">
          <form-readonly 
            label="RelationID" 
            value="${this._initializedModel.relationID}">
          </form-readonly>
          
          <form-readonly 
            label="Name" 
            value="${this._initializedModel.name}">
          </form-readonly>
          
          <form-readonly 
            label="Foreign Key Attribute" 
            value="${this._initializedModel.fkAttributeName || ''}">
          </form-readonly>
          
          <form-readonly 
            label="Foreign Key Attribute ID" 
            value="${this._initializedModel.fkAid || ''}">
          </form-readonly>
          
          <form-input
            value="${this._getParamValue("RELATIONSHIP_LABEL")}"
            label="Label"
            parameter="RELATIONSHIP_LABEL"
            help="This label is used in the EDR display.">
          </form-input>
          
          <form-input
            value="${this._getParamValue("RELATIONSHIP_DESCRIPTION")}"
            label="Description"
            parameter="RELATIONSHIP_DESCRIPTION"
            help="To provide the user with more information about the relationship."
            rows="5">
          </form-input>
          
          <tab-view>
            <tab-list role="tablist">
              <tab-button class="mr1 sub active" role="tab" name="Expansion" aria-selected="true" tabindex="0">
                Expansion
              </tab-button>
              <tab-button class="mr1 sub" role="tab" name="Data" aria-selected="false" tabindex="-1">
                Data
              </tab-button>
              <tab-button class="mr1 sub" role="tab" name="Advanced" aria-selected="false" tabindex="-1">
                Advanced
              </tab-button>
            </tab-list>
            
            <tab-panel name="Expansion" class="active" aria-label="Expansion" role="tabpanel">
              <form-select
                value="${this._getParamValue("RELATIONSHIP_DISPLAY_EXPANDED")}"
                label="Expanded"
                parameter="RELATIONSHIP_DISPLAY_EXPANDED"
                help="This controls the initial display. Should this relationship expand automatically on page load?"
                default-value="false"
                options='${JSON.stringify(DISPLAY_OPTIONS)}'>
              </form-select>
              
              <form-input
                value="${this._getParamValue("RELATIONSHIP_DISPLAY_SELECTOR")}"
                label="HTML Selector"
                parameter="RELATIONSHIP_DISPLAY_SELECTOR"
                help="To place this relationship in a specific place in the page, enter an HTML/CSS selector."
                rows="1">
              </form-input>
            </tab-panel>
            
            <tab-panel name="Data" aria-label="Data" role="tabpanel">
              <div class="form-group">
                <label class="label">Query:</label>
                <iq-named-text-selector 
                  data-type="filter"
                  data-initial-value="${queryValue}">
                </iq-named-text-selector>
                <em class="help">This controls the query used to produce the display.</em>
              </div>
            </tab-panel>
            
            <tab-panel name="Advanced" aria-label="Advanced" role="tabpanel">
              <form-select
                value="${this._getParamValue("RELATIONSHIP_EDIT_LINK_ON_CREATE")}"
                label="Require edit on create"
                parameter="RELATIONSHIP_EDIT_LINK_ON_CREATE"
                help="Require the user to fill out the form when they create links. No automatic link creation."
                default-value="false"
                options='${JSON.stringify(EDIT_LINK_OPTIONS)}'>
              </form-select>
              
              <form-select
                value="${this._getParamValue("RELATIONSHIP_TARGET_CLASS")}"
                label="Select the target Class for this relationship"
                parameter="RELATIONSHIP_TARGET_CLASS"
                help="If the link class has multiple Relation attributes, this lets you select one for the Choose function"
                default-value=""
                options='${JSON.stringify(relatedTargets.length > 1 ? relatedTargets : [])}'>
              </form-select>
              
              ${this._renderReadWriteParams()}
            </tab-panel>
          </tab-view>
          
          <ok-cancel-buttons ${this.hasAttribute('saving') ? 'saving' : ''}></ok-cancel-buttons>
        </form>
      </div>
    `;

    // Re-attach listeners after render
    this._attachListeners();
  }
}

customElements.define('parameter-form', ParameterForm);
export default ParameterForm;
