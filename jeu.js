const $wrongLetters = document.getElementById("wrong-letters");
const $playedLetters = document.getElementById("played-letters");
const $lives = document.getElementById("lives");
const $word = document.getElementById("word");
const $img = document.getElementById("img");

let name;
let lives;
let playedLetters = [];
let wrongLetters = [];

let gameState = 0;

function getName() {
  let tempName = names[Math.floor(Math.random() * names.length)].toUpperCase();

  // Remove special characters
  tempName = tempName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return tempName;
}

function startGame() {
  name = getName().split("");
  console.log(name);

  playedLetters = [];
  wrongLetters = [];

  gameState = 1;

  updateGame();
}

function updateGame() {
  lives = 11 - wrongLetters.length;

  $wrongLetters.textContent = `Lettres Fausses : ${wrongLetters}`;
  $playedLetters.textContent = `Lettres Jouees : ${playedLetters}`;
  $lives.textContent = `Vies restantes ${lives}`;
  $img.setAttribute("src", `/imgs/img${lives + 1}.png`);

  updateName();
}

function updateName() {
  let displayName = [];

  name.forEach((letter) => {
    if (playedLetters.includes(letter)) {
      displayName.push(letter);
    } else {
      displayName.push("_");
    }
  });

  checkWin(displayName);

  // If game ended display the full name
  console.log(displayName);
  if (gameState === 1) {
    $word.textContent = displayName.join(" ");
  } else {
    $word.textContent = name.join(" ");
  }
}

function checkWin(displayName) {
  if (!displayName.includes("_") && lives > 0) {
    alert("Vous avez gagné !");
    gameState = 0;
  } else if (lives <= 0) {
    alert("Vous avez perdu !");
    gameState = 0;
  }
}

function checkLetter(letter) {
  // Check if the game is still going
  if (gameState === 0) return;

  if (!playedLetters.includes(letter)) {
    playedLetters.push(letter);

    if (!name.includes(letter)) {
      wrongLetters.push(letter);
    }

    updateGame();
  } else alert("Lettre déjà jouée");
}

function restart() {
  startGame();
}

startGame();
