export function renderList(container, data, state, onToggle) {
  container.innerHTML = "";
  if (data.length === 0) {
    container.innerHTML = `<div class="no-results">No mounts found matching your filters.</div>`;
    return;
  }
  const frag = document.createDocumentFragment();
  data.forEach(m => {
    const owned = !!state.owned[m.id];
    const card = document.createElement("div");
    card.className = "card";

    const top = document.createElement("div");
    top.className = "row";
    const h = document.createElement("h3");
    h.textContent = m.name;
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = m.expansion;
    top.append(h, badge);

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = [m.sourceType, m.instance || m.zone, m.sourceDetail].filter(Boolean).join(" • ");

    const check = document.createElement("label");
    check.className = "check";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = owned;
    input.addEventListener("change", () => onToggle(m.id, input.checked));
    const span = document.createElement("span");
    span.textContent = owned ? "Owned" : "Not Owned";
    input.addEventListener("change", () => { span.textContent = input.checked ? "Owned" : "Not Owned"; });
    check.append(input, span);

    card.append(top, meta, check);
    frag.append(card);
  });
  container.append(frag);
}

export function renderProgress(el, total, owned) {
  el.textContent = `Progress: ${owned}/${total} (${total ? Math.round(owned/total*100) : 0}%)`;
}

export function renderExpansionProgress(container, data, state) {
  // Group mounts by expansion
  const expansions = {};
  data.forEach(m => {
    if (!expansions[m.expansion]) expansions[m.expansion] = [];
    expansions[m.expansion].push(m);
  });

  // Helper to get gradient color
  function getProgressColor(percent) {
    if (percent === 100) {
      return '#3498db'; // blue at 100%
    }
    // Red to green gradient for 0-99%
    const r = Math.round(255 * (1 - percent / 100));
    const g = Math.round(180 * (percent / 100));
    return `linear-gradient(90deg, rgb(${r},${g},64), rgb(${r},${g},64))`;
  }

  // Clear container
  container.innerHTML = "";

  // Render a progress bar for each expansion
  Object.entries(expansions).forEach(([exp, mounts]) => {
    const owned = mounts.filter(m => state.owned[m.id]).length;
    const total = mounts.length;
    const percent = total ? Math.round((owned / total) * 100) : 0;
    const color = getProgressColor(percent);

    const wrapper = document.createElement("div");
    wrapper.className = "expansion-progress-bar-container";

    const label = document.createElement("span");
    label.className = "expansion-progress-label";
    label.textContent = `${exp}: ${owned}/${total} (${percent}%)`;

    const bar = document.createElement("div");
    bar.className = "expansion-progress-bar";

    const barInner = document.createElement("div");
    barInner.className = "expansion-progress-bar-inner";
    barInner.style.width = percent + "%";
    barInner.style.background = color;

    bar.appendChild(barInner);
    wrapper.appendChild(label);
    wrapper.appendChild(bar);
    container.appendChild(wrapper);
  });
}

