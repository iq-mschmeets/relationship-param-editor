import ClassService from '../services/ClassService.js';
import getMessageFromError from '../utils/XHRError.js';

class RelationParamEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._models = [];
    this._classId = null;
  }

  static get observedAttributes() {
    return ['class-id', 'models'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'class-id') {
        this._classId = newValue;
        if (newValue) {
          this._loadClass();
        }
      } else if (name === 'models') {
        try {
          this._models = JSON.parse(newValue) || [];
          this.render();
        } catch (e) {
          this._models = [];
        }
      }
    }
  }

  connectedCallback() {
    this._classId = this.getAttribute('class-id');
    
    try {
      const modelsAttr = this.getAttribute('models');
      this._models = modelsAttr ? JSON.parse(modelsAttr) : [];
    } catch (e) {
      this._models = [];
    }

    this.render();

    if (this._classId) {
      this._loadClass();
    }
  }

  async _loadClass() {
    try {
      const classObj = await ClassService(this._classId);
      this._models = classObj.relationships || [];
      this.render();
    } catch (error) {
      const message = await getMessageFromError(error);
      alert(message);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-family, system-ui, sans-serif);
        }
        
        .editor-container {
          padding: var(--spacing-md, 1rem);
        }
      </style>
      
      <div class="editor-container">
        <related-class-properties 
          models='${JSON.stringify(this._models)}'
          class-id="${this._classId || ''}">
        </related-class-properties>
      </div>
    `;
  }
}

customElements.define('relation-param-editor', RelationParamEditor);
export default RelationParamEditor;
