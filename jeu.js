// HTML ELEMENTS
const $mot = document.querySelector("#mot");
const $img = document.querySelector("#img");
const $lettresFausses = document.querySelector("#lettres-fausses");
const $lettresjouees = document.querySelector("#lettres-jouees");
const $vies = document.querySelector("#vies");
const $lettres = document.querySelectorAll(".lettre");

//HTML INPUT BTN SELECT ANCRE

//PARAMETRES
let RandomNumber = 0;
let letterName;
let selectedName;
let currentImage = 10;
let letterGuess = [];
let letterPlayed = []
let lettreWrong = [];
let vieRestante = 11;
let motAfficher = "";

//MAIN
async function main() {
  const name = prenoms
  randomSelectName(name);
  guessWord();
}
main();

// IMAGE UPDATE
async function imageUpdate() {
  const images = img
  $img.src = images[currentImage];
  currentImage === 0 ? updateStatusGame("loose") : currentImage--;
}

// RANDOM SELECT NAME
function randomSelectName(name) {
  selectedName = name[Math.floor(Math.random() * 2578)];
  letterName = selectedName.toUpperCase().split("");
  console.log(selectedName);
}

// VERIF LETTER
function verifierLettre(letterChoice) {
  let verif = letterName.filter((element) => letterChoice === element);
  if (letterPlayed.includes(letterChoice)) {
    alert("Déja jouer !");
    return;
  }
  if (verif.length !== 0) {
    for (let i = 0; i < verif.length; i++) {
      letterGuess.push(letterChoice)
      console.log(letterGuess);
      guessWord();
    }
    letterPlayed.push(letterChoice)
  } else {
    lettreWrong.push(letterChoice);
    imageUpdate();
    updateLifePlayer();
  }
  updateLettrePlayed();
}

//UPDATE MOT A TROUVER
function guessWord() {
  let hide = letterName.map((lettre) => {
    if (letterGuess.includes(lettre)) {
      return lettre;
    } else {
      return "_";
    }
  });

  motAfficher = hide.join(" ");
  if (motAfficher == letterName.join(" ")) {
    updateStatusGame("win");
  }
  $mot.textContent = motAfficher;
}

//UPDATE LETTRE PLAYED
function updateLettrePlayed() {
  $lettresjouees.textContent = "Lettres Jouees : ";
  letterPlayed.forEach(
    (element) =>
      ($lettresjouees.textContent = $lettresjouees.textContent + `${element} `)
  );

  $lettresFausses.textContent = "Lettres Fausses : ";
  lettreWrong.forEach((element) => {
    $lettresFausses.textContent = $lettresFausses.textContent + `${element} `
    $lettresjouees.textContent = $lettresjouees.textContent + `${element} `
  })
}

//UPDATE LIFE
function updateLifePlayer() {
  vieRestante--;
  $vies.textContent = `Vies restantes : ${vieRestante}`;
}

//CHECK WIN/LOOSE
function updateStatusGame(status) {
  if (status == "loose") {
    alert(`Dommage tu as perdu, le nom était ${selectedName}`);
    $lettres.forEach((element) => element.setAttribute("disabled", true));
  } else if (status == "win") {
    alert(`Bien jouer tu as trouvé, c'était ${selectedName}`);
    $lettres.forEach((element) => element.setAttribute("disabled", true));
  }
}

//EVENT RESET GAME BTN
async function restart() {
  const images = await requestImage();
  $lettres.forEach((element) => element.removeAttribute("disabled"));
  RandomNumber = 0;
  letterName;
  selectedName;
  currentImage = 10;
  letterGuess = [];
  lettreWrong = [];
  vieRestante = 12;
  motAfficher = "";
  $img.src = images[currentImage];
  updateLifePlayer();
  updateLettrePlayed();
  updateStatusGame();
  main();
}

function forfeit() {
  alert(`Le nom était ${selectedName}`);
}