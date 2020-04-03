import { LitElement, html, css } from "lit-element";
import ScandiskButton from "./ScandiskButton.js";
import ScandiskBar from "./ScandiskBar.js";

export default class ScandiskSummary extends LitElement {
  constructor() {
    super();
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

  start(parent) {
    parent.appendChild(this);
  }

  render() {
    return html`
      <div class="screen">
        <p class="title">Microsoft ScanDisk</p>
        <hr />
        <p>ScanDisk found and fixed <span></span> problems on drive C.</p>
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
