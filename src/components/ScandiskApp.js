import { LitElement, html, css } from "lit-element";

import "./ScandiskCheck.js";
import "./ScandiskSurface.js";
import "./ScandiskSummary.js";

export default class ScandiskApp extends LitElement {
  static get properties() {
    return {
      phase: { type: Number },
      errors: { type: Number },
    };
  }

  constructor() {
    super();
    this.phase = 0;
    this.errors = 0;
    document.body.style.setProperty("--blueColor", "#0028aa");
  }

  firstUpdated() {
    this.addEventListener("SCANDISK_SURFACE_START", () => (this.phase = 1));
    this.addEventListener("SCANDISK_SUMMARY_START", (ev) => {
      this.phase = 2;
      this.errors = ev.detail.value;
    });
  }

  currentPhase() {
    const PHASES = {
      0: html`<scandisk-check></scandisk-check>`,
      1: html`<scandisk-surface></scandisk-surface>`,
      2: html`<scandisk-summary errors="${this.errors}"></scandisk-summary>`,
    };
    return PHASES[this.phase];
  }

  static get styles() {
    return css`
      :host {
        --grayColor: #bcbdaa;
        --darkgrayColor: #525252;
        --yellowColor: #fffa51;
        --cyanColor: #59ffff;
        --emeraldColor: #184343;
        --lightEmeraldColor: #38a6a6;
        --redColor: #9c0b07;
        --badTextColor: #fe6666;
        --highlightTextColor: #fff;
        --fontName: "IBM Plex Mono", monospaced;
      }

      .monitor {
        width: 800px;
        margin: 3em auto;
        color: var(--grayColor);
        font-family: var(--fontName);
        font-size: 18px;
      }
    `;
  }

  render() {
    return html` <div class="monitor">${this.currentPhase()}</div>`;
  }
}

customElements.define("scandisk-app", ScandiskApp);
