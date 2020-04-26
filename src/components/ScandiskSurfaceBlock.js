import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { random } from "../js/utils.js";

const MIN_BASE_READ_TIME = 50;
const MAX_BASE_READ_TIME = 150;
const BAD_SECTOR_PROBABILITY = 125;

export default class ScandiskSurfaceBlock extends LitElement {
  static get properties() {
    return {
      read: { type: Boolean },
      type: { type: String },
    };
  }

  constructor() {
    super();
    this.read = false;
    this.type = "unused";
  }

  setRandomType() {
    const typeIndex = ~~(Math.random() * 5);
    this.type = ["unused", "unused", "unused", "used", "full"][typeIndex];
  }

  getTimeRead() {
    const time = {
      unused: () => random(MIN_BASE_READ_TIME * 0, MAX_BASE_READ_TIME),
      used: () => random(MIN_BASE_READ_TIME * 1, MAX_BASE_READ_TIME * 3),
      full: () => random(MIN_BASE_READ_TIME * 1, MAX_BASE_READ_TIME * 7),
      bad: () => random(MIN_BASE_READ_TIME * 40, MAX_BASE_READ_TIME * 27),
    };
    return time[this.type]();
  }

  isBadBlock() {
    return random(1, BAD_SECTOR_PROBABILITY) === 1;
  }

  markBad() {
    this.type = "bad";
  }

  readBlock() {
    this.read = true;
    if (this.isBadBlock()) this.markBad();
    return this.getTimeRead();
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

      .read::before {
        background: var(--yellowColor);
      }

      .bad::before {
        content: "B";
        background: black;
        color: var(--badTextColor);
      }
    `;
  }

  get classNames() {
    return {
      read: this.read,
      unused: this.type === "unused",
      used: this.type === "used",
      full: this.type === "full",
      bad: this.type === "bad",
    };
  }

  render() {
    return html` <span class="block ${classMap(this.classNames)}"></span> `;
  }
}

customElements.define("scandisk-surface-block", ScandiskSurfaceBlock);
