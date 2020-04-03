import { LitElement, html, css } from "lit-element";

export default class ScandiskButton extends LitElement {
  static get properties() {
    return {
      text: { type: String },
      href: { type: String }
    };
  }

  constructor() {
    super();
    this.text = this.textContent;
    this.href = this.hasAttribute("href") ? this.getAttribute("href") : "#";
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        margin-bottom: 1em;
      }

      a {
        background: var(--darkgrayColor);
        border: 0;
        font-family: var(--fontName);
        font-size: 1rem;
        color: var(--grayColor);
        outline: 0;
        padding: 2px;
        margin-right: 1em;
        box-shadow: 10px 8px 0 black;
        text-decoration: none;
      }

      a:active {
        color: var(--highlightColor);
        position: relative;
        left: 10px;
        top: 8px;
        box-shadow: none;
      }

      a::before {
        content: "⯇ ";
        color: var(--highlightColor);
      }

      a::after {
        content: " ⯈";
        color: var(--highlightColor);
      }
    `;
  }

  render() {
    return html`
      <style>
        ${this.styles}
      </style>
      <a href="${this.href}" target="_parent">${this.text}</a>
    `;
  }
}

customElements.define("scandisk-button", ScandiskButton);
