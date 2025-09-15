
// Here, I will make the configurations, such as secret words, etc.
let secretWord
let viewWord = []
let lifes
let playedLetter = []
let falseLetter = []

function init() {

    // Here I will take the variable firstname from firstnames.js to import all first names.

    const index = Math.floor(Math.random() * prenoms.length)
    secretWord = prenoms[index].toUpperCase()

    // Here, i do a blank table who contain the word ans ramplace "lettre" with _
    viewWord = []
    for (let i = 0; i < secretWord.length; i++) {
        viewWord[i] = '_'
    }

    playedLetter = []
    falseLetter = []
    lifes = 11

    const boutons = document.getElementsByClassName('lettre')
    for (let i = 0; i < boutons.length; i++) {
        boutons[i].disabled = false
    }
}

function verifyLettres(lettre) {
    lettre = lettre.toUpperCase()

    for (let i = 0; i < playedLetter.length; i++) {
        if (playedLetter[i] === lettre) return
    }

    playedLetter.push(lettre)
    document.getElementById('lettres-jouees').textContent = 'Played Letters : ' + playedLetter.join(' ')

    const boutons = document.getElementsByClassName('lettre')
    for (let i = 0; i < boutons.length; i++) {
        if (boutons[i].textContent === lettre) boutons[i].disabled = true
    }

    let trouvé = false
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === lettre) {
            viewWord[i] = lettre
            trouvé = true
        }
    }

    document.getElementById('mot').textContent = viewWord.join(' ')

    if (!trouvé) {
        falseLetter.push(lettre)
        document.getElementById('lettres-fausses').textContent = 'False Letters : ' + falseLetter.join(' ')

        // I delete a life when the choice is false
        lifes--
        document.getElementById('lifes').textContent = 'remaining lives : ' + lifes
        document.getElementById('img').src = 'imgs/img' + lifes + '.png'

        if (lifes === 0) {
            alert('looser, the word is : ' + secretWord)
            document.getElementById('mot').textContent = secretWord
            for (let i = 0; i < boutons.length; i++) boutons[i].disabled = true
        }
    } else {
        let gagné = true
        for (let i = 0; i < viewWord.length; i++) {
            if (viewWord[i] === '_') {
                gagné = false
                break
            }
        }
        if (gagné) {
            alert('vous avez gagnez')
            for (let i = 0; i < boutons.length; i++) boutons[i].disabled = true
        }
    }
}




// here, i do the init request function

function restart() {
    init()
}

window.onload = function() {
    init()
}