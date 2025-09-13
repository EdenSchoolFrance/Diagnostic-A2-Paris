const mot = document.querySelector("#mot")
const vies = document.querySelector("#vies")
const imgs = ["imgs/img1.png", "imgs/img2.png", "imgs/img3.png", "imgs/img4.png", "imgs/img5.png", "imgs/img6.png", "imgs/img7.png", "imgs/img8.png", "imgs/img9.png", "imgs/img10.png", "imgs/img11.png", "imgs/img12.png"];
const img = document.querySelector("#img")
const listeLettreFausse = document.querySelector("#lettres-fausses")
const lettreJouer = document.querySelector("#lettres-jouees")



let result = 0
let lettresFausse = []
let lettreVraie = []
allName = []


function verifierLettre(lettre) {
    const checkwinClass = document.querySelectorAll(".checkwin")
    if (deja(lettre)) {
        alert("cette lettre a déjà été mise")
    } else {
        const lettres = document.querySelectorAll("." + lettre)
        for (let i = 0; i < lettres.length; i++) {
            lettres[i].textContent = lettre
            result++
        }
        if (lettres.length === 0) {
            vie()
            lettreFausse(lettre)
        } else {
            lettreJouer.textContent += " " + lettre
            lettreVraie.push(lettre)
        }
    }
    if (result === checkwinClass.length) {
        alert("gg")
    }
}


function deja(lettre) {
    for (let i = 0; i < lettresFausse.length; i++) {
        if (lettre === lettresFausse[i]) {
            return true
        }
    }
    for (let i = 0; i < lettreVraie.length; i++) {
        if (lettre === lettreVraie[i]) {
            return true
        }
    }
}

function lettreFausse(lettre) {
    listeLettreFausse.textContent += " " + lettre
    lettresFausse.push(lettre)
}


function vie(option) {
    if (option) {
        life = 11
        imgAvance = 11
    } else {
        life--
        imgAvance--
    }
    img.src = imgs[imgAvance]
    vies.textContent = "Vies restantes : " + life
    if (life < 1) {
        alert("lose le mot était " + allName[allName.length - 1])
    }
}


function start() {
    const name = (prenoms[Math.floor(Math.random() * prenoms.length)])
    allName.push(name)
    vie(true)
    console.log(name)
    for (let i = 0; i < name.length; i++) {
        const lettre = document.createElement("span")
        lettre.classList.add("" + name[i])
        lettre.classList.add("checkwin")
        lettre.textContent = "_ "
        mot.appendChild(lettre)
    }
}


function restart() {
    const checkwinClass = document.querySelectorAll(".checkwin")
    lettresFausse = []
    lettreVraie = []
    listeLettreFausse.textContent = "Lettres Fausses : "
    lettreJouer.textContent = "Lettres Jouees : "
    for (let i = 0; i < checkwinClass.length; i++) {
        checkwinClass[i].remove()
    }
    start()
}

start()


