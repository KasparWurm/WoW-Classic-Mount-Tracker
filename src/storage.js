const KEY = "mount-tracker-v1";

export function loadState() {
  try { return JSON.parse(localStorage.getItem(KEY)) || { owned: {} }; }
  catch { return { owned: {} }; }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function exportState() {
  const blob = new Blob([JSON.stringify(loadState(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: url, download: "mount-tracker.json" });
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

export function importState(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      try {
        const json = JSON.parse(r.result);
        if (!json || typeof json !== "object" || !json.owned) throw new Error("Invalid file");
        localStorage.setItem(KEY, JSON.stringify(json));
        resolve(json);
      } catch (e) { reject(e); }
    };
    r.onerror = reject;
    r.readAsText(file);
  });
}

export function resetState() {
  localStorage.removeItem(KEY);
}

