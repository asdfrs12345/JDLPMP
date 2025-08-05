// script.js
// Replace this with your actual Web App URL
const API_URL = 'https://script.google.com/macros/s/AKfycbxdmJGYT5EKZ9cAPxBzrdz2bV1eQmoL2_JHF21HmVTRlhHbvDtKmZOi8NOORyRRCYgd/exec';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('schedule');

  fetch(API_URL)
    .then(res => {
      if (!res.ok) throw new Error('Network error');
      return res.json();
    })
    .then(days => {
      container.classList.remove('loading');
      container.innerHTML = '';

      days.forEach(day => {
        // 1) Create card wrapper
        const card = document.createElement('div');
        card.className = `day-card day-${day.DayNumber}`;

        // 2) Header
        const header = document.createElement('div');
        header.className = 'card-header';

        // Day X
        const h2 = document.createElement('h2');
        h2.textContent = `Day ${day.DayNumber}`;
        header.appendChild(h2);

        // Tithi
        if (day.Tithi) {
          const pT = document.createElement('p');
          pT.className = 'tithi';
          pT.textContent = day.Tithi;
          header.appendChild(pT);
        }

        // Date
        if (day.Date) {
          const pD = document.createElement('p');
          pD.className = 'date';
          const d = new Date(day.Date);
          pD.textContent = d.toLocaleDateString('en-US', {
            weekday:'short', month:'short', day:'2-digit', year:'numeric'
          });
          header.appendChild(pD);
        }

        // Significance
        if (day.Significance) {
          const pS = document.createElement('p');
          pS.className = 'significance';
          pS.textContent = day.Significance;
          header.appendChild(pS);
        }

        card.appendChild(header);

        // 3) Body with two groups
        const body = document.createElement('div');
        body.className = 'card-body';

        [
          { items: day.Morning, key: 'Morning Pooja, Aarti' },
          { items: day.Evening, key: 'Evening Aarti & Pravachan' }
        ].forEach(({ items, key }) => {
          if (!items || !items.length) return;
          const grp = document.createElement('div');
          grp.className = 'event-group';

          const h3 = document.createElement('h3');
          h3.textContent = key;
          grp.appendChild(h3);

          const ul = document.createElement('ul');
          ul.className = 'event-list';

          items.forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            ul.appendChild(li);
          });

          grp.appendChild(ul);
          body.appendChild(grp);
        });

        card.appendChild(body);
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      container.classList.remove('loading');
      container.textContent = 'Error loading schedule.';
    });
});
