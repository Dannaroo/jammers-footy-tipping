const tableBody = document.querySelector('#tableBody');

const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const ladder = JSON.parse(xhr.responseText);
          console.log(ladder);
          for (let i = 0; i < ladder.length; i += 1) {
          const tableRow = document.createElement('tr');
          const position = document.createElement('td');
          position.innerHTML = i + 1;
          const team = document.createElement('th');
          team.innerHTML = ladder[i].Team;
          team.setAttribute('scope', 'row');
          const p = document.createElement('td');
          p.innerHTML = ladder[i].P;
          const w = document.createElement('td');
          w.innerHTML = ladder[i].W;
          const d = document.createElement('td');
          d.innerHTML = ladder[i].D;
          const l = document.createElement('td');
          l.innerHTML = ladder[i].L;
          const f = document.createElement('td');
          f.innerHTML = ladder[i].F;
          const a = document.createElement('td');
          a.innerHTML = ladder[i].A;
          const percentage = document.createElement('td');
          percentage.innerHTML = ladder[i].Percentage;
          const total = document.createElement('td');
          total.innerHTML = ladder[i].Total;
          tableRow.appendChild(position);
          tableRow.appendChild(team);
          tableRow.appendChild(p);
          tableRow.appendChild(w);
          tableRow.appendChild(d);
          tableRow.appendChild(l);
          tableRow.appendChild(f);
          tableRow.appendChild(a);
          tableRow.appendChild(percentage);
          tableRow.appendChild(total);
          tableBody.appendChild(tableRow);
          }
        } else if (xhr.status === 404) {
            //file not found
            console.log("error: file not found")
            alert(xhr.statusText);
        } else {
            //server had a problem
            console.log("error: server had a problem")
            alert(xhr.statusText);
        }
      }
    };
    xhr.open('GET', 'https://raw.githubusercontent.com/Dannaroo/jammers-footy-tipping/gh-pages/json/ladderjson.json');
    xhr.send();
