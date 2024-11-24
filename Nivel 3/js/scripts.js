let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timeLeft;
let timerInterval;
let emojis;
let totalTime;
let trophyThresholds;
const grid = document.getElementById('grid');
const winModal = document.getElementById('win-modal');
const loseModal = document.getElementById('lose-modal');
const instructionsModal = document.getElementById('instructions-modal');

fetch('./json/config.json')
    .then(response => response.json())
    .then(data => {
        // Extraer configuración
        emojis = data.configuracionJuego.imagenes; // Cambiar a "imagenes"
        totalTime = data.configuracionJuego.tiempoTotal;
        trophyThresholds = data.configuracionJuego.umbralesTrofeos;

        showInstructions(); // Iniciar el juego después de cargar la configuración
    })
    .catch(error => {
        console.error("Error al cargar la configuración:", error);
    }); 

function showInstructions() {
    instructionsModal.style.display = 'flex';
}

function closeInstructions() {
    instructionsModal.style.display = 'none';
    initializeGame(); // Iniciar el juego después de cerrar las instrucciones
}

function initializeGame() {
    matchedPairs = 0;
    cards = [];
    flippedCards = [];
    timeLeft = totalTime;
    document.getElementById('time').textContent = timeLeft;
    
    // Crear el array de cartas duplicado y mezclado
    const cardValues = [...emojis, ...emojis];
    for (let i = cardValues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]];
    }

    // Limpiar grid
    grid.innerHTML = '';

    // Crear las cartas
    cardValues.forEach((value, index) => {
        const card = createCard(value, index);
        grid.appendChild(card);
        cards.push(card);
    });

    startTimer();
}function createCard(value, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-face front">
            <img src="${value}" alt="Imagen de carta">
        </div>
        <div class="card-face back">
            <span>SECRET SET</span>
            <!-- Esquinas naranjas -->
            <div class="corner top-left"></div>
            <div class="corner top-right"></div>
            <div class="corner bottom-left"></div>
            <div class="corner bottom-right"></div>
            <!-- Círculos decorativos -->
            <div class="circle top-left"></div>
            <div class="circle top-right"></div>
            <div class="circle bottom-left"></div>
            <div class="circle bottom-right"></div>
        </div>
    `;
    card.dataset.value = value; // Almacenar el valor de la imagen para verificar coincidencias
    card.dataset.index = index;
    card.addEventListener('click', () => flipCard(card));
    return card;
}


function flipCard(card) {
    if (flippedCards.length === 2 || flippedCards.includes(card) || card.classList.contains('matched')) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.value === card2.dataset.value;

    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        
        if (matchedPairs === emojis.length) {
            endGame(true);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

function endGame(won) {
    clearInterval(timerInterval);
    
    if (won) {
        // Calcular trofeos basado en el tiempo restante
        const timePercent = (timeLeft / totalTime) * 100;
        const trophies = timePercent > trophyThresholds.tresTrofeos ? 3 : 
                        timePercent > trophyThresholds.dosTrofeos ? 2 : 1;
        
        // Mostrar trofeos ganados
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`trophy${i}`).classList.toggle('earned', i <= trophies);
        }
        
        winModal.style.display = 'flex';
    } else {
        loseModal.style.display = 'flex';
    }
}

function nextLevel() {
    winModal.style.display = 'none';
    window.location.href = '../Nivel 4/index.html';
}

function restartGame() {
    winModal.style.display = 'none';
    loseModal.style.display = 'none';
    showInstructions(); // Mostrar instrucciones al reiniciar
}

function goToMenu() {
    winModal.style.display = 'none';
    loseModal.style.display = 'none';
    window.location.href = '../mapas/mapa3.html';
}

function restartGame() {
    winModal.style.display = 'none';
    loseModal.style.display = 'none';
    showInstructions(); // Mostrar instrucciones al reiniciar el nivel actual
    initializeGame();   // Reinicia el nivel desde el principio
}

function goToMenu() {
    winModal.style.display = 'none';
    loseModal.style.display = 'none';
    window.location.href = '../mapas/mapa4.html'; // Redirige al menú principal del mapa 3
}

