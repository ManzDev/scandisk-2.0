import { LitElement, html, css } from "lit-element";
import { random } from "../js/utils.js";
import "./ScandiskButton.js";
import "./ScandiskBar.js";

export default class ScandiskCheck extends LitElement {
  static get properties() {
    return {
      currentStage: { type: Number },
      stages: { type: Array },
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
      { name: "Surface scan", status: "pending" },
    ];
  }

  firstUpdated() {
    this.scandiskBar = this.shadowRoot.querySelector("scandisk-bar");
    setTimeout(() => this.processStage(), random(500, 2000));
  }

  nextStage() {
    this.currentStage++;
    if (this.currentStage < this.stages.length) {
      this.stages[this.currentStage].status = "current";
      this.scandiskBar.incProgress();
      setTimeout(() => this.processStage(), random(500, 2000));
    } else setTimeout(() => this.finish(), random(500, 2000));
  }

  processStage() {
    const stageStatus = random(1, 6);
    this.stages[this.currentStage].status = stageStatus === 4 ? "fixed" : "correct";
    this.nextStage();
  }

  finish() {
    this.dispatchEvent(new CustomEvent("SCANDISK_SURFACE_START", { composed: true }));
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
    return this.stages.map((item) => html` <span data-status="${item.status}"></span> <span>${item.name}</span> `);
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
        <scandisk-bar></scandisk-bar>
      </div>
    `;
  }
}

customElements.define("scandisk-check", ScandiskCheck);
