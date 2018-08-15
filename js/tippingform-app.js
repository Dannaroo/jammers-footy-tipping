const games = document.querySelectorAll('.games');
const tips = document.querySelectorAll('.tips');
const userName = document.querySelector('#userName');
const bowl = document.querySelector('#round');
const li = round.querySelectorAll('li');

//Create form options based on innerHTML of #round
for(let i = 0; i < tips.length; i += 1) {
  const option1 = document.createElement('option');
  const option2 = document.createElement('option');
  option1.innerHTML = games[i].firstElementChild.innerHTML;
  option2.innerHTML = games[i].lastElementChild.innerHTML;
  tips[i].appendChild(option1);
  tips[i].appendChild(option2);
}

//create list of userNames in the form from main.json file.
//AJAX request
const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          main = JSON.parse(xhr.responseText);
          //loop through the list of user names
          for (let i = 0; i < main.length; i += 1) {
            const person = document.createElement('option');
            //if user name has (NP) at the end, remove the NP
            if (main[i].name.indexOf('(') != -1) {
            const slicedNameIndex = main[i].name.indexOf('(');
            const slicedName = main[i].name.slice(0, slicedNameIndex);
            person.innerHTML = slicedName;
            //if user name doesnt have (NP), just append the name
          } else {
            person.innerHTML = main[i].name;
          }
            userName.appendChild(person);
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

bowl.addEventListener('click', () => {
  for(let i = 0; i < li.length; i += 1) {
    if(event.target === li[i]) {
      const team = event.target.innerHTML
      for(let i = 0; i < tips.length; i += 1) {
        if (team === tips[i].firstElementChild.nextElementSibling.innerHTML) {
          tips[i].selectedIndex = 1;
          event.target.style = "font-weight: 800";
        } else if (team === tips[i].lastElementChild.innerHTML) {
          tips[i].selectedIndex = 2;
          event.target.style = "font-weight: 800";
        }
      }
    }
  }
});
