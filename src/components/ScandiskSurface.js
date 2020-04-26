import { LitElement, html, css } from "lit-element";
import "./ScandiskButton.js";
import ScandiskBar from "./ScandiskBar.js";
import ScandiskSurfaceBlock from "./ScandiskSurfaceBlock.js";

// Scandisk Surface Visual Blocks
const NUM_BLOCKS = 518;

// Calculate clusters blocks-based
const CLUSTERS = ~~(Math.random() * 100000) + 500000;
const CLUSTERS_PER_BLOCK = ~~(CLUSTERS / NUM_BLOCKS);

export default class ScandiskSurface extends LitElement {
  static get properties() {
    return {
      failedBlocks: { type: Number },
      currentIndex: { type: Number },
      blocks: { type: Array },
      scandiskBar: { type: ScandiskBar },
    };
  }

  constructor() {
    super();
    this.failedBlocks = 0;
    this.currentIndex = 0;
    this.genSurfaceBlocks();
  }

  firstUpdated() {
    this.scandiskBar = this.shadowRoot.querySelector("scandisk-bar");
    this.start();
  }

  genSurfaceBlocks() {
    this.blocks = [];
    for (let i = 0; i < NUM_BLOCKS; i++) {
      const block = new ScandiskSurfaceBlock();
      block.setRandomType();
      this.blocks.push(block);
    }
  }

  get readClusters() {
    return (this.currentIndex * CLUSTERS_PER_BLOCK).toLocaleString();
  }

  get badClusters() {
    return this.failedBlocks.toLocaleString();
  }

  nextBlock() {
    const currentBlock = this.blocks[this.currentIndex];

    const readTime = currentBlock.readBlock();
    const readType = currentBlock.type;

    if (readType === "bad") {
      this.failedBlocks++;
    }

    if (this.currentIndex < NUM_BLOCKS - 1) setTimeout(() => this.nextBlock(), readTime);
    else this.finish();

    const progress = ~~((this.currentIndex / NUM_BLOCKS) * 100);
    this.scandiskBar.setProgress(progress);
    this.currentIndex++;
  }

  start() {
    this.nextBlock();
  }

  finish() {
    this.currentCluster = CLUSTERS;
    this.dispatchEvent(
      new CustomEvent("SCANDISK_SUMMARY_START", {
        detail: {
          value: this.failedBlocks,
        },
        composed: true,
      })
    );
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
      hr {
        border: 1px solid var(--cyanColor);
      }
    `;
  }

  render() {
    return html`
      <div class="screen">
        <div class="surface-scan">${this.blocks}</div>
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
      <scandisk-bar></scandisk-bar>
    `;
  }
}

customElements.define("scandisk-surface", ScandiskSurface);
