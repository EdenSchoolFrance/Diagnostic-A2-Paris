const $wrongLetters = document.getElementById("lettres-fausses");
const $playedLetters = document.getElementById("lettres-jouees");
const $lives = document.getElementById("vies");
const $word = document.getElementById("mot");
const $img = document.getElementById("img");

let prenom;
let lives = 11;
let playedLetters = [];
let wrongLetters = [];

function startGame() {
  prenom = prenoms[Math.floor(Math.random() * prenoms.length)];

  prenom = prenom
    .normalize("NFD") // sépare les lettres et leurs accents
    .toUpperCase()
    .replace(/[\u0300-\u036f]/g, ""); // enlève les accents

  console.log(prenom);
}

function restart() {
  playedLetters = [];
  wrongLetters = [];
  lives = 11;

  $wrongLetters.textContent = `lettres Fausses : ${wrongLetters}`;
  $playedLetters.textContent = `Lettres Jouees ; ${playedLetters}`;
  $lives.textContent = `Vies restantes : ${lives}`;

  startGame();
}

function updateGame() {
  $word.textContent = prenom
    .split("")
    .map((l) => (playedLetters.includes(l) ? l : "_"))
    .join(" ");

  $wrongLetters.textContent = `Lettres fausses : ${wrongLetters}`;
  $playedLetters.textContent = `Lettres Jouees : ${playedLetters}`;
  $lives.textContent = `Vies restantes : ${lives}`;
  $img.setAttribute("src", `imgs/img${lives + 1}.png`);

  if (lives <= 0) {
    $word.textContent = prenom;
    setTimeout(() => alert("Perdu !"), 100);
  } else if (checkWin()) {
    setTimeout(() => alert("Gagné !"), 100);
  }
}

function checkWin() {
  return prenom.split("").every((letter) => playedLetters.includes(letter));
}

function verifierLettre(letter) {
  if (!playedLetters.includes(letter)) {
    playedLetters.push(letter);

    if (!prenom.includes(letter)) {
      lives--;
      wrongLetters.push(letter);
    }
  } else alert("Lettre déjà jouée");

  updateGame();
}

startGame();
