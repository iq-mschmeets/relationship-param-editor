import { dispatchEvent } from '../utils/Events.js';

class FormInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._value = '';
  }

  static get observedAttributes() {
    return ['label', 'value', 'parameter', 'help', 'rows', 'placeholder'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'value') {
        this._value = newValue || '';
      }
      this.render();
    }
  }

  connectedCallback() {
    this._value = this.getAttribute('value') || '';
    this.render();
    this.shadowRoot.querySelector('textarea, input').addEventListener('change', this._handleChange.bind(this));
    this.shadowRoot.querySelector('textarea, input').addEventListener('input', this._handleInput.bind(this));
  }

  disconnectedCallback() {
    const input = this.shadowRoot.querySelector('textarea, input');
    if (input) {
      input.removeEventListener('change', this._handleChange);
      input.removeEventListener('input', this._handleInput);
    }
  }

  _handleChange(event) {
    event.preventDefault();
    this._value = event.target.value;
    
    const parameter = this.getAttribute('parameter');
    if (parameter) {
      dispatchEvent(this, 'parameter-changed', {
        parameter: parameter,
        value: event.target.value
      });
    }
  }

  _handleInput(event) {
    this._value = event.target.value;
  }

  getValue() {
    return this._value;
  }

  render() {
    const label = this.getAttribute('label') || '';
    const help = this.getAttribute('help') || '';
    const parameter = this.getAttribute('parameter') || '';
    const rows = parseInt(this.getAttribute('rows')) || 1;
    const placeholder = this.getAttribute('placeholder') || '';

    const isTextarea = rows > 1;
    const inputElement = isTextarea 
      ? `<textarea class="input" name="${parameter}" rows="${rows}" placeholder="${placeholder}" title="${help}">${this._value}</textarea>`
      : `<input type="text" class="input" name="${parameter}" value="${this._value}" placeholder="${placeholder}" title="${help}">`;

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
        
        .input {
          padding: var(--spacing-sm, 0.5rem);
          border: 1px solid var(--border-color, #ddd);
          border-radius: var(--border-radius, 4px);
          background: var(--bg-color, #fff);
          color: var(--text-color, #333);
          font-size: var(--font-size-base, 1rem);
          font-family: inherit;
          resize: vertical;
        }
        
        .input:focus {
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
        ${inputElement}
        <em class="help">${help}</em>
      </div>
    `;
  }
}

customElements.define('form-input', FormInput);
export default FormInput;
