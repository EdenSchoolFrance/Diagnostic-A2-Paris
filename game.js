const $name = document.getElementById("name");
const $falseLetters = document.getElementById("false-letters");
const $playedLetters = document.getElementById("played-letters");
const $lives = document.getElementById("lives");
const $img = document.getElementById("img");

let lives = 11;
let playedLetters = [];
let falseLetters = [];
let name = "";

// Choisit un prénom aléatoire et initialise le jeu
function choiceName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    name = names[randomIndex]
        .normalize("NFD")
        .toUpperCase()
        .replace(/[\u0300-\u036f]/g, "");
    playedLetters = [];
    falseLetters = [];
    lives = 11;
    displayUpdate();
}

// Vérifie la letter jouée
function letterVerification(letter) {
    letter = letter.toUpperCase();
    if (playedLetters.includes(letter) || falseLetters.includes(letter)) {
        alert("letter déjà jouée !");
        return;
    }
    if (name.includes(letter)) {
        playedLetters.push(letter);
    } else {
        playedLetters.push(letter);
        falseLetters.push(letter);
        lives--;
        $img.src = `imgs/img${lives + 1}.png`;
    }
    displayUpdate();
    endGame();
}

// Met à jour l'affichage du mot et des letters
function displayUpdate() {
    $name.textContent = name
        .split("")
        .map(letter => (playedLetters.includes(letter) ? letter : "_"))
        .join(" ");
    $lives.textContent = "Vies restantes : " + lives;
    $falseLetters.textContent = "lettres fausses : " + falseLetters.join(" ");
    $playedLetters.textContent = "lettres jouées : " + playedLetters.join(" ");
}

// Vérifie si la partie est gagnée ou perdue
function endGame() {
    if (lives <= 0) {
        alert("Perdu ! Le mot était : " + name);
        restart();
    }
    if (!$name.textContent.includes("_")) {
        alert("Gagné ! Le mot était : " + name);
        restart();
    }
}

// Recharge la page pour recommencer
function restart() {
    location.reload();
}

// Ajoute la gestion du clavier
document.addEventListener("keydown", (e) => {
    const letter = e.key;
    if (/^[a-zA-Z]$/.test(letter)) {
        letterVerification(letter);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    name = "";
    playedLetters = [];
    falseLetters = [];
    lives = 11;
    displayUpdate();
    choiceName();
});