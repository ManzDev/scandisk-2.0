import { LitElement, html, css } from "lit-element";

export default class ScandiskBar extends LitElement {
  static get properties() {
    return {
      value: { type: Number }
    };
  }

  constructor() {
    super();
    this.value = 0;
  }

  static get styles() {
    return css`
      .status-bar {
        display: grid;
        grid-template-columns: 1fr 600px;
      }

      .status-bar span[data-count]::before {
        content: attr(data-count);
      }

      .progressbar {
        background: var(--darkgrayColor);
      }

      .fillbar {
        background: var(--yellowColor);
        height: 100%;
      }
    `;
  }

  setProgress(value) {
    this.value = value;
    this.render();
  }

  incProgress(step = 15) {
    const value = Math.min(100, parseInt(this.value) + step);
    this.setProgress(value);
  }

  render() {
    return html`
      <style>
        ${this.styles}
      </style>
      <div class="status-bar">
        <span data-count="${this.value}">% completed</span>
        <div class="progressbar">
          <div class="fillbar" style="width: ${this.value}%"></div>
        </div>
      </div>
    `;
  }
}

customElements.define("scandisk-bar", ScandiskBar);
