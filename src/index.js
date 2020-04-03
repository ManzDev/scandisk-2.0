import ScandiskCheck from "./components/ScandiskCheck.js";
import ScandiskSurface from "./components/ScandiskSurface.js";
import ScandiskSummary from "./components/ScandiskSummary.js";

const monitor = document.querySelector(".monitor");

// Start Scandisk Initial Check
const scandiskCheck = new ScandiskCheck();
scandiskCheck.start(monitor);

// Start Scandisk Surface Phase
document.addEventListener("SCANDISK_SURFACE_START", () => new ScandiskSurface().start(monitor));

// Start Scandisk Summary Phase
document.addEventListener("SCANDISK_SUMMARY_START", () => new ScandiskSummary().start(monitor));
