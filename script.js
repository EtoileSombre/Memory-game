// Emojis Stranger Things
const cards = [
    '👧', // Eleven
    '🐙', // Demogorgon
    '🚲', // Vélo
    '🧇', // Eggos
    '💡', // Lumières
    '📻', // Walkie-talkie
    '🎮', // D&D/Arcade
    '🔦'  // Lampe torche
];

const gameBoard = document.getElementById('game-board');
let selectedCards = [];
let startTime = null;
let timerInterval = null;
let gameStarted = false;
let score = 0;
let attempts = 0;

function createCard(cardEmoji) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardEmoji;

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    cardContent.textContent = cardEmoji;

    card.appendChild(cardContent);

    card.addEventListener('click', onCardClick);
    return card;

  }

function duplicateArray(arraySimple){
    let arrayDouble = [];
    arrayDouble.push(...arraySimple);
    arrayDouble.push(...arraySimple);
    return arrayDouble;
}

function shuffleArray(arrayToShuffle) {
    const shuffledArray = arrayToShuffle.sort(() => 0.5 - Math.random());
    
    return shuffledArray;
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = `⏱️ ${elapsedTime}s`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateScore() {
    document.getElementById('score').textContent = `Score : ${score}`;
}

function launchConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#bb0000', '#ffffff', '#00bb00', '#0000bb', '#ffff00']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#bb0000', '#ffffff', '#00bb00', '#0000bb', '#ffff00']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function onCardClick(e) {
    // Trouver la carte (.card) même si on clique sur l'image
    const card = e.target.classList.contains('card') ? e.target : e.target.closest('.card');
    
    // Si on ne trouve pas la carte, on sort
    if (!card) return;
    
    // Démarrer le chronomètre au premier clic
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }
    
    // Empêcher de cliquer sur une carte déjà retournée ou la même carte deux fois
    if (card.classList.contains("flipped") || selectedCards.length === 2) {
        return;
    }
    
    card.classList.add("flipped");

    selectedCards.push(card);
    if (selectedCards.length === 2) {
        attempts++;

        if(selectedCards[0].dataset.value == selectedCards[1].dataset.value){
            selectedCards[0].classList.add("matched");
            selectedCards[1].classList.add("matched");
            selectedCards[0].removeEventListener('click', onCardClick);
            selectedCards[1].removeEventListener('click', onCardClick);
            selectedCards = [];
            
            // Augmenter le score pour une paire trouvée
            score += 100;
            updateScore();

            const allCardsNotMatched = document.querySelectorAll('.card:not(.matched)');
            if (allCardsNotMatched.length === 0) {
                stopTimer();
                const finalTime = Math.floor((Date.now() - startTime) / 1000);
                launchConfetti();
            }
        }
        else {
            setTimeout(() => {
                selectedCards[0].classList.remove("flipped");
                selectedCards[1].classList.remove("flipped");
                selectedCards = [];
            }, 1000);
        }
    }
}

const arrayShuffled = shuffleArray(cards);
let allCards = duplicateArray(arrayShuffled);

//Mélanger le tableau

allCards.forEach(card => {
    const cardHtml = createCard(card);
    gameBoard.appendChild(cardHtml);
})
