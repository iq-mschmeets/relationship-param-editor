import { dispatchEvent } from '../utils/Events.js';
import ParameterService from '../services/ParameterService.js';
import getMessageFromError from '../utils/XHRError.js';

const MESSAGE_DURATION = 1250;

class RelatedClassProperties extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._models = [];
    this._selected = null;
    this._saving = false;
  }

  static get observedAttributes() {
    return ['models', 'class-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'models') {
        try {
          this._models = JSON.parse(newValue) || [];
        } catch (e) {
          this._models = [];
        }
        this.render();
      }
    }
  }

  connectedCallback() {
    try {
      const modelsAttr = this.getAttribute('models');
      this._models = modelsAttr ? JSON.parse(modelsAttr) : [];
    } catch (e) {
      this._models = [];
    }
    this.render();
    this._attachListeners();
  }

  disconnectedCallback() {
    this._detachListeners();
  }

  _attachListeners() {
    this.shadowRoot.addEventListener('class-selected', this._handleClassSelection.bind(this));
    this.shadowRoot.addEventListener('parameters-save', this._handleSave.bind(this));
  }

  _detachListeners() {
    this.shadowRoot.removeEventListener('class-selected', this._handleClassSelection);
    this.shadowRoot.removeEventListener('parameters-save', this._handleSave);
  }

  _handleClassSelection(event) {
    this._selected = event.detail.selected;
    this.render();
  }

  _getSelectedModel() {
    if (!this._selected) return null;
    return this._models.find(model => model.relationID === this._selected) || null;
  }

  async _handleSave(event) {
    const { parameters } = event.detail;
    
    this._saving = true;
    this.render();

    try {
      const response = await ParameterService(parameters);
      
      setTimeout(() => {
        this._saving = false;
        this.render();
      }, MESSAGE_DURATION);

      // Trigger refresh
      dispatchEvent(this, 'parameters-saved', {
        success: true,
        response
      });

    } catch (error) {
      this._saving = false;
      this.render();
      
      const message = await getMessageFromError(error);
      alert(message);
      
      dispatchEvent(this, 'parameters-saved', {
        success: false,
        error
      });
    }
  }

  render() {
    const selectedModel = this._getSelectedModel();
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .container {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--spacing-lg, 1.5rem);
          min-height: 500px;
        }
        
        .class-list-col {
          border-right: 1px solid var(--border-color, #ddd);
          padding-right: var(--spacing-md, 1rem);
        }
        
        .class-form-col {
          padding-left: var(--spacing-md, 1rem);
        }
      </style>
      
      <div class="container">
        <div class="class-list-col">
          <related-class-list models='${JSON.stringify(this._models)}'></related-class-list>
        </div>
        <div class="class-form-col">
          <parameter-form 
            model='${JSON.stringify(selectedModel)}'
            ${this._saving ? 'saving' : ''}>
          </parameter-form>
        </div>
      </div>
    `;

    // Re-attach listeners after render
    this._attachListeners();
  }
}

customElements.define('related-class-properties', RelatedClassProperties);
export default RelatedClassProperties;
