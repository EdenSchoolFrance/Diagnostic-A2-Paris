function verifierLettre(lettre) {
    console.log(lettre)
}

let secretName;
let hiddenWord;
let lifes;
let wrongLetters = [];
let playedLetters = [];

function chooseWord() {
    let indexAleatoire = Math.floor(Math.random() * prenoms.length);
    secretName = prenoms[indexAleatoire].toUpperCase();

    hiddenWord = "";
    for (let i = 0; i < secretName.length; i++) {
        hiddenWord = hiddenWord + "_";
    }

    lifes = imgs.length - 1;

    wrongLetters = [];
    playedLetters = [];

    document.getElementById("mot").textContent = hiddenWord;
    document.getElementById("lifes").textContent = "lifes restantes : " + lifes;
    document.getElementById("img").src = imgs[lifes];
    document.getElementById("lettres-fausses").textContent = "Lettres Fausses : ";
    document.getElementById("lettres-jouees").textContent = "Lettres Jouees : ";

    // réactiver tous les boutons
    let boutons = document.querySelectorAll(".lettre");
    for (let i = 0; i < boutons.length; i++) {
        boutons[i].disabled = false;
    }
}

// Vérifier une lettre cliquée
function verifierLettre(lettre) {
    // ajouter la lettre dans les jouées si pas encore
    if (playedLetters.indexOf(lettre) === -1) {
        playedLetters.push(lettre);
        document.getElementById("lettres-jouees").textContent =
            "Lettres Jouees : " + playedLetters.join(" ");
    }

    // si la lettre est dans le mot
    if (secretName.indexOf(lettre) !== -1) {
        let nouveauMot = "";
        for (let i = 0; i < secretName.length; i++) {
            if (secretName[i] === lettre) {
                nouveauMot = nouveauMot + lettre;
            } else {
                nouveauMot = nouveauMot + hiddenWord[i];
            }
        }
        hiddenWord = nouveauMot;
        document.getElementById("mot").textContent = hiddenWord;

        if (hiddenWord === secretName) {
            alert("Bravo, tu as gagné!");
            disableButtons();
        }
    } else {
        lifes = lifes - 1;
        wrongLetters.push(lettre);
        document.getElementById("lettres-fausses").textContent =
            "Lettres Fausses : " + wrongLetters.join(" ");
        document.getElementById("lifes").textContent = "lifes restantes : " + lifes;
        document.getElementById("img").src = imgs[lifes];

        if (lifes === 0) {
            alert("Perdu! Le mot était : " + secretName);
            disableButtons();
        }
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
