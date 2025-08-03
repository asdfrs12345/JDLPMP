<script>
  document.addEventListener("DOMContentLoaded", () => {
    const endpoint = "https://script.google.com/macros/s/AKfycbxdmJGYT5EKZ9cAPxBzrdz2bV1eQmoL2_JHF21HmVTRlhHbvDtKmZOi8NOORyRRCYgd/exec";

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        const container = document.getElementById("schedule");
        container.innerHTML = "";

        data.forEach(day => {
          const card = document.createElement("div");
          card.className = "card";

          // 🔷 Add symbolic class based on Dashlakshan theme
          const theme = day.dayLabel?.match(/Uttam\s+\w+/i)?.[0]?.toLowerCase().replace(/\s+/g, "-");
          if (theme) {
            card.classList.add("day-" + theme);
          } else {
            card.classList.add("day-default");
          }

          // 🔷 Day label
          const dayLabel = document.createElement("div");
          dayLabel.className = "day-label";
          dayLabel.textContent = day.dayLabel || "Untitled Day";

          // 🔷 Morning block
          const morningBlock = document.createElement("div");
          morningBlock.className = "block";
          morningBlock.textContent = "Morning:\n" + (day.morningBlock || "Details not available");

          // 🔷 Evening block
          const eveningBlock = document.createElement("div");
          eveningBlock.className = "block";
          eveningBlock.textContent = "Evening:\n" + (day.eveningBlock || "Details not available");

          // 🔷 Assemble card
          card.appendChild(dayLabel);
          card.appendChild(morningBlock);
          card.appendChild(eveningBlock);
          container.appendChild(card);
        });
      })
      .catch(error => {
        const container = document.getElementById("schedule");
        container.innerText = "Error loading schedule.";
        console.error("Fetch error:", error);
      });
  });
</script>
