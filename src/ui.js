export function renderList(container, data, state, onToggle) {
  container.innerHTML = "";
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

