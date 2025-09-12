const $mot = document.getElementById("mot");
const $lettresFausses = document.getElementById("lettres-fausses");
const $lettresJouees = document.getElementById("lettres-jouees");
const $vies = document.getElementById("vies");
const $img = document.getElementById("img");

let lives = 11;
let playedLetters = [];
let falseLetters = [];
let word = "";

// Choisit un prénom aléatoire et initialise le jeu
function choiceName() {
    const randomIndex = Math.floor(Math.random() * prenoms.length);
    word = prenoms[randomIndex]
        .normalize("NFD")
        .toUpperCase()
        .replace(/[\u0300-\u036f]/g, "");
    playedLetters = [];
    falseLetters = [];
    lives = 11;
    displayUpdate();
}

// Vérifie la lettre jouée
function verifierLettre(lettre) {
    lettre = lettre.toUpperCase();
    if (playedLetters.includes(lettre) || falseLetters.includes(lettre)) {
        alert("Lettre déjà jouée !");
        return;
    }
    if (word.includes(lettre)) {
        playedLetters.push(lettre);
    } else {
        playedLetters.push(lettre);
        falseLetters.push(lettre);
        lives--;
        $img.src = `imgs/img${lives + 1}.png`;
    }
    displayUpdate();
    endGame();
}

// Met à jour l'affichage du mot et des lettres
function displayUpdate() {
    $mot.textContent = word
        .split("")
        .map(letter => (playedLetters.includes(letter) ? letter : "_"))
        .join(" ");
    $vies.textContent = "Vies restantes : " + lives;
    $lettresFausses.textContent = "Lettres fausses : " + falseLetters.join(" ");
    $lettresJouees.textContent = "Lettres jouées : " + playedLetters.join(" ");
}

// Vérifie si la partie est gagnée ou perdue
function endGame() {
    if (lives <= 0) {
        alert("Perdu ! Le mot était : " + word);
        restart();
    }
    if (!$mot.textContent.includes("_")) {
        alert("Gagné ! Le mot était : " + word);
        restart();
    }
}

// Recharge la page pour recommencer
function restart() {
    location.reload();
}

// Ajoute la gestion du clavier
document.addEventListener("keydown", (e) => {
    const lettre = e.key;
    if (/^[a-zA-Z]$/.test(lettre)) {
        verifierLettre(lettre);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    word = "";
    playedLetters = [];
    falseLetters = [];
    lives = 11;
    displayUpdate();
    choiceName();
});