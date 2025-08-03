const SHEET_URL = "YOUR_WEB_APP_URL_HERE"; // Replace with actual URL

fetch(SHEET_URL)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("schedule");

    data.forEach(entry => {
      const card = document.createElement("div");
      card.className = "card " + getDharmaClass(entry.dayLabel);

      const header = document.createElement("h2");
      header.textContent = entry.dayLabel;

      const morning = document.createElement("div");
      morning.className = "section";
      morning.innerHTML = `<strong>🌅 Morning:</strong><br>${entry.morningBlock}`;

      const evening = document.createElement("div");
      evening.className = "section";
      evening.innerHTML = `<strong🌙 Evening:</strong><br>${entry.eveningBlock}`;

      card.appendChild(header);
      card.appendChild(morning);
      card.appendChild(evening);
      container.appendChild(card);
    });
  });

function getDharmaClass(label) {
  const dharma = label.split("\n").pop().toLowerCase();
  const map = {
    "uttam kshamaa": "kshamaa",
    "uttam maarjav": "maarjav",
    "uttam arjav": "arjav",
    "uttam shauch": "shauch",
    "uttam satya": "satya",
    "uttam sanyam": "sanyam",
    "uttam tap": "tap",
    "uttam tyaag": "tyaag",
    "uttam akinchan": "akinchan",
    "uttam brahmacharya": "brahmacharya"
  };
  return map[dharma] || "";
}
