const cardDeck = document.querySelector('#cardBody');
const cardList = cardDeck.children;
const searchButton = document.querySelector('#searchButton');
let tipsJSON = [];
const searchInput = document.querySelector('#searchInput');
const clearButton = document.querySelector('#clearButton');


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
    xhr.open('GET', 'json/tipsjson.json');
    xhr.send();

    // Create sortForm functionality
    //Operate search bar function ON-PAGE
searchButton.addEventListener('click', () => {
  for (let i = 0; i < cardList.length; i += 1) {
    let title = tipsJSON[i].name;
    if ( title.toLowerCase().includes(searchInput.value.toLowerCase()) ) {
      cardList[i].style.display="block";
    } else {
      cardList[i].style.display="none";
    }
  }

});

//Operate clear search button
clearButton.addEventListener('click', () => {
  for (let i = 0; i < cardList.length; i += 1) {
    if (cardList[i].style.display="none") {
      cardList[i].style.display="block";
    }
  }
  searchInput.value = "";
});
