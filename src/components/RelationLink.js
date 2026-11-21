import { dispatchEvent } from '../utils/Events.js';

class RelationLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['relation-id', 'name', 'active', 'class-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('.link-item').addEventListener('click', this._handleClick.bind(this));
  }

  disconnectedCallback() {
    const linkItem = this.shadowRoot.querySelector('.link-item');
    if (linkItem) {
      linkItem.removeEventListener('click', this._handleClick);
    }
  }

  _handleClick(event) {
    const relationId = this.getAttribute('relation-id');
    dispatchEvent(this, 'relation-selected', {
      relationId: parseInt(relationId),
      name: this.getAttribute('name'),
      classId: this.getAttribute('class-id')
    });
  }

  render() {
    const relationId = this.getAttribute('relation-id') || '';
    const name = this.getAttribute('name') || '';
    const classId = this.getAttribute('class-id') || '';
    const active = this.hasAttribute('active');
    const href = `../request/classEdit?type_id=14&id=${classId}`;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .link-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
          border: 1px solid var(--border-color, #ddd);
          border-bottom: none;
          background: var(--bg-color, #fff);
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .link-item:hover {
          background: var(--bg-muted, #f5f5f5);
        }
        
        .link-item.active {
          background: var(--primary-color, #337ab7);
          color: white;
          border-color: var(--primary-color, #337ab7);
        }
        
        .link-item:first-child {
          border-top-left-radius: var(--border-radius, 4px);
          border-top-right-radius: var(--border-radius, 4px);
        }
        
        .link-item:last-child {
          border-bottom: 1px solid var(--border-color, #ddd);
          border-bottom-left-radius: var(--border-radius, 4px);
          border-bottom-right-radius: var(--border-radius, 4px);
        }
        
        .name {
          font-weight: 500;
        }
        
        .details-link {
          color: inherit;
          text-decoration: none;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        
        .details-link:hover {
          opacity: 1;
        }
        
        .icon {
          font-family: 'Material Icons';
          font-size: 1.2rem;
        }
      </style>
      
      <li class="link-item ${active ? 'active' : ''}" data-relation-id="${relationId}">
        <span class="name">${name}</span>
        <a href="${href}" title="Details" class="details-link" target="_blank">
          <span class="icon">open_in_new</span>
        </a>
      </li>
    `;
  }
}

customElements.define('relation-link', RelationLink);
export default RelationLink;
