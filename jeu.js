function verifierLettre(lettre) {
    console.log(lettre)
}

let prenomChoisi = "";
let motAffiche = [];
let vies = imgs.length - 1;
let lettresJouees = [];
let lettresFausses = [];

function choisirPrenom() {
    const index = Math.floor(Math.random() * listePrenoms.length);
    prenomChoisi = listePrenoms[index].toUpperCase();
    motAffiche = Array(prenomChoisi.length).fill("_");
    vies = imgs.length - 1;
    lettresJouees = [];
    lettresFausses = [];
    mettreAJourAffichage();
    document.getElementById("img").src = imgs[vies];
}

function verifierLettre(lettre) {
    lettre = lettre.toUpperCase();

    if (lettresJouees.includes(lettre)) {
        alert("Lettre déjà jouée !");
        return;
    }

    lettresJouees.push(lettre);

    if (prenomChoisi.includes(lettre)) {
        for (let i = 0; i < prenomChoisi.length; i++) {
            if (prenomChoisi[i] === lettre) {
                motAffiche[i] = lettre;
            }
        }
    } else {
        lettresFausses.push(lettre);
        vies--;
        document.getElementById("img").src = imgs[vies];
    }

    mettreAJourAffichage();
    finDePartie();
}

function mettreAJourAffichage() {
    document.getElementById("mot").textContent = motAffiche.join(" ");
    document.getElementById("vies").textContent = `Vies restantes : ${vies}`;
    document.getElementById("lettres-fausses").textContent = `Lettres Fausses : ${lettresFausses.join(", ")}`;
    document.getElementById("lettres-jouees").textContent = `Lettres Jouées : ${lettresJouees.join(", ")}`;
}

function finDePartie() {
    if (!motAffiche.includes("_")) {
        alert("🎉 Bravo ! Vous avez trouvé le prénom !");
    } else if (vies === 0) {
        alert(`💀 Perdu ! Le prénom était : ${prenomChoisi}`);
        motAffiche = prenomChoisi.split("");
        mettreAJourAffichage();
    }
}

function restart() {
    choisirPrenom();
}

window.onload = choisirPrenom;