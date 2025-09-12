const $wrongLetters = document.getElementById("lettres-fausses");
const $playedLetters = document.getElementById("lettres-jouees");
const $lives = document.getElementById("vies");
const $word = document.getElementById("mot");
const $img = document.getElementById("img");

let word;
let lives = 11;
let playedLetters = [];
let wrongLetters = [];

function initGame() {
    word = prenoms[Math.floor(Math.random() * prenoms.length)];
    // retire tous les accents des lettres
    word = word
        .normalize("NFD")
        .toUpperCase()
        .replace(/[\u0300-\u036f]/g, "");


    updateGame();
}

function verifierLettre(lettre) {
    if (!playedLetters.includes(lettre)) {
        playedLetters.push(lettre);

        if (word.includes(lettre)) {} else {
            updateLives(lettre);
        }
    } else {
        alert("Lettre déjà jouée");
    }

    updateGame();
}

function updateLives(letter) {
    lives--;
    wrongLetters.push(letter);
}

function updateGame() {
    //mettre à jour l'affichage du mot
    $word.textContent = word
        .split("")
        .map((l) => (playedLetters.includes(l) ? l : "_"))
        .join(" ");

    $img.src = `imgs/img${lives + 1}.png`;
    $wrongLetters.textContent = "Lettres Fausses : " + wrongLetters;
    $playedLetters.textContent = "Lettres Jouees : " + playedLetters;
    $lives.textContent = "Vies restantes : " + lives;
    if (lives <= 0) {
        gameOver(false);
    } else if (checkWin()) {
        gameOver(true);
    }
}

function gameOver(win) {
    if (win) {
        setTimeout(() => alert("Gagné !"), 100);
    } else {
        $word.textContent = word
        setTimeout(() => alert("Perdu !"), 100);
    }
}

function checkWin() {
    return word.split("").every((l) => playedLetters.includes(l));
}

function restart() {
    playedLetters = [];
    wrongLetters = [];
    lives = 11;

    $wrongLetters.textContent = "Lettres Fausses : " + wrongLetters;
    $playedLetters.textContent = "Lettres Jouees : " + playedLetters;
    $lives.textContent = "Vies restantes : " + lives;

    initGame();
}

initGame();