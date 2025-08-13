import { loadState, saveState, exportState, importState, resetState } from "./storage.js";
import { renderList, renderProgress } from "./ui.js";

const $ = s => document.querySelector(s);
const list = $("#list");
const search = $("#search");
const filterExpansion = $("#filter-expansion");
const filterSource = $("#filter-source");
const exportBtn = $("#export-btn");
const importFile = $("#import-file");
const resetBtn = $("#reset-btn");
const progress = $("#progress");

let MOUNTS = [];
let state = loadState();

async function load() {
  const res = await fetch("data/mounts.json");
  MOUNTS = await res.json();
  applyFilters();
}

function applyFilters() {
  const q = search.value.trim().toLowerCase();
  const exp = filterExpansion.value;
  const src = filterSource.value;

  let filtered = MOUNTS.filter(m =>
    (!exp || m.expansion === exp) &&
    (!src || m.sourceType === src) &&
    (!q || (m.name.toLowerCase().includes(q) ||
            (m.instance || "").toLowerCase().includes(q) ||
            (m.zone || "").toLowerCase().includes(q)))
  );

  // Mark collected status for each mount
  MOUNTS.forEach(m => m.collected = !!state.owned[m.id]);

  renderList(list, filtered, state, onToggle);
  const ownedCount = Object.keys(state.owned).length;
    renderProgress(progress, MOUNTS.length, ownedCount);  // Update the progress bars for each expansion
  renderExpansionProgress(MOUNTS); // <-- Add this line
}

function onToggle(id, checked) {
  if (checked) state.owned[id] = true;
  else delete state.owned[id];
  saveState(state);

  // Update collected status for all mounts
  MOUNTS.forEach(m => m.collected = !!state.owned[m.id]);

  const ownedCount = Object.keys(state.owned).length;
  renderProgress(progress, MOUNTS.length, ownedCount);
  renderExpansionProgress(MOUNTS);
}

search.addEventListener("input", applyFilters);
filterExpansion.addEventListener("change", applyFilters);
filterSource.addEventListener("change", applyFilters);

exportBtn.addEventListener("click", exportState);
importFile.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try { state = await importState(file); applyFilters(); alert("Import successful!"); }
  catch { alert("Import failed. Make sure it's a valid exported JSON."); }
  finally { importFile.value = ""; }
});

resetBtn.addEventListener("click", () => {
  if (!confirm("Reset your local progress?")) return;
  resetState(); state = loadState(); applyFilters();
});

// --- Per-expansion progress bar logic below ---

function getProgressColor(percent) {
  if (percent === 100) {
    return '#3498db'; // blue at 100%
  }
  // Red to green gradient for 0-99%
  const r = Math.round(255 * (1 - percent / 100));
  const g = Math.round(180 * (percent / 100));
  return `rgb(${r},${g},64)`;
}

function renderExpansionProgress(mounts) {
  // Group by expansion
  const expansions = {};
  for (const mount of mounts) {
    const exp = mount.expansion || 'Unknown';
    if (!expansions[exp]) expansions[exp] = { collected: 0, total: 0 };
    expansions[exp].total++;
    if (mount.collected) expansions[exp].collected++;
  }

  // Render bars
  const container = document.getElementById('expansion-progress-bars');
  if (!container) return;
  container.innerHTML = '';
  Object.entries(expansions).forEach(([expansion, { collected, total }]) => {
    const percent = total ? Math.round((collected / total) * 100) : 0;
    const color = getProgressColor(percent);
    const bar = document.createElement('div');
    bar.className = 'expansion-progress-bar-container';
    bar.innerHTML = `
      <span class="expansion-progress-label">${expansion} (${collected}/${total})</span>
      <div class="expansion-progress-bar">
        <div class="expansion-progress-bar-inner" style="width:${percent}%;background:${color}"></div>
      </div>
    `;
    container.appendChild(bar);
  });
}

console.log("MOUNTS for progress bars:", MOUNTS.map(m => ({id: m.id, expansion: m.expansion, collected: m.collected})));

load();

