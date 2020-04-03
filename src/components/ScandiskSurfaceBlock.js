import { LitElement, html, css } from "lit-element";

const random = (min = 1, max = 6) => min + ~~(Math.random() * max);

export default class ScandiskSurfaceBlock extends LitElement {
  static get properties() {
    return {
      readFlag: { type: String },
      type: { type: String }
    };
  }

  constructor() {
    super();
    this.readFlag = "";
    if (!this.type) this.createBlock();
  }

  createBlock() {
    const rnd = ~~(Math.random() * 5);
    this.type = ["unused", "unused", "unused", "used", "full"][rnd];
  }

  readBlock() {
    let time = 0;

    if (this.type === "unused") time = random(0, 150);
    if (this.type === "used") time = random(50, 500);
    if (this.type === "full") time = random(50, 1000);

    time += this.checkBadBlock();

    return [time, this.type];
  }

  checkBadBlock() {
    if (random(1, 150) === 1) {
      this.type = "bad";
      return random(2000, 4000);
    }

    this.readFlag = "read";
    return 0;
  }

  setType(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        background: black;
      }

      .block::before {
        width: 12px;
        height: 22px;
        text-align: center;
        display: inline-block;
      }

      .unused::before {
        content: "░";
        background: var(--emeraldColor);
        color: var(--lightEmeraldColor);
      }

      .used::before {
        content: "▒";
        background: var(--lightEmeraldColor);
        color: black;
      }

      .full::before {
        content: "•";
        background: var(--cyanColor);
        color: black;
      }

      .bad::before {
        content: "B";
        background: black;
        color: var(--badTextColor);
      }

      .read::before {
        background: var(--yellowColor);
      }
    `;
  }

  render() {
    return html`
      <span class="block ${this.type} ${this.readFlag}"></span>
    `;
  }
}

customElements.define("scandisk-surface-block", ScandiskSurfaceBlock);
