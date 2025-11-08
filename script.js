const cards = [
    'https://picsum.photos/id/237/100/100', 
    'https://picsum.photos/id/238/100/100',
    'https://picsum.photos/id/239/100/100',
    'https://picsum.photos/id/240/100/100',
    'https://picsum.photos/id/241/100/100',
    'https://picsum.photos/id/242/100/100',
    'https://picsum.photos/id/243/100/100',
    'https://picsum.photos/id/244/100/100'
  ];

const gameBoard = document.getElementById('game-board');
let selectedCards = [];

function createCard(CardUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = CardUrl;

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = CardUrl;

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

function onCardClick(e) {
    const card = e.target.parentElement;
    
    // Empêcher de cliquer sur une carte déjà retournée ou la même carte deux fois
    if (card.classList.contains("flipped") || selectedCards.length === 2) {
        return;
    }
    
    card.classList.add("flipped");

    selectedCards.push(card);
    if (selectedCards.length === 2) {

        if(selectedCards[0].dataset.value == selectedCards[1].dataset.value){
            selectedCards[0].classList.add("matched");
            selectedCards[1].classList.add("matched");
            selectedCards[0].removeEventListener('click', onCardClick);
            selectedCards[1].removeEventListener('click', onCardClick);
            selectedCards = [];

            const allCardsNotMatched = document.querySelectorAll('.card:not(.matched)');
            if (allCardsNotMatched.length === 0) {
                alert("Félicitations ! Vous avez trouvé toutes les paires !");
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
