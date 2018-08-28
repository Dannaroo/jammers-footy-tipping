const games = document.querySelectorAll('.games');
const selects = document.querySelectorAll('.selects');
const userName = document.querySelector('#userName');
const formNames = userName.children;
const bowl = document.querySelector('#round');
const li = round.querySelectorAll('li');
const tippingSheet = document.querySelector('#tippingSheet');
const submitYourTips = document.querySelector('#submitYourTips');
const clearTipsButton = document.querySelector('#clearTipsButton');

//Create form options based on innerHTML of #round
for(let i = 0; i < selects.length; i += 1) {
  const option1 = document.createElement('option');
  const option2 = document.createElement('option');
  option1.innerHTML = games[i].firstElementChild.innerHTML;
  option2.innerHTML = games[i].lastElementChild.innerHTML;
  selects[i].appendChild(option1);
  selects[i].appendChild(option2);
}

// Sort Form userName's alphabetically
function sortList() {
  //put the player names into an array
  const unTexts = new Array();
  for(let i = 1; i < userName.length; i += 1) {
      //keep the blank select option
    unTexts[0] = userName.options[0].text;
    userName.options[0].setAttribute('disabled', true);
    userName.options[0].setAttribute('selected', true);
    //log remaining names
    unTexts[i] = userName.options[i].text;
  }
  //sort the array alphabetically
  unTexts.sort();
  //relog the alphabetically sorted array names into the select menu
  for(let i = 1; i < unTexts.length; i += 1) {
      const parts = unTexts[i].split(',');
      userName.options[i].text = parts[0];

  }
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
      sortList();
    };
    xhr.open('GET', 'https://raw.githubusercontent.com/Dannaroo/jammers-footy-tipping/gh-pages/json/main.json');
    xhr.send();

    //create list of teams in the #round div from round JSON.
    //AJAX request
    let response = [];
    const xhr1 = new XMLHttpRequest();
        xhr1.onreadystatechange = function () {
          if (xhr1.readyState === 4) {
            if (xhr1.status === 200) {
              response = JSON.parse(xhr1.responseText);
              console.log(response);
            } else if (xhr1.status === 404) {
                //file not found
                console.log("error: file not found")
                alert(xhr1.statusText);
            } else {
                //server had a problem
                console.log("error: server had a problem")
                alert(xhr1.statusText);
            }
          }
          // function here
        };
        xhr1.open('GET', 'json/roundjson.json');
        xhr1.send();



//allow tipping sheet to be automatically filled in based on which team name is clicked.
bowl.addEventListener('click', (event) => {
  for(let i = 0; i < li.length; i += 1) {
    if(event.target === li[i]) {
      const team = event.target.innerHTML
      for(let i = 0; i < selects.length; i += 1) {
        if (team === selects[i].firstElementChild.nextElementSibling.innerHTML) {
          selects[i].selectedIndex = 1;
          event.target.style = "font-weight: 800";
          event.target.nextElementSibling.nextElementSibling.style = "font-weight: inherit"
        } else if (team === selects[i].lastElementChild.innerHTML) {
          selects[i].selectedIndex = 2;
          event.target.style = "font-weight: 800";
          event.target.previousElementSibling.previousElementSibling.style = "font-weight: inherit"
        }
      }
    }
  }
});

//style #round based on which teams are selected from drop down menus in tipping sheet
tippingSheet.addEventListener('change', () => {
  for (let i = 0; i < li.length; i += 1) {
    const team = li[i];
    const teamHTML = li[i].innerHTML;
    for (let i = 0; i < selects.length; i += 1) {
      if (selects[i].options[selects[i].selectedIndex].text === teamHTML) {
        team.style = "font-weight: 800";
        if (team === team.parentNode.lastElementChild) {
          team.previousElementSibling.previousElementSibling.style = "font-weight: inherit";
        } else if (team === team.parentNode.firstElementChild) {
            team.nextElementSibling.nextElementSibling.style = "font-weight: inherit";
        }
      }
    }
  }
});

//clear the tipping sheet of all selected tips
clearTipsButton.addEventListener('click', (event) => {
  event.preventDefault();
  for(let i = 0; i < selects.length; i += 1) {
    if (selects[i].selectedIndex !== 0) {
      selects[i].selectedIndex = 0;
      //Remove required attribute so clear button does not cause submit styling error
      selects[i].removeAttribute('required');
    }
  }
  for(let i = 0; i < li.length; i += 1) {
    li[i].style = "font-weight: inherit";
  }
});

// FORM SUBMISSION //
// let tipList = [];
// // add the tips to an array object
// submitYourTips.addEventListener('click', (event) => {
//   //readd required attribute to selects in case it was removed by clearTipsButton
//   for(let i = 0; i < selects.length; i += 1) {
//       selects[i].setAttribute('required');
//
//   }
//   event.preventDefault();
//   const tipList = new FormData(tippingSheet);
//   // let tipList = [];
  //   //split the URL address from the form data.
  //   formData = location.href.split('?')[1];
  //   //split the form data into segments
  //   console.log(formData);
  //   formData = formData.split('&');
  //   console.log(formData);
  //   for( let i = 0; i < formData.length; i += 1 ) {
  //     const keyValue = formData[i].split('=');
  //     let tipList = JSON.parse('{ key:value }');
  //   }

// });
