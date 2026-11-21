import { dispatchEvent } from '../utils/Events.js';

class OkCancelButtons extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['saving'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('.btn-cancel').addEventListener('click', this._handleCancel.bind(this));
    this.shadowRoot.querySelector('.btn-save').addEventListener('click', this._handleSave.bind(this));
  }

  disconnectedCallback() {
    const cancelBtn = this.shadowRoot.querySelector('.btn-cancel');
    const saveBtn = this.shadowRoot.querySelector('.btn-save');
    if (cancelBtn) cancelBtn.removeEventListener('click', this._handleCancel);
    if (saveBtn) saveBtn.removeEventListener('click', this._handleSave);
  }

  _handleCancel(event) {
    event.preventDefault();
    dispatchEvent(this, 'cancel-clicked', {});
  }

  _handleSave(event) {
    event.preventDefault();
    dispatchEvent(this, 'save-clicked', {});
  }

  render() {
    const saving = this.hasAttribute('saving');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-top: var(--spacing-lg, 1.5rem);
          padding-top: var(--spacing-md, 1rem);
          border-top: 1px solid var(--border-color, #ddd);
        }
        
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .message {
          padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
          background: #d9edf7;
          border: 1px solid #bce8f1;
          border-radius: var(--border-radius, 4px);
          color: #31708f;
        }
        
        .message h4 {
          margin: 0;
          font-size: var(--font-size-base, 1rem);
        }
        
        .btn-group {
          display: flex;
          gap: var(--spacing-sm, 0.5rem);
        }
        
        .btn {
          padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
          border: 1px solid transparent;
          border-radius: var(--border-radius, 4px);
          font-size: var(--font-size-base, 1rem);
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn-cancel {
          background: var(--bg-color, #fff);
          border-color: var(--border-color, #ddd);
          color: var(--text-color, #333);
        }
        
        .btn-cancel:hover {
          background: var(--bg-muted, #f5f5f5);
        }
        
        .btn-save {
          background: var(--success-color, #5cb85c);
          border-color: var(--success-color, #5cb85c);
          color: white;
        }
        
        .btn-save:hover {
          background: var(--success-hover, #449d44);
          border-color: var(--success-hover, #449d44);
        }
      </style>
      
      <div class="container">
        <div class="message-area">
          ${saving ? `
            <div class="message">
              <h4><em>Saving...</em></h4>
            </div>
          ` : ''}
        </div>
        <div class="btn-group">
          <button type="button" class="btn btn-cancel">Cancel</button>
          <button type="button" class="btn btn-save">Save</button>
        </div>
      </div>
    `;
  }
}

customElements.define('ok-cancel-buttons', OkCancelButtons);
export default OkCancelButtons;
