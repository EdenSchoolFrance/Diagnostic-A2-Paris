const $incorrectLettres = document.getElementById("lettres-fausses");
const $playedLettres = document.getElementById("lettres-jouees");
const $img = document.getElementById("img");
const $healthPoints = document.getElementById("vies");
const $word = document.getElementById("mot");

let nameToFind = prenoms[Math.floor(Math.random() * prenoms.length)];
let correctLettres = "";
let incorrectLettres = "";
let playedLettres = "";
let remainingHealth = 11;

function verifyLettre(lettre) {
  if (playedLettres.includes(lettre)) return;
  playedLettres += lettre;
  displayPlayedLettres(playedLettres);
  if (
    nameToFind // retire les accents des lettres
      .toUpperCase()
      .normalize("NFD")
      .toUpperCase()
      .replace(/[\u0300-\u036f]/g, "")
      .includes(lettre.toUpperCase())
  ) {
    correctLettres += lettre;
    displayFoundLettres(nameToFind, correctLettres);
  } else {
    incorrectLettres += lettre;
    loseHealthPoint();
    displayIncorrectLettres(incorrectLettres);
  }

  setTimeout(() => {
    checkWin(nameToFind, correctLettres);
  }, 0);
}

function restart() {
  nameToFind = prenoms[Math.floor(Math.random() * prenoms.length)];
  correctLettres = "";
  incorrectLettres = "";
  playedLettres = "";

  updateHealth(11);
  displayIncorrectLettres(incorrectLettres);
  displayPlayedLettres(playedLettres);
  displayFoundLettres(nameToFind, correctLettres);
}

function loseHealthPoint() {
  updateHealth(remainingHealth - 1);
}

function updateHealth(health) {
  remainingHealth = health;
  displayHealth(health);
}

function displayHealth(health) {
  $img.setAttribute("src", imgs[health]);
  $healthPoints.textContent = "Vies restantes : " + health;
}

function displayIncorrectLettres(lettres) {
  $incorrectLettres.textContent = "Lettres Fausses : " + lettres;
}

function displayPlayedLettres(lettres) {
  $playedLettres.textContent = "Lettres Jouees : " + lettres;
}
function displayFoundLettres(word, lettres) {
  $word.textContent = word
    .split("")
    .map((l) =>
      lettres.includes(
        l // retire les accents des lettres
          .toUpperCase()
          .normalize("NFD")
          .toUpperCase()
          .replace(/[\u0300-\u036f]/g, "")
      )
        ? l
        : "_"
    )
    .join(" ");
}
function checkWin(word, lettres) {
  if (
    word
      .toLowerCase()
      .split("")
      .every((l) =>
        lettres.includes(
          l // retire les accents des lettres
            .toUpperCase()
            .normalize("NFD")
            .toUpperCase()
            .replace(/[\u0300-\u036f]/g, "")
        )
      )
  ) {
    alert("Victoire !!! Vous avez trouvé le prénom !!!");
  } else if (remainingHealth === 0) {
    alert("Défaite... Le prénom était " + nameToFind);
    restart();
  }
}

restart();
