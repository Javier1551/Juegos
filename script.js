document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById('menu');
    const gameContainer = document.getElementById('game-container');
    const startButton = document.getElementById('start-game');
    const backButton = document.getElementById('back-to-menu');
    const startSound = document.getElementById('start-sound');
    const winSound = document.getElementById('win-sound');
    const menuSound = document.getElementById('menu-sound');
    
    const gameBoard = document.getElementById('game-board');
    const excellentMessage = document.getElementById('excellent-message');
    
    const matchSound = new Audio('sounds/match.mp3');
    const errorSound = new Audio('sounds/error.mp3');

    const superheroes = [
        {name: 'Bartolome', image: 'image/Bartolome.png'},
        {name: 'Elias', image: 'image/Elias.png'},
        {name: 'Jesus Woman', image: 'image/Jesus.png'},
        {name: 'Malaquias', image: 'image/Malaquias.png'},
        {name: 'Pablo', image: 'image/Pablo.png'},
        {name: 'Pedro', image: 'image/Pedro.png'},
        {name: 'Rey David', image: 'image/Rey David.png'},
        {name: 'Salomon', image: 'image/Salomon.png'},
        {name: 'Saulo', image: 'image/Saulo.png'},
        {name: 'Tomas', image: 'image/Tomas.png'}
    ];
    
    const cards = [...superheroes, ...superheroes];
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    function startGame() {
        menu.style.display = 'none';
        gameContainer.style.display = 'block';
        startSound.play();
        shuffleArray(cards);
        gameBoard.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;

        cards.forEach((superhero, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">?</div>
                    <div class="card-back">
                        <img src="${superhero.image}" alt="${superhero.name}" class="card-image">
                    </div>
                </div>
            `;
            card.addEventListener('click', () => flipCard(card, index));
            gameBoard.appendChild(card);
        });
    }
    
    function flipCard(card, index) {
        if (flippedCards.length < 2 && !flippedCards.includes(index) && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            flippedCards.push({index, card});
    
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }
    
    function showExcellentMessage() {
        excellentMessage.style.display = 'block';
        setTimeout(() => {
            excellentMessage.style.display = 'none';
        }, 1500);
    }
    
    function checkMatch() {
        const [card1, card2] = flippedCards;
    
        if (cards[card1.index].name === cards[card2.index].name) {
            card1.card.style.visibility = 'hidden';
            card2.card.style.visibility = 'hidden';
            matchedPairs++;
    
            showExcellentMessage();
    
            if (matchedPairs === superheroes.length) {
                winSound.play();
                setTimeout(() => {
                    gameContainer.style.display = 'none';
                    menu.style.display = 'block';
                }, 2000);
            }
        } else {
            card1.card.classList.remove('flipped');
            card2.card.classList.remove('flipped');
        }
    
        flippedCards = [];
    }
    
    startButton.addEventListener('click', startGame);
    
    backButton.addEventListener('click', () => {
        gameContainer.style.display = 'none';
        menu.style.display = 'block';
        menuSound.play();
    });

    // Play menu sound when the menu is loaded
    menuSound.play();
});
