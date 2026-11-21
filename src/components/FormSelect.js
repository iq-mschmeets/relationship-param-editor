import { dispatchEvent } from '../utils/Events.js';

class FormSelect extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._options = [];
  }

  static get observedAttributes() {
    return ['label', 'value', 'parameter', 'help', 'default-value', 'options'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'options') {
        try {
          this._options = JSON.parse(newValue) || [];
        } catch (e) {
          this._options = [];
        }
      }
      this.render();
    }
  }

  connectedCallback() {
    try {
      const optionsAttr = this.getAttribute('options');
      this._options = optionsAttr ? JSON.parse(optionsAttr) : [];
    } catch (e) {
      this._options = [];
    }
    this.render();
    this.shadowRoot.querySelector('select').addEventListener('change', this._handleChange.bind(this));
  }

  disconnectedCallback() {
    const select = this.shadowRoot.querySelector('select');
    if (select) {
      select.removeEventListener('change', this._handleChange);
    }
  }

  _handleChange(event) {
    event.preventDefault();
    
    const parameter = this.getAttribute('parameter');
    if (parameter) {
      dispatchEvent(this, 'parameter-changed', {
        parameter: parameter,
        value: event.target.value,
        data: {
          options: this._options
        }
      });
    }
  }

  getValue() {
    const select = this.shadowRoot.querySelector('select');
    return select ? select.value : '';
  }

  _renderOptions() {
    const value = this.getAttribute('value') || this.getAttribute('default-value') || '';
    
    let html = '<option value=""></option>';
    
    this._options.forEach((opt) => {
      const optValue = typeof opt.value !== 'undefined' ? opt.value : opt;
      const optText = opt.text || optValue;
      const selected = String(optValue) === String(value) ? ' selected' : '';
      html += `<option value="${optValue}"${selected}>${optText}</option>`;
    });
    
    return html;
  }

  render() {
    const label = this.getAttribute('label') || '';
    const help = this.getAttribute('help') || '';
    const parameter = this.getAttribute('parameter') || '';
    const value = this.getAttribute('value') || this.getAttribute('default-value') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: var(--spacing-md, 1rem);
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs, 0.25rem);
        }
        
        .label {
          font-weight: 600;
          color: var(--text-color, #333);
          font-size: var(--font-size-sm, 0.875rem);
        }
        
        .select {
          padding: var(--spacing-sm, 0.5rem);
          border: 1px solid var(--border-color, #ddd);
          border-radius: var(--border-radius, 4px);
          background: var(--bg-color, #fff);
          color: var(--text-color, #333);
          font-size: var(--font-size-base, 1rem);
          font-family: inherit;
          cursor: pointer;
        }
        
        .select:focus {
          outline: none;
          border-color: var(--primary-color, #337ab7);
          box-shadow: 0 0 0 2px rgba(51, 122, 183, 0.2);
        }
        
        .help {
          font-size: var(--font-size-sm, 0.875rem);
          color: var(--text-muted, #777);
          font-style: italic;
        }
      </style>
      
      <div class="form-group">
        <label class="label">${label}:</label>
        <select class="select" name="${parameter}">
          ${this._renderOptions()}
        </select>
        <em class="help">${help}</em>
      </div>
    `;
  }
}

customElements.define('form-select', FormSelect);
export default FormSelect;
