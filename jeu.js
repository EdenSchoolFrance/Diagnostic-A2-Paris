
let nomAleatoire = prenoms[Math.floor(Math.random() * prenoms.length)];

console.log(nomAleatoire);

const motElement = document.getElementById("mot");
motElement.textContent = "_ ".repeat(nomAleatoire.length).trim();

const $viesElement = document.getElementById("vies");
const $images = document.querySelector("#img");

let vies = 11;
let images = 12


let lettresUtilisees = [];

function verifierLettre(lettre) {
    if (lettresUtilisees.indexOf(lettre.toLowerCase()) !== -1) {
        alert("Vous avez déjà utilisé cette lettre !");
        return;
    }
    lettresUtilisees.push(lettre.toLowerCase());

    let motActuel = motElement.textContent.split(' ');
    let trouve = false;
    for (let i = 0; i < nomAleatoire.length; i++) {
        if (nomAleatoire[i].toLowerCase() === lettre.toLowerCase()) {
            motActuel[i] = nomAleatoire[i];
            trouve = true;
            
        }
        
    }

        document.getElementById("lettres-jouees").textContent = "Lettres jouées : " + lettresUtilisees.join(' ').toUpperCase()
    

    if (!trouve) {
        document.getElementById("lettres-fausses").textContent = document.getElementById("lettres-fausses").textContent +  lettre.toUpperCase() + " ";
        vies = vies - 1;
        images = images - 1;
        $viesElement.textContent = "Vies restantes : " + vies;
        $images.src = "imgs/img" + images + ".png";

        viesCheck();
    }

    motElement.textContent = motActuel.join(' ');
}

function viesCheck() {
    if (vies <= 0) {
        alert("Vous avez perdu ! Le nom était : " + nomAleatoire);
    } else {
        if (motElement.textContent.indexOf('_') === -1) {
            alert("Félicitations ! Vous avez gagné !");
        }
    }
}

function restart() {
    vies = 11;
    images = 12;
    lettresUtilisees = [];
    nomAleatoire = prenoms[Math.floor(Math.random() * prenoms.length)];
    motElement.textContent = "_ ".repeat(nomAleatoire.length).trim();
    $viesElement.textContent = "Vies restantes : " + vies;
    $images.src = "imgs/img" + images + ".png";
    document.getElementById("lettres-jouees").textContent = "Lettres jouées : ";
    document.getElementById("lettres-fausses").textContent = "Lettres fausses : ";
    console.log(nomAleatoire);
}
