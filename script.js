// Images Stranger Things
const CARDS = [
    'images/eleven.jpg',      // Eleven
    'images/demogorgon.webp', // Demogorgon
    'images/bike.jpg',        // Vélo
    'images/gauffre.jpg',     // Gaufres Eggo
    'images/light.jpg',       // Lumières
    'images/mike.jpg',        // Mike (Walkie-talkie)
    'images/arcade.jpg',      // Arcade
    'images/mix.jpg'          // Mix/Flashlight
];

// Constantes de jeu
const SCORE_MATCH = 100;
const SCORE_MISS = -10;
const FLIP_DELAY = 1000;
const CONFETTI_DURATION = 3000;

// Éléments DOM
const gameBoard = document.getElementById('game-board');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const resetButton = document.getElementById('reset-btn');

// État du jeu
let selectedCards = [];
let startTime = null;
let timerInterval = null;
let gameStarted = false;
let score = 0;

/**
 * Crée un élément carte avec l'image donnée
 * @param {string} cardImage - Le chemin de l'image à afficher sur la carte
 * @returns {HTMLElement} L'élément carte créé
 */
function createCard(cardImage) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardImage;

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = cardImage;
    cardContent.alt = 'Stranger Things card';

    card.appendChild(cardContent);
    card.addEventListener('click', onCardClick);
    
    return card;
}

/**
 * Mélange un tableau en utilisant l'algorithme Fisher-Yates
 * @param {Array} array - Le tableau à mélanger
 * @returns {Array} Le tableau mélangé
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Démarre le chronomètre
 */
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

/**
 * Met à jour l'affichage du temps écoulé
 */
function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerElement.textContent = `⏱️ ${elapsedTime}s`;
}

/**
 * Arrête le chronomètre
 */
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

/**
 * Met à jour l'affichage du score
 */
function updateScore() {
    scoreElement.textContent = `Score : ${score}`;
}

/**
 * Lance l'animation de confettis pour célébrer la victoire
 */
function launchConfetti() {
    const end = Date.now() + CONFETTI_DURATION;
    const colors = ['#ff0000', '#8b0000', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

/**
 * Vérifie si toutes les paires ont été trouvées
 * @returns {boolean} true si le jeu est terminé
 */
function checkGameComplete() {
    const unmatchedCards = document.querySelectorAll('.card:not(.matched)');
    return unmatchedCards.length === 0;
}

/**
 * Gère les paires de cartes correspondantes
 * @param {HTMLElement[]} cards - Les deux cartes à marquer comme correspondantes
 */
function handleMatch(cards) {
    cards.forEach(card => {
        card.classList.add('matched');
        card.removeEventListener('click', onCardClick);
    });
    
    score += SCORE_MATCH;
    updateScore();

    if (checkGameComplete()) {
        stopTimer();
        launchConfetti();
    }
}

/**
 * Gère les paires de cartes non correspondantes
 * @param {HTMLElement[]} cards - Les deux cartes à retourner
 */
function handleMismatch(cards) {
    score = Math.max(0, score + SCORE_MISS);
    updateScore();
    
    setTimeout(() => {
        cards.forEach(card => card.classList.remove('flipped'));
        selectedCards = [];
    }, FLIP_DELAY);
}

/**
 * Gère le clic sur une carte
 * @param {Event} e - L'événement de clic
 */
function onCardClick(e) {
    const card = e.target.closest('.card');
    if (!card) return;
    
    // Démarrer le chronomètre au premier clic
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }
    
    // Empêcher de cliquer sur une carte déjà retournée ou si deux cartes sont déjà sélectionnées
    if (card.classList.contains('flipped') || selectedCards.length === 2) {
        return;
    }
    
    card.classList.add('flipped');
    selectedCards.push(card);
    
    // Si deux cartes sont sélectionnées, vérifier la correspondance
    if (selectedCards.length === 2) {
        const [card1, card2] = selectedCards;
        
        if (card1.dataset.value === card2.dataset.value) {
            handleMatch(selectedCards);
            selectedCards = [];
        } else {
            handleMismatch(selectedCards);
        }
    }
}

/**
 * Initialise le plateau de jeu
 */
function initGame() {
    // Réinitialiser l'état du jeu
    gameBoard.innerHTML = '';
    selectedCards = [];
    startTime = null;
    gameStarted = false;
    score = 0;
    
    // Réinitialiser l'affichage
    updateScore();
    stopTimer();
    timerElement.textContent = '⏱️';
    
    // Créer et mélanger les cartes
    const doubledCards = [...CARDS, ...CARDS];
    const shuffledCards = shuffleArray(doubledCards);
    
    // Ajouter les cartes au plateau
    const fragment = document.createDocumentFragment();
    shuffledCards.forEach(cardValue => {
        fragment.appendChild(createCard(cardValue));
    });
    gameBoard.appendChild(fragment);
}

/**
 * Réinitialise le jeu
 */
function resetGame() {
    initGame();
}

// Initialiser le jeu au chargement
initGame();

// Ajouter l'événement au bouton reset
if (resetButton) {
    resetButton.addEventListener('click', resetGame);
} else {
    console.error('Bouton reset introuvable');
}
