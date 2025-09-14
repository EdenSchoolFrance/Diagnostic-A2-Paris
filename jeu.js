const $img = document.querySelector("#img")
const $mot = document.querySelector("#mot")
const $vies = document.querySelector("#vies")
const $lettresFausses = document.querySelector("#lettres-fausses")
const $lettresJouees = document.querySelector("#lettres-jouees")
const $restart = document.querySelector("#restart")

function verifierLettre(lettre) {
    console.log(lettre)
    $mot.textContent = lettre
    $lettresFausses.textContent = lettre
    $lettresJouees.textContent = lettre
        $img.src = "imgs/img1.png"
}

$restart.addEventListener("click", (event) => {
  location.reload()
});
