const connections = [
    { left: 'Gato', right: 'Ratón' },
    { left: 'Libro', right: 'Biblioteca' },
    { left: 'Sol', right: 'Planeta' },
    { left: 'Zapato', right: 'Pie' },
    { left: 'Árbol', right: 'Bosque' },
    { left: 'Cuchillo', right: 'Cocina' },
    { left: 'Luna', right: 'Noche' },
    { left: 'Pluma', right: 'Escritura' },
    { left: 'Agua', right: 'Mar' },
    { left: 'Martillo', right: 'Clavo' }
];

let selectedCards = [];
let matchedPairs = [];
let timeLeft = 180;
let timerInterval;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    const allElements = [
        ...connections.map(c => c.left),
        ...connections.map(c => c.right)
    ];

    const shuffledElements = shuffleArray(allElements);

    shuffledElements.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = element;
        card.dataset.value = element;
        card.addEventListener('click', () => selectCard(card));
        gameBoard.appendChild(card);
    });

    startTimer();
}

function selectCard(card) {
    if (card.classList.contains('matched')) return;

    card.classList.toggle('selected');

    if (selectedCards.includes(card)) {
        selectedCards = selectedCards.filter(c => c !== card);
    } else {
        selectedCards.push(card);
    }

    if (selectedCards.length === 2) {
        checkConnection();
    }
}

function checkConnection() {
    const [card1, card2] = selectedCards;
    const value1 = card1.dataset.value;
    const value2 = card2.dataset.value;

    const connection = connections.find(
        c => (c.left === value1 && c.right === value2) || 
             (c.right === value1 && c.left === value2)
    );

    const messageElement = document.getElementById('message');

    if (connection) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs.push(connection);
        messageElement.textContent = '¡Conexión encontrada!';
        messageElement.style.color = 'green';
    } else {
        messageElement.textContent = 'Intenta de nuevo';
        messageElement.style.color = 'red';
    }

    selectedCards.forEach(card => card.classList.remove('selected'));
    selectedCards = [];

    if (matchedPairs.length === connections.length) {
        clearInterval(timerInterval);
        showTrophyModal();
    }
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `Tiempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showGameOverModal();
        }
    }, 1000);
}

function showTrophyModal() {
    const modal = document.getElementById('trophyModal');
    const trophies = document.querySelectorAll('.trophy');
    
    // Calcular trofeos basado en tiempo restante
    let activeTrophies = 0;
    if (timeLeft > 120) activeTrophies = 3;
    else if (timeLeft > 60) activeTrophies = 2;
    else if (timeLeft > 0) activeTrophies = 1;

    trophies.forEach((trophy, index) => {
        if (index < activeTrophies) {
            trophy.classList.add('active');
        } else {
            trophy.classList.remove('active');
        }
    });

    modal.style.display = 'flex';
}

function showGameOverModal() {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = 'flex';
}

function restartGame() {
    // Reiniciar todas las variables
    selectedCards = [];
    matchedPairs = [];
    timeLeft = 180;
    
    // Ocultar modales
    document.getElementById('trophyModal').style.display = 'none';
    document.getElementById('gameOverModal').style.display = 'none';
    
    // Limpiar mensajes y restaurar estado inicial
    document.getElementById('message').textContent = '';
    
    // Recrear el tablero
    createGameBoard();
}

function returnToMenu() {
    // Aquí podrías implementar la lógica para volver al menú principal
    alert('Función de menú principal aún no implementada');
}

// Iniciar juego
createGameBoard();