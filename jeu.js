function verifierLettre(lettre) {
    console.log(lettre)
}

let secretName;
 let indexAleatoire = Math.floor(Math.random() * prenoms.length);
    secretName = prenoms[indexAleatoire].toUpperCase();

const $namec = document.getElementById("mot")
$namec.textContent = secretName

let hiddenWord;
let lifes;
let wrongLetters = [];
let playedLetters = [];
let image = [];

fetch('./imgs.json')
    .then(function (res) {
        return res.json()
    })

    .then(function (data) {
        image = data.image;
    })

lifes = 11

function chooseWord() {
   



    hiddenWord = "";
    for (let i = 0; i < secretName.length; i++) {
        hiddenWord = hiddenWord + "_";
    }

    wrongLetters = [];
    playedLetters = [];

    let img = document.getElementById("img")


    document.getElementById("lettres-fausses").textContent = "Lettres Fausses : ";
    document.getElementById("lettres-jouees").textContent = "Lettres Jouees : ";

    let boutons = document.querySelectorAll(".lettre");
    for (let i = 0; i < boutons.length; i++) {
        boutons[i].disabled = false;
    }

}

function verifierLettre(lettre) {
    lifes -= 1
    document.getElementById("vies").textContent = "lifes restantes : " + lifes;

    document.getElementById("img").src = image[lifes];
    if (playedLetters.indexOf(lettre) === -1) {
        playedLetters.push(lettre);
        document.getElementById("lettres-jouees").textContent =
            "Lettres Jouees : " + playedLetters.join(" ");
    }
}

function disableButtons() {
    let boutons = document.querySelectorAll(".lettre");
    for (let i = 0; i < boutons.length; i++) {
        boutons[i].disabled = true;
    }
}

function restart() {
    chooseWord();
}
