const $image = document.getElementById('img');
const $mot = document.getElementById('mot');
const $vies = document.getElementById('vies');
const $lettresFausses = document.getElementById('lettres-fausses');
const $lettresJouees = document.getElementById('lettres-jouees');

const $div = document.querySelectorAll('div');
const $rejouer = document.getElementById('restart');

let vies = 11;
let lettresFausses = [];
let lettresJouees = [];
let prénom = '';
let motTab = [];
let newCheck = [];
let imgs = [];
var motTabString = '';
var motActuel = '';
var aide = 0;
var aideTab = [];
var stop = false;
var aideCheckTab = [];

fetch('./images.json')
    .then(function (res) {
        return res.json();
    })

    .then(function (data) {
        imgs = data.images;
    })

function choisirPrénom() {
    fetch('./prenoms.json')
        .then(function (res) {
            return res.json()
        })

        .then(function (data) {
            prénom = data.prenoms[Math.floor(Math.random() * (data.prenoms.length - 1))]
            var prénomMaj = prénom.toUpperCase();
            newCheck = prénomMaj.split("");
            aideCheckTab = prénomMaj.split("");

            for (let i = 0; i < prénom.length; i++) {
                motTab.push('_ ');
            }

            motTabString = motTab.toString();
            motActuel = motTabString.replace(/,/g, "");

            $mot.textContent = motActuel;
        })
}

choisirPrénom();

$mot.style.fontWeight = 'bold';
$mot.style.fontSize = '2em';

$image.style.marginTop = '62';

const $aide = document.createElement("p");
$aide.setAttribute("id", "aide")
$aide.textContent = 'Aide : ';
$div[1].appendChild($aide);

const $letterÉ = document.createElement("button");
const $letterÈ = document.createElement("button");
const $letterË = document.createElement("button");
const $letterÏ = document.createElement("button");
const $letterÜ = document.createElement("button");
const $letterBarré = document.createElement("button");

$letterÉ.classList.add("lettre");
$letterÉ.setAttribute("onClick", "verifierLettre('É');")
$letterÉ.innerHTML = '<strong>É';
$letterÉ.style.marginRight = '5';

$letterÈ.classList.add("lettre");
$letterÈ.setAttribute("onClick", "verifierLettre('È');")
$letterÈ.innerHTML = '<strong>È';
$letterÈ.style.marginRight = '5';

$letterË.classList.add("lettre");
$letterË.setAttribute("onClick", "verifierLettre('Ë');")
$letterË.innerHTML = '<strong>Ë';
$letterË.style.marginRight = '5';

$letterÏ.classList.add("lettre");
$letterÏ.setAttribute("onClick", "verifierLettre('Ï');")
$letterÏ.innerHTML = '<strong>Ï';
$letterÏ.style.marginRight = '5';

$letterÜ.classList.add("lettre");
$letterÜ.setAttribute("onClick", "verifierLettre('Ü');")
$letterÜ.innerHTML = '<strong>Ü';
$letterÜ.style.marginRight = '5';

$letterBarré.classList.add("lettre");
$letterBarré.setAttribute("onClick", "verifierLettre('-');")
$letterBarré.innerHTML = '<strong>-';

$div[2].appendChild($letterÉ);
$div[2].appendChild($letterÈ);
$div[2].appendChild($letterË);
$div[2].appendChild($letterÏ);
$div[2].appendChild($letterÜ);
$div[2].appendChild($letterBarré);

const $lettres = document.querySelectorAll('.lettre');

$vies.textContent = `Il vous reste ${vies} vies.`;

function verifierLettre(lettre) {
    console.log(lettre)
}

function mettreAJourAffichage($lettre) {
    var doubleLettre = false;
    var mauvaiseLettre = false;
    var letter = $lettre.innerText.toUpperCase();
    if (!stop) {
        lettresJouees.push(` ${$lettre.innerText}`);

        var index = aideCheckTab.indexOf(letter);
        if (index > -1) {
            aideCheckTab.splice(index, 1);
        }

        for (let i = 0; i < newCheck.length; i++) {
            if (newCheck[i] === letter) {
                motTab[i] = newCheck[i];

                motTabString = motTab.toString();
                motActuel = motTabString.replace(/,/g, "");

                $mot.textContent = motActuel;

                $lettresJouees.textContent = `Lettres Jouees : ${lettresJouees}`;
                mauvaiseLettre = true;

                if (JSON.stringify(newCheck) === JSON.stringify(motTab))
                    finDePartie('gagné');
            }
        }

        if (!mauvaiseLettre) {
            if (vies != 1) {
                lettresFausses.push(` ${$lettre.innerText}`);
                for (let i = 0; i < lettresJouees.length; i++) {
                    var cur = lettresJouees[i];

                    if (lettresJouees.indexOf(cur) !== lettresJouees.lastIndexOf(cur)) {
                        lettresFausses.pop();
                        lettresJouees.pop();
                        alert("Lettre deja jouée");
                        doubleLettre = true;
                    }
                }
                if (!doubleLettre) {
                    vies -= 1;
                    if (vies == 8 || vies == 5 || vies == 2) {
                        aideTab.push(aideCheckTab[Math.floor(Math.random() * (aideCheckTab.length - 1))]);
                        $aide.textContent = 'Aide : ' + aideTab;
                    }
                    $image.setAttribute('src', imgs[vies]);
                    $vies.textContent = `Il vous reste ${vies} vies.`;
                    $lettresFausses.textContent = `Lettres Fausses : ${lettresFausses}`;
                    $lettresJouees.textContent = `Lettres Jouees : ${lettresJouees}`;
                }
            }
            else {
                $image.setAttribute('src', imgs[0]);
                $vies.textContent = `Il vous reste 0 vies.`;
                finDePartie('perdu');
            }
        }
    }
    else {
        alert("La partie est finie");
    }
}

function finDePartie(resultat) {
    switch (resultat) {
        case 'gagné':
            setTimeout(function () {
                alert("T'as gagné");
            }, 50);
            break;
        case 'perdu':
            setTimeout(function () {
                alert("Et c'est ainsi que le pauvre monsieur se pendit ; VOUS AVEZ PERDU !");
            }, 50);
            setTimeout(function () {
                motTabString = newCheck.toString();
                motActuel = motTabString.replace(/,/g, "");

                alert(`Le prénom était : ${motActuel}`);
            }, 100);
            break;
    }
    stop = true;
}

$lettres.forEach(function ($lettre) {
    $lettre.addEventListener("click", function () {
        mettreAJourAffichage($lettre);
    });
});

$rejouer.addEventListener("click", function () {
    stop = false;
    vies = 12;
    aide = 0;
    lettresFausses = [];
    lettresJouees = [];
    aideTab = [];
    motTab = [];
    $image.setAttribute('src', imgs[11]);
    $vies.textContent = `Il vous reste 12 vies.`;
    $lettresFausses.textContent = `Lettres Fausses : `;
    $lettresJouees.textContent = `Lettres Jouees : `;
    $aide.textContent = 'Aide : ';
    choisirPrénom();
})