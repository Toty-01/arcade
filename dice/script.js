// Initialisation des variables
let scores, currentScores, activePlayer, diceScore, inGame, playerNumber;

let player1 = "Player 1";
let player2 = "Player 2";

// RAZ
function newGame() {
  scores = [0, 0];
  currentScores = [0, 0];
  activePlayer = 0;
  diceScore = 0;
  inGame = true;
  playerNumber = [1, 2];

  document.getElementById('img-result').src = './img/dice1.png';
  document.getElementById('score-player-1').textContent = 0;
  document.getElementById('score-player-2').textContent = 0;
  document.getElementById('dice-result-1').textContent = 0;
  document.getElementById('dice-result-2').textContent = 0;
  document.getElementById('select-player-1').style.color = 'white';
  document.getElementById('select-player-1').style.border= 'solid blue 4px';
  document.getElementById('select-player-2').style.color = 'black';
  document.getElementById('select-player-2').style.border= 'solid #fd4141 4px';
}

// fonction 'Nouvelle partie'
document.getElementById('new-game').addEventListener('click', newGame);

// fonction de regles
document.getElementById('rules').addEventListener('click', function() {
  alert("Lancer le dé ou sauvegarder votre score cumulé. Si vous faites un 1, le score sera remis à zéro et la main passera à l'adversaire. Vous devez atteindre le score de 50 ou plus en premier. Bonne chance !!");
})

// RAZ des scores
function resetScores() {
  diceScore = 0;
  currentScores = [0, 0];
  document.getElementById('dice-result-1').textContent = 0
  document.getElementById('dice-result-2').textContent = 0
}

// Fonction pour changer de joueur
function nextPlayer() {
  if (activePlayer === 0){
      activePlayer = 1
      resetScores()
      document.getElementById('select-player-1').style.color = 'black';
      document.getElementById('select-player-1').style.border= 'solid #fd4141 4px';
      document.getElementById('select-player-2').style.color= 'white';
      document.getElementById('select-player-2').style.border= 'solid blue 4px';
  } else {
      activePlayer = 0
      resetScores()
      document.getElementById('select-player-2').style.color = 'black';
      document.getElementById('select-player-2').style.border= 'solid #fd4141 4px';
      document.getElementById('select-player-1').style.color= 'white';
      document.getElementById('select-player-1').style.border= 'solid blue 4px';
  }
  return alert('Next player !')
}

// Evenement sur 'ROLL DICE'
document.getElementById('roll-dice').addEventListener('click', function() {
    if(inGame){
        diceScore = Math.trunc(Math.random() * 6 + 1)
        currentScores[activePlayer] = parseInt(document.getElementById('dice-result-' + playerNumber[activePlayer]).textContent, 10)
        if (diceScore != 1){
            document.getElementById('img-result').src = './img/dice' + diceScore + '.png'
            currentScores[activePlayer] += diceScore
            document.getElementById('dice-result-' + playerNumber[activePlayer]).textContent = currentScores[activePlayer]
        } else {
            document.getElementById('img-result').src = './img/dice' + diceScore + '.png'
            document.getElementById('dice-result-' + playerNumber[activePlayer]).textContent = currentScores[activePlayer]
            nextPlayer()
        }
    }
})

// Evenement sur 'add-to-score'
document.getElementById('add-to-score').addEventListener('click', function(){
    if(inGame && currentScores[activePlayer] != 0){
        scores[activePlayer] += currentScores[activePlayer]
        document.getElementById('score-player-' + playerNumber[activePlayer]).textContent = scores[activePlayer]
        checkIfWin()
    }
})

// Fonction de changement de nom
function editNames() {
    player1 = prompt("Change Player1 name");
    if (player1.length == 0) {
    return alert("saisir au moins un caractère");
    } else if (player1.length > 4) {
    return alert("saisir moins de 4 caractères");
    }
    document.querySelector("h2.Player1").innerHTML = player1;
    player2 = prompt("Change player2 name");
    if (player2.length == 0) {
    return alert("saisir au moins un caractère");
    } else if (player2.length > 4) {
    return alert("saisir moins de 4 caractères");
    }
    document.querySelector("h2.Player2").innerHTML = player2;
}

// verifier le joueur gagnant et  /  ou changer de joueur si c est pas le cas
function checkIfWin() {

  if (scores[activePlayer] >= 50) {
      alert('Victoire du joueur ' + playerNumber[activePlayer]);
      newGame();
      return true;
  } else {
      nextPlayer();
  }
}
