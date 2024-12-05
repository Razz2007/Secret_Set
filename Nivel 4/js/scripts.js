// Variables globales
let currentLevel = 0;
let selectedElements = new Set();
let correctAnswers = 0;
let gameData = null;

// Función para cargar datos del juego
async function loadGameData() {
    try {
        const response = await fetch('./json/config.json');
        const data = await response.json();

        const currentLang = localStorage.getItem('language') || 'es'; // Idioma predeterminado: español
        gameData = data[currentLang];

        initGame(); // Inicializar el juego
        showInstructions(); // Mostrar las instrucciones al inicio
    } catch (error) {
        console.error('Error cargando los datos del juego:', error);
    }
}

// Función para inicializar el juego
function initGame() {
    document.getElementById('checkAnswer').addEventListener('click', checkAnswer);
    document.getElementById('langSelect').addEventListener('change', changeLanguage);
    initLevel(); // Iniciar el primer nivel
}

// Función para cambiar el idioma
function changeLanguage(e) {
    const newLang = e.target.value;
    localStorage.setItem('language', newLang); // Guardar el idioma seleccionado
    loadGameData(); // Recargar datos del juego
}

// Función para inicializar un nivel
function initLevel() {
    if (!gameData || !gameData.levels || !gameData.levels[currentLevel]) {
        console.error('Datos del nivel no disponibles');
        return;
    }

    const level = gameData.levels[currentLevel];

    // Actualizar interfaz
    document.getElementById('level').textContent = currentLevel + 1;
    document.getElementById('question').textContent = level.question;
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('correctCount').textContent = correctAnswers;

    // Inicializar conjuntos
    document.getElementById('setA').innerHTML = level.setA
        .map(num => `<span class="element" onclick="toggleElement(${num})">${num}</span>`)
        .join('');
    document.getElementById('setB').innerHTML = level.setB
        .map(num => `<span class="element" onclick="toggleElement(${num})">${num}</span>`)
        .join('');

    // Limpiar respuesta del usuario
    document.getElementById('userAnswer').innerHTML = '';
    selectedElements.clear();

    hideAllModals(); // Ocultar cualquier modal activo
}

// Función para alternar la selección de un elemento
function toggleElement(num) {
    if (selectedElements.has(num)) {
        selectedElements.delete(num);
    } else {
        selectedElements.add(num);
    }
    updateUserAnswer();
}

// Función para actualizar la visualización de la respuesta
function updateUserAnswer() {
    const elements = Array.from(selectedElements).sort((a, b) => a - b);
    document.getElementById('userAnswer').innerHTML = elements
        .map(num => `<span class="element selected">${num}</span>`)
        .join('');
}

// Función para verificar la respuesta
function checkAnswer() {
    const level = gameData.levels[currentLevel];
    const userAnswer = Array.from(selectedElements).sort((a, b) => a - b);
    const correct = JSON.stringify(userAnswer) === JSON.stringify(level.correctAnswer.sort((a, b) => a - b));

    if (correct) {
        correctAnswers++;
        document.getElementById('correctCount').textContent = correctAnswers;
    }

    const feedback = document.getElementById('feedback');
    const currentLang = localStorage.getItem('language') || 'es';

    feedback.textContent = correct
        ? (currentLang === 'es' ? '¡Correcto! ' : 'Correct! ') + level.explanation
        : (currentLang === 'es' ? 'Incorrecto. ' : 'Incorrect. ') + level.explanation;

    feedback.className = `feedback ${correct ? 'correct' : 'incorrect'}`;

    setTimeout(() => {
        if (currentLevel < gameData.levels.length - 1) {
            currentLevel++;
            initLevel();
        } else {
            // Mostrar modal de éxito o reintento según el resultado
            correctAnswers > 0 ? showSuccessModal() : showRetryModal();
        }
    }, 2000);
}

// Función para mostrar el modal de éxito
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const messageElement = document.getElementById('successMessage');
    const currentLang = localStorage.getItem('language') || 'es';

    // Mostrar mensaje según la cantidad de trofeos obtenidos
    let message = '';
    switch (correctAnswers) {
        case 3:
            message = currentLang === 'es' 
                ? '¡Perfecto! Has conseguido todos los trofeos.' 
                : 'Perfect! You have earned all the trophies.';
            break;
        case 2:
            message = currentLang === 'es' 
                ? '¡Muy bien! Has conseguido dos trofeos.' 
                : 'Great! You have earned two trophies.';
            break;
        case 1:
            message = currentLang === 'es' 
                ? '¡Bien! Has conseguido un trofeo.' 
                : 'Good! You have earned one trophy.';
            break;
        default:
            message = currentLang === 'es' 
                ? '¡Inténtalo de nuevo!' 
                : 'Try again!';
            break;
    }

    messageElement.textContent = message;
    modal.style.display = 'flex';
}

// Función para mostrar el modal de reintento
function showRetryModal() {
    document.getElementById('retryModal').style.display = 'flex';
}

// Función para ocultar todos los modales
function hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Reiniciar el juego
function restartGame() {
    currentLevel = 0;
    correctAnswers = 0;
    selectedElements.clear();
    hideAllModals();
    showInstructions();
}

// Evento para cargar los datos al iniciar
document.addEventListener('DOMContentLoaded', loadGameData);
