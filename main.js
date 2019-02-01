import superHeroes from './heroes.js'
/* Imports the Pictures, sort them and then randomize it */
const gameGrid = superHeroes
  .concat(superHeroes)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
var userHasClicked = false;
let matchCount = 0;

let popup = document.getElementById('winpop');
const game = document.getElementById('game');
const grid = document.createElement('section');

/* Steps Count */
let stepsCount = 1;
var steps = document.querySelector('.steps');
var finalMove = '';

/* Timer */
var second = 0, minute = 0;
var timer = document.querySelector('.timer');
var interval = '';
var finalTime = '';

grid.setAttribute('class', 'grid');
game.appendChild(grid);

/* Makes the divs and the grid */
gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

/* Counts all the matches and if you have picked all 24 cards you get the popup */
const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
    matchCount++
    if (matchCount == 24) {
        congratz();
        startTimer();
        console.log('You matched a Hero!');
    }
  });
};

/* Reset the Guesses */
const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
  

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

/* Checks if the clicks have a match or not */
grid.addEventListener('click', event => {
  if (!userHasClicked) {
      startTimer();
      userHasClicked = true;
  }
  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('grid') ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ){  return; }

  if (count < 2) {
    count++;
    moveCounter();
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});

/* Pop-up screen */
function congratz () {
  finalTime = timer.innerHTML;
  finalMove = steps.innerHTML;
  popup.classList.add('show');

  document.getElementById("totalMove").innerHTML = finalMove;
  document.getElementById("totalTime").innerHTML = finalTime;
}

/* Timer that counts the seconds */
function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if (second == 60){
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

/* Move Counter */
function moveCounter () {
  steps.innerHTML = stepsCount + " steps";
  stepsCount++;
}

/* Restart the game button */
document.getElementById('reload').addEventListener('click', restartGame);
document.getElementById('reloadGame').addEventListener('click', restartGame);

function restartGame() {
  location.reload();
}

/* Close Rule Screen */
var rules = document.getElementById("rulelink").addEventListener('click', theRuless);
var rulepopup = document.getElementById("rulesPop");
var closebtn = document.getElementById("ruleclose").addEventListener('click', theRuless);

/* Show the Rules */
function theRuless () {
  rulepopup.classList.toggle("show");
}

/* Return to index */
document.getElementById('return').addEventListener('click', returnMe);
function returnMe () {
  window.location.replace("/index.html");
}