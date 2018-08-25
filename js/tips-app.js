const cardDeck = document.querySelector('#cardBody');
const cardList = cardDeck.children;
const searchButton = document.querySelector('#searchButton');
let tipsJSON = [];
const searchInput = document.querySelector('#searchInput');
const clearButton = document.querySelector('#clearButton');
const alphaSortButton = document.querySelector('#alphaSortButton');
let sortCount = 0;
const scoreSortButton = document.querySelector('#scoreSortButton');
const searchResultMessage = document.querySelector('#searchResultMessage');

///////////!BELOW IS FOR DRY REFRACTORING CARD BUILDING/////////
// function createElement(tag, property, value) {
//   const element = document.createElement(tag);
//   element[property] = value
// }
////////////////////////////////////////////////////

//calculate how many tips each player got right.
function tipResult(resultTips, playerTips) {
  const result = resultTips;
  const player = playerTips;
  let count = 0;
  for(const propt in resultTips) {
    if(propt !== 'name') {
      if(resultTips[propt] === playerTips[propt])
      count += 1;
    }
  }
  return count;
}
//add a check or cross to the Li's by comparing player object to result object
function addCheckCross(listItem, resultTip, playerTip) {
    const span = document.createElement('span');
    span.style = 'float: right';
    if(resultTip === playerTip) {
      span.innerHTML = '&#x02713;';
      listItem.className = 'list-group-item bg-success text-white';
      listItem.appendChild(span);
    } else {
      span.innerHTML =  '&#x02717;';
      listItem.className = 'list-group-item bg-danger text-white';
      listItem.appendChild(span);
    }
}

// Sort the deck of cards alphabetically
function sortList(clickedButton, text1, text2, sortValue) {
  const namesArray = new Array();
  for(let i = 0; i < cardList.length; i += 1) {
    //get the player names
    const name = cardList[i].querySelector(sortValue).textContent;
    //put the player names into an array
    namesArray[i] = name;
  }

  // Check if the button has been cliked before or not and toggle for reverse order
  if (sortCount === 0) {
      //sort the array alphabetically
    alphabetise(namesArray.sort(), sortValue);
    sortCount = 1;
    clickedButton.textContent = text1;
  } else if (sortCount === 1) {
    //sort the array reverse alphabetically
    alphabetise(namesArray.reverse(), sortValue);
    sortCount = 0;
    clickedButton.textContent = text2;
  }
}

//append the cards based on A-Z or Z-A passed into this function
function alphabetise(namesArray, sortValue) {
  //relog the alphabetically sorted array names into the deck.
  for(let i = 0; i < namesArray.length; i += 1) {
    const arrayName = namesArray[i];
    for(let a = 0; a < cardList.length; a += 1) {
      const cardName = cardList[a].querySelector(sortValue).textContent;
      //compare every array list name to every DOM name
      if (arrayName === cardName) {
          const card = cardList[a].querySelector(sortValue).parentNode.parentNode;
        //append if they match
        cardDeck.insertBefore(card, cardDeck[0]);
      }
    }
  }
}

//fetch result tips and player tips from the json file and display them on the page.
const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          tipsJSON = JSON.parse(xhr.responseText);
          for (let i = 0; i < tipsJSON.length; i += 1) {
            const card = document.createElement('div');
            card.className = 'card bg-secondary';
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            const heading = document.createElement('h5');
            heading.className = 'card-title text-white text-center';
            heading.textContent = tipsJSON[i].name;
            const unorderedList = document.createElement('ul');
            unorderedList.className = 'list-group';
            // Loop through the JSON object properties and add them to a new li
            for(const propt in tipsJSON[i]) {
              if(propt !== 'name') {
                const listItem = document.createElement('li');
                listItem.innerHTML = tipsJSON[i][propt];
                addCheckCross(listItem, tipsJSON[0][propt], tipsJSON[i][propt]);
                unorderedList.appendChild(listItem);
              }
            }

            cardBody.appendChild(heading);
            cardBody.appendChild(unorderedList);
            card.appendChild(cardBody);

            const cardFooter = document.createElement('div');
            cardFooter.className = 'card-footer text-center';
            const footerButton = document.createElement('button');
            footerButton.className = 'btn btn-info';
            footerButton.setAttribute('type', 'button');

            footerButton.textContent = tipResult(tipsJSON[0], tipsJSON[i]);
            cardFooter.appendChild(footerButton);

            card.appendChild(cardFooter);

            cardDeck.appendChild(card);
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
    xhr.open('GET', 'https://raw.githubusercontent.com/Dannaroo/jammers-footy-tipping/gh-pages/json/tipsjson.json');
    // xhr.open('GET', 'json/tipsjson.json');
    xhr.send();


    // Create sortForm functionality
    //Operate search bar function ON-PAGE
searchButton.addEventListener('click', () => {
  let cardCount = 0;
  for (let i = 0; i < cardList.length; i += 1) {
    const title = cardList[i].querySelector('.card-title').textContent;
    if ( title.toLowerCase().includes(searchInput.value.toLowerCase()) ) {
      cardList[i].style.display="block";
      cardCount += 1;
    } else {
      cardList[i].style.display="none";
    }
  }
  if (cardCount > 0) {
  searchResultMessage.style = "display: block";
  searchResultMessage.innerHTML = "Your search of '" + searchInput.value.toLowerCase()
  + "' returned " + cardCount + " results."
} else {
  searchResultMessage.style = "display: block";
  searchResultMessage.innerHTML = "Sorry, your search of '" + searchInput.value.toLowerCase()
  + "' returned no results."
}

});

//Operate clear search button
clearButton.addEventListener('click', () => {
  for (let i = 0; i < cardList.length; i += 1) {
    if (cardList[i].style.display="none") {
      cardList[i].style.display="block";
    }
  }
  searchResultMessage.style = "display: none";
  searchInput.value = "";
});

//Sort alphabetically
alphaSortButton.addEventListener('click', (event) => {
  sortList(event.target, 'Sort Z to A', 'Sort A to Z', '.card-title');
});

//Sort numerically
scoreSortButton.addEventListener('click', (event) => {
  sortList(event.target, 'Sort High to Low', 'Sort Low to High', '.btn-info');
});
