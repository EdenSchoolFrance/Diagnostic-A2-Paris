function verifierLettre(lettre) {
    console.log(lettre)
}

// Variables
let vies;
let prenomMystere;
let motCache;
let lettresFausses = [];
let lettresJouees = [];

// Choisie un prénomet et start le jeu
function choisirMot() {
  prenomMystere = prenoms[Math.floor(Math.random() * prenoms.length)].toUpperCase();
  motCache = prenomMystere.replace(/./g, "_");
  vies = imgs.length - 1;
  lettresFausses = [];
  lettresJouees = [];

  // Mise à jour pour que l'affichage soit bien 
  document.getElementById("mot").textContent = motCache;
  document.getElementById("vies").textContent = "Vies restantes : " + vies;
  document.getElementById("img").src = imgs[vies];
  document.getElementById("lettres-fausses").textContent = "Lettres Fausses : ";
  document.getElementById("lettres-jouees").textContent = "Lettres Jouees : ";

  const boutons = document.querySelectorAll(".lettre");
  boutons.forEach(b => b.disabled = false); // sa sert a reactiver tout les boutons 
}

// toutes la fonction perme de verifier la lettre choisi 
function verifierLettre(lettre) {
  // sa sert a desactiver la lettre choisi pour ne pas reprendre la meme lettre 
  event.target.disabled = true;

  // dcp affichier la lettre dans la liste des lettres deja choisi plutot
  if (!lettresJouees.includes(lettre)) {
    lettresJouees.push(lettre);
    document.getElementById("lettres-jouees").textContent =
      "Lettres Jouees : " + lettresJouees.join(" ");
  }

  if (prenomMystere.includes(lettre)) {
    // si la lettre et dans le mote ça permet de reveler la lettre dans ce meme mot
    let nouveauMot = "";
    for (let i = 0; i < prenomMystere.length; i++) {
      nouveauMot += (prenomMystere[i] === lettre) ? lettre : motCache[i];
    }
    motCache = nouveauMot;
    document.getElementById("mot").textContent = motCache;

    // si l'utilisateur gagne sa permet de verifier si il a belle est bien gagner avec un message de victoire 
    if (motCache === prenomMystere) {
      alert("Bravo, tu as gagné!");
      desactiverBoutons();
    }
  } else {
    // c'est cqui permet de dire que la lettre est fausse 
    vies--;
    lettresFausses.push(lettre);
    document.getElementById("lettres-fausses").textContent =
      "Lettres Fausses : " + lettresFausses.join(" ");
    document.getElementById("vies").textContent = "Vies restantes : " + vies;
    document.getElementById("img").src = imgs[vies];

    // sa permet de verifier si il a perdu 
    if (vies === 0) {
      alert("Perdu! Le mot était : " + prenomMystere);
      desactiverBoutons();
    }
  }
}

// sa permet de desactiver tout les possibiltes de choix de lettre quand la patie est terminer
function desactiverBoutons() {
  const boutons = document.querySelectorAll(".lettre");
  boutons.forEach(b => b.disabled = true);
}

//  peremt de rejouer une parti et dcp sa relance le jeu 
function restart() {
  choisirMot();
}

// ça permet de lancer  au chargement de la page 
window.onload = choisirMot;