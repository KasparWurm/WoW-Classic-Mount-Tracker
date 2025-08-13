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

  // Get filter values
  const faction = document.getElementById('filter-faction').value;
  const classFilter = document.getElementById('filter-class').value;
  const profession = document.getElementById('filter-profession').value;

  let filtered = MOUNTS.filter(m =>
    (!exp || m.expansion === exp) &&
    (!src || m.sourceType === src) &&
    (!q || (m.name.toLowerCase().includes(q) ||
            (m.instance || '').toLowerCase().includes(q) ||
            (m.zone || '').toLowerCase().includes(q))) &&
    (!faction || m.faction === faction) &&
    (!classFilter || m.class === classFilter) &&
    (!profession || m.profession === profession)
  );

  renderList(list, filtered, state, onToggle);
  const ownedCount = Object.keys(state.owned).length;
  renderProgress(progress, MOUNTS.length, ownedCount);
}

function onToggle(id, checked) {
  if (checked) state.owned[id] = true;
  else delete state.owned[id];
  saveState(state);
  const ownedCount = Object.keys(state.owned).length;
  renderProgress(progress, MOUNTS.length, ownedCount);
}

search.addEventListener("input", applyFilters);
filterExpansion.addEventListener("change", applyFilters);
filterSource.addEventListener("change", applyFilters);

const filterFaction = document.getElementById('filter-faction');
const filterClass = document.getElementById('filter-class');
const filterProfession = document.getElementById('filter-profession');

filterFaction.addEventListener("change", applyFilters);
filterClass.addEventListener("change", applyFilters);
filterProfession.addEventListener("change", applyFilters);

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
  resetState(); state = loadState();
  // Reset filters
  filterExpansion.value = "";
  filterSource.value = "";
  filterFaction.value = "";
  filterClass.value = "";
  filterProfession.value = "";
  applyFilters();
});

load();

