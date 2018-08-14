const games = document.querySelectorAll('.games');
const tips = document.querySelectorAll('.tips');

//Create form options based on innerHTML of #round
for(let i = 0; i < tips.length; i += 1) {
  const option1 = document.createElement('option');
  const option2 = document.createElement('option');
  option1.innerHTML = games[i].firstElementChild.innerHTML;
  option2.innerHTML = games[i].lastElementChild.innerHTML;
  tips[i].appendChild(option1);
  tips[i].appendChild(option2);
}
