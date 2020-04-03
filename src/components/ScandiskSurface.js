import { LitElement, html, css } from "lit-element";
import ScandiskButton from "./ScandiskButton.js";
import ScandiskBar from "./ScandiskBar.js";
import ScandiskSurfaceBlock from "./ScandiskSurfaceBlock.js";

// Scandisk Surface Visual Blocks
const NUM_BLOCKS = 518;

// Calculate clusters blocks-based
const CLUSTERS = ~~(Math.random() * 100000) + 500000;
const CLUSTERS_PER_BLOCK = ~~(CLUSTERS / NUM_BLOCKS);

const random = (min = 1, max = 6) => min + ~~(Math.random() * max);

export default class ScandiskSurface extends LitElement {
  static get properties() {
    return {
      failedBlocks: { type: Number },
      currentBlock: { type: Number },
      blocks: { type: Array },
      scandiskBar: { type: LitElement }
    };
  }

  constructor() {
    super();
    this.failedBlocks = 0;
    this.currentBlock = 0;
    this.blocks = [];
    this.scandiskBar = new ScandiskBar(); // document.createElement("scandisk-bar");
    this.genSurface();
  }

  start(parent) {
    parent.appendChild(this);
    this.nextBlock();
  }

  genSurface() {
    for (let i = 0; i < NUM_BLOCKS; i++) {
      const block = new ScandiskSurfaceBlock();
      this.blocks.push(block);
    }
  }

  get surfaceBlocks() {
    return this.blocks.map(item => item);
  }

  get readClusters() {
    return (this.currentBlock * CLUSTERS_PER_BLOCK).toLocaleString();
  }

  get badClusters() {
    return this.failedBlocks.toLocaleString();
  }

  nextBlock() {
    const [time, type] = this.blocks[this.currentBlock].readBlock();

    if (type == "bad") this.failedBlocks = ++this.failedBlocks;

    if (this.currentBlock < NUM_BLOCKS - 1) setTimeout(() => this.nextBlock(), time);
    else this.finish();

    this.scandiskBar.setProgress(~~((this.currentBlock / NUM_BLOCKS) * 100));
    this.currentBlock++;
  }

  finish() {
    this.currentCluster = CLUSTERS;
    this.dispatchEvent(new CustomEvent("SCANDISK_SUMMARY_START", { bubbles: true }));
    this.remove();
  }

  static get styles() {
    return css`
      .screen {
        background: var(--grayColor);
        color: black;
        width: 93%;
        min-height: 400px;
        margin-bottom: 30px;
        box-shadow: 10px 10px 0 black;
        padding: 20px;

        display: grid;
        grid-template-columns: 2fr 1.35fr;
        grid-template-rows: 4fr 0.4fr;
      }

      .screen ul {
        list-style-type: none;
        margin: 0 0 2em;
      }

      .screen ul.data {
        margin-right: 2em;
        text-align: right;
      }

      .drive-info {
        padding: 20px;
      }

      .buttons {
        grid-row: 2;
        grid-column: span 2;
        text-align: center;
      }
      ul {
        margin-left: 2em;
      }
      hr {
        border: 1px solid var(--cyanColor);
      }
    `;
  }

  render() {
    return html`
      <div class="screen">
        <div class="surface-scan">${this.surfaceBlocks}</div>
        <div class="drive-info">
          <p>Drive C:</p>
          <ul class="data">
            <li class="total"><span>${CLUSTERS.toLocaleString()}</span> clusters</li>
            <li class="examined"><span>${this.readClusters}</span> examined</li>
            <li class="badc"><span>${this.badClusters}</span> found bad</li>
          </ul>
          <ul class="legend">
            <li>
              <scandisk-surface-block type="unused"></scandisk-surface-block> =
              <var>${CLUSTERS_PER_BLOCK.toLocaleString()}</var> clusters
            </li>
            <li><scandisk-surface-block type="unused"></scandisk-surface-block> unused clusters</li>
            <li><scandisk-surface-block type="used"></scandisk-surface-block> some used clusters</li>
            <li><scandisk-surface-block type="full"></scandisk-surface-block> used clusters</li>
            <li><scandisk-surface-block type="bad"></scandisk-surface-block> some bad clusters</li>
          </ul>
        </div>
        <div class="buttons">
          <scandisk-button href="https://twitter.com/Manz/status/1124749875315380224">More info</scandisk-button>
          <scandisk-button>Exit</scandisk-button>
        </div>
      </div>
      <hr />
      ${this.scandiskBar}
    `;
  }
}

customElements.define("scandisk-surface", ScandiskSurface);
