import { LitElement, html, css } from "lit-element";
import "./ScandiskButton.js";
import "./ScandiskBar.js";

export default class ScandiskSummary extends LitElement {
  static get properties() {
    return {
      errors: { type: Number },
    };
  }

  constructor() {
    super();
    this.errors = this.getAttribute("errors") || 0;
  }

  static get styles() {
    return css`
      .title {
        color: var(--cyanColor);
        margin-bottom: 0;
      }
      .buttons {
        margin-top: 8em;
      }
      ul {
        margin-left: 2em;
      }
      hr {
        border: 1px solid var(--cyanColor);
      }
    `;
  }

  get errorMessage() {
    if (this.errors === 0) return html`<p>Scandisk not found problems on drive C.</p>`;
    return html`<p>ScanDisk found and fixed <span>${this.errors}</span> problems on drive C.</p>`;
  }

  render() {
    return html`
      <div class="screen">
        <p class="title">Microsoft ScanDisk</p>
        <hr />
        ${this.errorMessage}
        <div class="buttons">
          <scandisk-button href="https://twitter.com/Manz/status/1124749875315380224">More info</scandisk-button>
          <scandisk-button href="#">Exit</scandisk-button>
        </div>
      </div>
      <hr />
    `;
  }
}

customElements.define("scandisk-summary", ScandiskSummary);
