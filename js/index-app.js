const tableBody = document.querySelector('#tableBody');
let main = "";
const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          main = JSON.parse(xhr.responseText);
          for (let i = 0; i < main.length; i += 1) {
            const tableRow = document.createElement('tr');
            const position = document.createElement('td');
            position.innerHTML = i + 1;
            const name = document.createElement('th');
            name.innerHTML = main[i].name;
            name.setAttribute('scope', 'row');
            tableRow.appendChild(position);
            tableRow.appendChild(name);
            //23 is the number of numbers in each object
            for (let n = 1; n <= 23; n += 1) {
              const tableData = document.createElement('td');
              tableData.innerHTML = main[i][n];
              tableRow.appendChild(tableData);
            }
            const total = document.createElement('td');
            total.innerHTML = main[i].Total;
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
    xhr.open('GET', '../json/main.json');
    xhr.send();
    console.log(main);
