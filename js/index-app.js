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
            const person = document.createElement('th');
            //if user name has (NP) at the end, remove the NP
            if (main[i].name.indexOf('(') != -1) {
            const slicedNameIndex = main[i].name.indexOf('(');
            const slicedName = main[i].name.slice(0, slicedNameIndex);
            person.innerHTML = slicedName;
            person.className = "not-paid";
            //if user name doesnt have (NP), just append the name
          } else {
            person.innerHTML = main[i].name;
          }
            person.setAttribute('scope', 'row');
            tableRow.appendChild(position);
            tableRow.appendChild(person);
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
    xhr.open('GET', 'https://raw.githubusercontent.com/Dannaroo/jammers-footy-tipping/gh-pages/json/main.json');
    xhr.send();
    console.log(main);

//////////////////////////////////////////////
    // Countdown Timer //
//////////////////////////////////////////////

// Set the date we're counting down to
var countDownDate = new Date("Oct 11, 2018 17:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="timer"
    document.getElementById("timer").innerHTML = "Time Left To Submit Your Tips: " + days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}, 1000);
