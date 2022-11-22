let resetBtn = document.getElementById("reset");
let scoreJoueur = document.getElementById("score-joueur");
let scoreOrdinateur = document.getElementById("score-ordinateur");
let btnJoueur = [...document.getElementsByClassName("btn-joueur")];
let opierreBtn = document.getElementById("opierre");
let ofeuilleBtn = document.getElementById("ofeuille");
let ociseauxBtn = document.getElementById("ociseaux");
let message = document.getElementById("message");
let nextBtn = document.getElementById("next");

const jouerManche = (e) => {
    let choix = e.target.closest(".btn-joueur");

    btnJoueur.forEach((btn) => {
        btn.classList.add("desactivated");
        btn.removeEventListener("click", jouerManche);
    });

    choix.classList.remove("desactivated");
    choix.classList.add("active");

    let choixJoueur = choix.id;

    let choixOrdi = faireChoixOrdinateur();

    verifierGagnant(choixJoueur, choixOrdi);

    nextBtn.style.visibility = "visible";
    checkWin();
};

const faireChoixOrdinateur = () => {
    // 0 = pierre
    // 1 = feuille
    // 2 = ciseaux

    let nbAleatoire = Math.floor(Math.random() * 3);

    switch (nbAleatoire) {
        case 0:
            opierreBtn.classList.add("active");
            return PIERRE;
        case 1:
            ofeuilleBtn.classList.add("active");
            return FEUILLE;
        default:
            ociseauxBtn.classList.add("active");
            return CISEAUX;
    }
};

const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";

const verifierGagnant = (choixJoueur, choixOrdi) => {
    if (choixJoueur == choixOrdi) {
        message.textContent = "Egalité !";
        return;
    }

    if (choixJoueur == PIERRE) {
        if (choixOrdi == FEUILLE) {
            return victoireOrdinateur();
        } else if (choixOrdi == CISEAUX) {
            return victoireJoueur();
        }
    }

    if (choixJoueur == FEUILLE) {
        if (choixOrdi == CISEAUX) {
            return victoireOrdinateur();
        } else if (choixOrdi == PIERRE) {
            return victoireJoueur();
        }
    }

    if (choixJoueur == CISEAUX) {
        if (choixOrdi == PIERRE) {
            return victoireOrdinateur();
        } else if (choixOrdi == FEUILLE) {
            return victoireJoueur();
        }
    }
};

const victoireOrdinateur = () => {
    message.textContent = "L'ordinateur a gagné..";
    scoreOrdinateur.textContent++;
};

const victoireJoueur = () => {
    message.textContent = "Vous avez gagné !";
    scoreJoueur.textContent++;
};

const preparerNouvelleManche = () => {
    btnJoueur.forEach((btn) => {
        btn.classList.remove("desactivated");
        btn.classList.remove("active");
        btn.addEventListener("click", jouerManche);
    });

    nextBtn.style.visibility = "hidden";

    opierreBtn.classList.remove("active");
    ofeuilleBtn.classList.remove("active");
    ociseauxBtn.classList.remove("active");

    message.textContent = "A vous de jouer !";
};

resetBtn.addEventListener("click", () => {
    scoreJoueur.textContent = 0;
    scoreOrdinateur.textContent = 0;

    preparerNouvelleManche();
});

nextBtn.addEventListener("click", preparerNouvelleManche);

btnJoueur.forEach((btn) => btn.addEventListener("click", jouerManche));

function editNames() {
    player1 = prompt("changer nom");
    if (player1.length > 4) {
        return alert("saisir moins de 4 caractères");
    } else if (player1.length == 0) {
        return alert("saisir au moins un caractère");
    } else {
    document.querySelector("h4.Player1").innerHTML = player1;
}};

function checkWin() {
    if (scoreJoueur.textContent == 5) {
        alert("Vous avez gagné BRAVO");
        scoreJoueur.textContent = 0;
        scoreOrdinateur.textContent = 0;
        preparerNouvelleManche();
    } else if (scoreOrdinateur.textContent == 5) {
        alert("l'ordinateur a gagné");
        scoreJoueur.textContent = 0;
        scoreOrdinateur.textContent = 0;
        preparerNouvelleManche();
}};