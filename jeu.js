let prenom = ""
const lettres = document.querySelectorAll('.lettre');
const lettresJouer = document.querySelector('#lettres-jouees');
const lettresFausses = document.querySelector('#lettres-fausses');
const viesRestantes = document.querySelector('#vies');
const image = document.querySelector('#img');
let imageJSON = fetch('images.json').then(response => response.json())
let vie = 11
let mauvaisReponse = 0

async function randomPrenom() {
    let req = await fetch('prenoms.json').then(response => response.json());
    prenom = req[Math.floor(Math.random() * req.length)].toLowerCase().split('');
    console.log(prenom);
}

function verifierLettre(lettre) {
    if (prenom.includes(lettre.toLowerCase())) {
        lettresJouer.innerText += lettre + ' ';
    } else {
        mauvaisReponse++;
        image.src = imageJSON[mauvaisReponse];
        lettresFausses.innerText += lettre + ' ';
        vie--;
        viesRestantes.innerText = `Vies restantes : ${vie}`;
    }
    if (vie === 0) {
        alert('Vous avez perdu ! Le prénom était : ' + prenom.join(''));
        restart();
    }
    if (prenom.every(l => lettresJouer.innerText.toLowerCase().includes(l))) {
        alert('Félicitations ! Vous avez trouvé le prénom : ' + prenom.join(''));
        restart();
    }
}

function restart() {
    lettresJouer.innerText = 'Lettres Jouees :';
    lettresFausses.innerText = 'Lettres Fausses :';
    vie = 11;
    viesRestantes.innerText = `Vies restantes : ${vie}`;
    randomPrenom();
}





randomPrenom();
