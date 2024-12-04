// Variables globales
let currentLevel = 0;
let selectedElements = new Set();
let correctAnswers = 0;
let gameData = null;

// Función para mostrar las instrucciones
function showInstructions() {
    document.getElementById('instructionsModal').style.display = 'flex';
}

// Función para cerrar las instrucciones
function closeInstructions() {
    document.getElementById('instructionsModal').style.display = 'none';
    initLevel(); // Iniciar el primer nivel después de cerrar las instrucciones
}

// Función para cargar los datos del juego
async function loadGameData() {
    try {
        const response = await fetch('./json/config.json');
        gameData = await response.json();
        initGame(); // Inicializar el juego
        showInstructions(); // Mostrar las instrucciones al inicio
    } catch (error) {
        console.error('Error cargando los datos del juego:', error);
    }
}

// Función para inicializar el nivel
function initLevel() {
    if (!gameData || !gameData.levels || !gameData.levels[currentLevel]) {
        console.error('Datos del juego no disponibles');
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

    // Ocultar modales y resultados
    hideAllModals();
}

// Función para alternar la selección de elementos
function toggleElement(num) {
    if (selectedElements.has(num)) {
        selectedElements.delete(num);
    } else {
        selectedElements.add(num);
    }
    updateUserAnswer();
}

// Función para actualizar la visualización de la respuesta del usuario
function updateUserAnswer() {
    const elements = Array.from(selectedElements).sort((a, b) => a - b);
    document.getElementById('userAnswer').innerHTML = elements
        .map(num => `<span class="element selected">${num}</span>`)
        .join('');
}

// Función para mostrar el modal de éxito
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const trophiesElement = document.getElementById('modalTrophies');
    const messageElement = document.getElementById('successMessage');
    
    // Mostrar trofeos ganados
    let trophyDisplay = '';
    for (let i = 0; i < correctAnswers; i++) {
        trophyDisplay += '🏆';
    }
    trophiesElement.textContent = trophyDisplay;
    
    // Mensaje personalizado según cantidad de trofeos
    let message = '';
    switch (correctAnswers) {
        case 3:
            message = '¡Perfecto! Has conseguido todos los trofeos.';
            break;
        case 2:
            message = '¡Muy bien! Has conseguido dos trofeos.';
            break;
        case 1:
            message = '¡Bien! Has conseguido un trofeo.';
            break;
    }
    messageElement.textContent = message;
    
    modal.style.display = 'flex';
}

// Función para mostrar el modal de reintento
function showRetryModal() {
    const modal = document.getElementById('retryModal');
    modal.style.display = 'flex';
}

// Función para ocultar todos los modales
function hideAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Función principal para verificar respuesta
function checkAnswer() {
    const level = gameData.levels[currentLevel];
    const userAnswer = Array.from(selectedElements).sort((a, b) => a - b);
    const correct = JSON.stringify(userAnswer) === JSON.stringify(level.correctAnswer.sort((a, b) => a - b));
    
    if (correct) {
        correctAnswers++;
        document.getElementById('correctCount').textContent = correctAnswers;
    }
    
    const feedback = document.getElementById('feedback');
    feedback.textContent = correct ? 
        '¡Correcto! ' + level.explanation :
        'Incorrecto. ' + level.explanation;
    feedback.className = `feedback ${correct ? 'correct' : 'incorrect'}`;
    
    // Esperar y pasar al siguiente nivel
    setTimeout(() => {
        if (currentLevel < gameData.levels.length - 1) {
            currentLevel++;
            initLevel();
        } else {
            // Juego terminado
            if (correctAnswers > 0) {
                showSuccessModal();
            } else {
                showRetryModal();
            }
        }
    }, 2000);
}

// Función para reiniciar el juego
function restartGame() {
    currentLevel = 0;
    correctAnswers = 0;
    selectedElements.clear();
    hideAllModals();
    initLevel(); // Primero iniciamos el nivel
    showInstructions(); // Luego mostramos las instrucciones
}

// Función para ir al menú principal
function goToMenu() {
    window.location.href = '../mapas/mapa4.html';
}

// Inicialización del juego
function initGame() {
    // Agregar event listeners
    document.getElementById('checkAnswer').addEventListener('click', checkAnswer);
    // No llamamos a initLevel() aquí porque lo haremos después de cerrar las instrucciones
}

// Cargar el juego cuando el documento esté listo
document.addEventListener('DOMContentLoaded', loadGameData);
