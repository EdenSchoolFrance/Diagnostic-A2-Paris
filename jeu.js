
// Ici, je vais faire les configurations, comme les mots secrets etc etc
let motSecret
let affichageMot = []
let vies
let lettresJouees = []
let lettresFausses = []

function init() {

    // Ici je vais prendre la variable prenom qui viens de prenoms.js pour importer tout les prenoms

    const index = Math.floor(Math.random() * prenoms.length)
    motSecret = prenoms[index].toUpperCase()

    // Ici je fait un tableau vide qui prend mon mot secret et met des _ ( qui seront plus tard remplis par la lettre que j'ai choisis si elle est valide. )
    affichageMot = []
    for (let i = 0; i < motSecret.length; i++) {
        affichageMot[i] = '_'
    }

    lettresJouees = []
    lettresFausses = []
    vies = 11

    const boutons = document.getElementsByClassName('lettre')
    for (let i = 0; i < boutons.length; i++) {
        boutons[i].disabled = false
    }
}

function verifierLettre(lettre) {
    lettre = lettre.toUpperCase()

    for (let i = 0; i < lettresJouees.length; i++) {
        if (lettresJouees[i] === lettre) return
    }

    lettresJouees.push(lettre)
    document.getElementById('lettres-jouees').textContent = 'Lettres Jouees : ' + lettresJouees.join(' ')

    const boutons = document.getElementsByClassName('lettre')
    for (let i = 0; i < boutons.length; i++) {
        if (boutons[i].textContent === lettre) boutons[i].disabled = true
    }

    let trouvé = false
    for (let i = 0; i < motSecret.length; i++) {
        if (motSecret[i] === lettre) {
            affichageMot[i] = lettre
            trouvé = true
        }
    }

    document.getElementById('mot').textContent = affichageMot.join(' ')

    if (!trouvé) {
        lettresFausses.push(lettre)
        document.getElementById('lettres-fausses').textContent = 'lettres fausses : ' + lettresFausses.join(' ')

        // Je retire les vies quand c'est faux
        vies--
        document.getElementById('vies').textContent = 'vies restantes : ' + vies
        document.getElementById('img').src = 'imgs/img' + vies + '.png'

        if (vies === 0) {
            alert('perdu le mot etait : ' + motSecret)
            document.getElementById('mot').textContent = motSecret
            for (let i = 0; i < boutons.length; i++) boutons[i].disabled = true
        }
    } else {
        let gagné = true
        for (let i = 0; i < affichageMot.length; i++) {
            if (affichageMot[i] === '_') {
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




// Je fait les fonction qui ont besoin de la fonction init ( comme pour restart la partie ou initialiser le jeu au lancement de la page)

function restart() {
    init()
}

window.onload = function() {
    init()
}