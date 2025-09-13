const $wrongLetters = document.getElementById("lettres-fausses");
const $playedLetters = document.getElementById("lettres-jouees");
const $lives = document.getElementById("vies");
const $word = document.getElementById("mot");
const $img = document.getElementById("img");

let prenom;
let lives;
let playedLetters = [];
let wrongLetters = [];

let gameState = 0;

function getName() {
  let tempName =
    prenoms[Math.floor(Math.random() * prenoms.length)].toUpperCase();

  tempName = tempName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return tempName;
}

function startGame() {
  prenom = getName().split("");
  console.log(prenom);

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

  prenom.forEach((letter) => {
    if (playedLetters.includes(letter)) {
      displayName.push(letter);
    } else {
      displayName.push("_");
    }
  });

  checkWin(displayName);

  console.log(displayName);
  $word.textContent = displayName.join(" ");
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

function verifierLettre(letter) {
  if (gameState === 0) return;

  if (!playedLetters.includes(letter)) {
    playedLetters.push(letter);

    if (!prenom.includes(letter)) {
      wrongLetters.push(letter);
    }

    updateGame();
  } else alert("Lettre déjà jouée");
}

function restart() {
  startGame();
}

startGame();
