var charName = [
  "ironman",
  "thor",
  "loki",
  "oden",
  "spiderman",
  "blackwidow",
  "thanos",
  "captainamerica",
  "hulk",
  "blackpanther",
  "wolverine",
  "deadpool",
  "antman",
  "groot",
  "nickfury",
  "doctorstrange",
  "hawkeye"
];

let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = charName[Math.floor(Math.random() * charName.length)];
}


function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
     <button
       class="btn btn-lg btn-primary m-2"
       id='` + letter + `'
       onClick="handleGuess('` + letter + `')"
     >
       ` + letter + `
     </button>
   `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;

  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }

}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = '<span style="color:navy;">You Won!!!</span>';
  }

}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordspotlight').innerHTML = '<em>The answer was: </em>' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordspotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
