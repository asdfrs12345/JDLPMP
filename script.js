// script.js
document.addEventListener("DOMContentLoaded", () => {
  const ENDPOINT = "https://script.google.com/macros/s/AKfycbxdmJGYT5EKZ9cAPxBzrdz2bV1eQmoL2_JHF21HmVTRlhHbvDtKmZOi8NOORyRRCYgd/exec";

  fetch(ENDPOINT)
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then(renderSchedule)
    .catch(err => {
      console.error("Fetch error:", err);
      document.getElementById("schedule").innerText = "Error loading schedule.";
    });
});

function renderSchedule(days) {
  const container = document.getElementById("schedule");
  container.classList.remove("loading");
  container.innerHTML = "";

  days.forEach(day => {
    // ── CARD WRAPPER ─────────────────────────────────────────
    const card = document.createElement("div");
    card.className = "day-card";

    // ── HEADER ───────────────────────────────────────────────
    const header = document.createElement("div");
    header.className = "card-header";

    // Day Number
    const h2 = document.createElement("h2");
    h2.textContent = `Day ${day.DayNumber}`;
    header.appendChild(h2);

    // Tithi
    if (day.Tithi) {
      const pT = document.createElement("p");
      pT.className = "tithi";
      pT.textContent = day.Tithi;
      header.appendChild(pT);
    }

    // Date
    if (day.Date) {
      const pD = document.createElement("p");
      pD.className = "date";
      const dt = new Date(day.Date);
      pD.textContent = dt.toLocaleDateString("en-US", {
        weekday: "short", month: "short",
        day: "2-digit", year: "numeric"
      });
      header.appendChild(pD);
    }

    // Significance
    if (day.Significance) {
      const pS = document.createElement("p");
      pS.className = "significance";
      pS.textContent = day.Significance;
      header.appendChild(pS);
    }

    card.appendChild(header);

    // ── BODY (EVENT GROUPS) ─────────────────────────────────
    const body = document.createElement("div");
    body.className = "card-body";

    // Helper: collect items from either morning/evening arrays
    // or fall back to any keys starting with morning*/evening*
    const collect = prefix => {
      if (Array.isArray(day[prefix])) {
        return day[prefix].filter(Boolean);
      }
      return Object.entries(day)
        .filter(([k,v]) => k.toLowerCase().startsWith(prefix) && v)
        .flatMap(([,v]) => Array.isArray(v) ? v : [v]);
    };

    [
      { key: "morning", title: "Morning Pooja, Aarti" },
      { key: "evening", title: "Evening Aarti & Pravachan" }
    ].forEach(group => {
      const items = collect(group.key);
      if (!items.length) return;

      const grp = document.createElement("div");
      grp.className = "event-group";

      const h3 = document.createElement("h3");
      h3.textContent = group.title;
      grp.appendChild(h3);

      const ul = document.createElement("ul");
      ul.className = "event-list";

      items.forEach(item => {
        const [time, ...rest] = item.split("–");
        const desc = rest.join("–").trim();

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.flexWrap = "nowrap";

        const spanTime = document.createElement("span");
        spanTime.className = "time";
        spanTime.textContent = time.trim();

        const strong = document.createElement("strong");
        strong.textContent = desc;

        li.append(spanTime, strong);
        ul.appendChild(li);
      });

      grp.appendChild(ul);
      body.appendChild(grp);
    });

    card.appendChild(body);
    container.appendChild(card);
  });
}
