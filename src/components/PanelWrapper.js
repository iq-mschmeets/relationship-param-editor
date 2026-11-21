class PanelWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        section {
          padding: var(--spacing-md, 1rem);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .content {
          width: 100%;
        }
      </style>
      
      <section>
        <div class="container">
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('panel-wrapper', PanelWrapper);
export default PanelWrapper;
