const letterButtons   = document.querySelectorAll(".lettre");
const letterHolder    = document.getElementById("mot");
const img             = document.getElementById("img");
const viesElt         = document.getElementById("vies");
const lettresFausses  = document.getElementById("lettres-fausses");
const restartBtn      = document.getElementById("restart");

let motSecret = "";
let motAffiche = [];
let vies = 11;
let mauvaisesLettres = [];

function verifierLettre(lettre) {
  this.disabled = true;

  if (motSecret.includes(lettre)) {
    motSecret.split("").forEach((char, i) => {
      if (char === lettre) motAffiche[i] = lettre;
    });
  } else {
    vies--;
    mauvaisesLettres.push(lettre);
  }
  majAffichage();
  checkFinPartie();
}

function majAffichage() {
  letterHolder.textContent = motAffiche.join(" ");
  viesElt.textContent = `Vies restantes : ${vies}`;
  lettresFausses.textContent = `Lettres Fausses : ${mauvaisesLettres.join(" ")}`;
  img.src = `imgs/img${11 - vies}.png`; // suppose des images de img0.png à img11.png
}

function checkFinPartie() {
  if (!motAffiche.includes("_")) {
    setTimeout(() => alert(`Bravo ! Vous avez trouvé : ${motSecret}`), 200);
  } else if (vies <= 0) {
    setTimeout(() => alert(`Perdu ! Le mot était : ${motSecret}`), 200);
  }
}

function restart() {
  motSecret = prenoms[Math.floor(Math.random() * prenoms.length)];
  motAffiche = Array(motSecret.length).fill("_");
  vies = 11;
  mauvaisesLettres = [];
  letterButtons.forEach(btn => btn.disabled = false);
  majAffichage();
}

letterButtons.forEach(btn => {
  const lettre = btn.textContent.trim();  // A, B, C…
  btn.addEventListener("click", function() {
    verifierLettre.call(btn, lettre);
  });
});

restartBtn.addEventListener("click", restart);

restart();
