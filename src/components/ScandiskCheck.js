import { LitElement, html, css } from "lit-element";
import ScandiskButton from "./ScandiskButton.js";
import ScandiskBar from "./ScandiskBar.js";

const random = (min = 1, max = 6) => min + ~~(Math.random() * max);

export default class ScandiskCheck extends LitElement {
  static get properties() {
    return {
      currentStage: { type: Number },
      stages: { type: Array }
    };
  }

  constructor() {
    super();
    this.currentStage = 0;
    this.stages = [
      { name: "Media descriptor", status: "current" },
      { name: "File allocation tables", status: "pending" },
      { name: "Directory structure", status: "pending" },
      { name: "File system", status: "pending" },
      { name: "Free space", status: "pending" },
      { name: "Surface scan", status: "pending" }
    ];
    this.scandiskBar = document.createElement("scandisk-bar");
  }

  start(parent) {
    parent.appendChild(this);
    this.nextStage();
  }

  nextStage() {
    const rnd = random(1, 6);

    if (this.currentStage < this.stages.length - 1) {
      this.stages[this.currentStage].status = rnd == 4 ? "fixed" : "correct";
      this.currentStage++;
      this.stages[this.currentStage].status = "current";
      this.scandiskBar.incProgress();
      setTimeout(() => this.nextStage(), random(500, 2000));
    } else setTimeout(() => this.finish(), random(500, 2000));
  }

  finish() {
    this.dispatchEvent(new CustomEvent("SCANDISK_SURFACE_START", { bubbles: true }));
    this.remove();
  }

  static get styles() {
    return css`
      .list {
        display: grid;
        grid-template-columns: 125px 1fr;
        margin-top: 2em;
        margin-bottom: 4em;
      }

      .list span:nth-child(2n-1) {
        text-align: center;
        display: block;
      }

      .list span[data-status="correct"]::before {
        content: "♦";
        color: var(--cyanColor);
      }

      .list span[data-status="current"]::before {
        content: "»";
        color: var(--cyanColor);
      }

      .list span[data-status="fixed"]::before {
        content: "fixed";
        color: var(--redColor);
        font-weight: bold;
      }
      ul {
        margin-left: 2em;
      }
      hr {
        border: 1px solid var(--cyanColor);
      }
    `;
  }

  get stageList() {
    return this.stages.map(
      item =>
        html`
          <span data-status="${item.status}"></span> <span>${item.name}</span>
        `
    );
  }

  render() {
    return html`
      <div class="screen">
        <p class="title">Microsoft ScanDisk</p>
        <hr />
        <p>ScanDisk is now checking the following areas of drive C:</p>
        <div class="list">
          ${this.stageList}
        </div>
        <div class="buttons">
          <scandisk-button>Pause</scandisk-button>
          <scandisk-button href="https://twitter.com/Manz/status/1124749875315380224">More info</scandisk-button>
          <scandisk-button>Exit</scandisk-button>
        </div>
        <hr />
        ${this.scandiskBar}
      </div>
    `;
  }
}

customElements.define("scandisk-check", ScandiskCheck);
