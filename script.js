const startButton = document.getElementById('start-game');
const backButton = document.getElementById('back-to-menu');
const gameBoard = document.getElementById('game-board');
const excellentMessage = document.getElementById('excellent-message');
const menu = document.getElementById('menu');
let flippedCards = [];
let matchedPairs = 0;

// Audios
const startAudio = new Audio('sounds/start.mp3');
const matchAudio = new Audio('sounds/match.mp3');
const errorAudio = new Audio('sounds/error.mp3');
const winAudio = new Audio('sounds/win.mp3');
const backgroundMusic = new Audio('sounds/background.mp3');

backgroundMusic.loop = true;

const superheroes = [
    {name: 'Bartolome', image: 'images/Bartolome.png'},
    {name: 'Elias', image: 'images/Elias.png'},
    {name: 'Jesus Woman', image: 'images/Jesus.png'},
    {name: 'Malaquias', image: 'images/Malaquias.png'},
    {name: 'Pablo', image: 'images/Pablo.png'},
    {name: 'Pedro', image: 'images/Pedro.png'},
    {name: 'Rey David', image: 'images/Rey David.png'},
    {name: 'Salomon', image: 'images/Salomon.png'},
    {name: 'Saulo', image: 'images/Saulo.png'},
    {name: 'Tomas', image: 'images/Tomas.png'}
];

const cards = [...superheroes, ...superheroes];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    menu.style.display = 'none';           // Oculta el menú
    gameBoard.style.display = 'grid';      // Muestra el tablero de juego
    startAudio.play();                     // Reproduce el sonido de inicio
    backgroundMusic.play();                // Reproduce la música de fondo
    setupBoard();                          // Configura el tablero
}

function setupBoard() {
    shuffleArray(cards);
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    flippedCards = [];

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
        flippedCards.push({ index, card });

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function showMatchMessage() {
    excellentMessage.textContent = '¡Coincidencia!';
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

        matchAudio.play(); // Reproduce el sonido de coincidencia
        showMatchMessage();

        if (matchedPairs === superheroes.length) {
            winAudio.play(); // Reproduce el sonido de victoria
            setTimeout(() => {
                const victoryMessage = document.createElement('div');
                victoryMessage.innerHTML = `
                    <h2>¡Felicidades!</h2>
                    <p>Has completado el juego.</p>
                    <button onclick="returnToMenu()">Volver al menú principal</button>
                `;
                victoryMessage.style.position = 'fixed';
                victoryMessage.style.top = '50%';
                victoryMessage.style.left = '50%';
                victoryMessage.style.transform = 'translate(-50%, -50%)';
                victoryMessage.style.background = '#ffd700';
                victoryMessage.style.color = '#1a1a2e';
                victoryMessage.style.padding = '20px';
                victoryMessage.style.borderRadius = '10px';
                victoryMessage.style.textAlign = 'center';
                document.body.appendChild(victoryMessage);
            }, 500);
        }
    } else {
        errorAudio.play(); // Reproduce el sonido de error
        card1.card.classList.remove('flipped');
        card2.card.classList.remove('flipped');
    }

    flippedCards = [];
}

function returnToMenu() {
    gameBoard.style.display = 'none'; // Oculta el tablero
    menu.style.display = 'flex';      // Muestra el menú
    gameBoard.innerHTML = '';         // Limpia el tablero de juego
    resetGame();
    backgroundMusic.pause();          // Pausa la música de fondo
    
    // Elimina el mensaje de victoria si existe
    const victoryMessage = document.querySelector('.victory-message');
    if (victoryMessage) {
        victoryMessage.remove();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (cards[card1.index].name === cards[card2.index].name) {
        card1.card.style.visibility = 'hidden';
        card2.card.style.visibility = 'hidden';
        matchedPairs++;

        matchAudio.play(); // Reproduce el sonido de coincidencia
        showMatchMessage();

        if (matchedPairs === superheroes.length) {
            winAudio.play(); // Reproduce el sonido de victoria
            setTimeout(() => {
                const victoryMessage = document.createElement('div');
                victoryMessage.className = 'victory-message'; // Añadir clase para fácil referencia
                victoryMessage.innerHTML = `
                    <h2>¡Felicidades!</h2>
                    <p>Has completado el juego.</p>
                    <button onclick="returnToMenu()">Volver al menú principal</button>
                `;
                victoryMessage.style.position = 'fixed';
                victoryMessage.style.top = '50%';
                victoryMessage.style.left = '50%';
                victoryMessage.style.transform = 'translate(-50%, -50%)';
                victoryMessage.style.background = '#ffd700';
                victoryMessage.style.color = '#1a1a2e';
                victoryMessage.style.padding = '20px';
                victoryMessage.style.borderRadius = '10px';
                victoryMessage.style.textAlign = 'center';
                document.body.appendChild(victoryMessage);
            }, 500);
        }
    } else {
        errorAudio.play(); // Reproduce el sonido de error
        card1.card.classList.remove('flipped');
        card2.card.classList.remove('flipped');
    }

    flippedCards = [];
}


function resetGame() {
    flippedCards = [];
    matchedPairs = 0;
}

startButton.addEventListener('click', startGame);
backButton.addEventListener('click', returnToMenu);
