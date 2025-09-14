const $word = document.getElementById("mot")

let randomName = prenoms[Math.floor(Math.random() *prenoms.length)]
randomName = randomName
        .normalize("NFD")
        .toUpperCase()
        .replace(/[\u0300-\u036f]/g, "");
let playedLetters = []
let wrongLetters = []

console.log(randomName)
console.log(randomName.length)


$word.textContent = randomName
    .split("")
    .map(l => (playedLetters.includes(l) ? l : "_"))
    .join(" ");

function verifierLettre(lettre) {
    
    console.log(lettre)
    if(!playedLetters.includes(lettre)){
        playedLetters.push(lettre)
        if(randomName.includes(playedLetters)){
            alert("bababoii")
        } else {
            wrongLetters.push(lettre)
            console.log(wrongLetters)
        }
    } else {
        alert("nuh uh")
    }
}

console.log($word)