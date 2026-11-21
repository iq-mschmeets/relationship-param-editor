class FormReadonly extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['label', 'value', 'help'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  _getDisplayValue() {
    const value = this.getAttribute('value');
    if (!value) return '';
    if (Number.isInteger(Number(value))) return value;
    return value.length > 0 ? value.toString().replace('&gt;', '>') : '';
  }

  render() {
    const label = this.getAttribute('label') || '';
    const help = this.getAttribute('help') || '';
    const value = this._getDisplayValue();

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
          background: var(--bg-muted, #f5f5f5);
          color: var(--text-muted, #777);
          font-size: var(--font-size-base, 1rem);
          font-family: inherit;
        }
        
        .help {
          font-size: var(--font-size-sm, 0.875rem);
          color: var(--text-muted, #777);
          font-style: italic;
        }
      </style>
      
      <div class="form-group">
        <label class="label">${label}:</label>
        <input type="text" class="input" readonly value="${value}">
        <em class="help">${help}</em>
      </div>
    `;
  }
}

customElements.define('form-readonly', FormReadonly);
export default FormReadonly;
