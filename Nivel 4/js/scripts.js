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

function showCompletionModal() {
    const modal = document.getElementById("completionModal");
    modal.style.display = "block";

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const trophies = getTrophies(timeLeft);

    const currentLang = localStorage.getItem('language') || 'es';
    const translations = {
        es: {
            congratulations: "¡FELICIDADES!",
            completed: "Has completado el rompecabezas en",
            nextLevel: "SIGUIENTE NIVEL",
            mainMenu: "MENÚ PRINCIPAL",
            retry: "REINTENTAR"
        },
        en: {
            congratulations: "CONGRATULATIONS!",
            completed: "You completed the puzzle in",
            nextLevel: "NEXT LEVEL",
            mainMenu: "MAIN MENU",
            retry: "RETRY"
        }
    };

    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <h2>${translations[currentLang].congratulations}</h2>
        <div class="completion-time">
            ${translations[currentLang].completed}<br>
            ${formattedTime}
        </div>
        <div class="trophies-container">
            ${trophies}
        </div>
        <button class="text-boton" onclick="nextLevel()" data-i18n="nextLevel">${translations[currentLang].nextLevel}</button>
        <button class="text-boton" onclick="mainMenu()" data-i18n="mainMenu">${translations[currentLang].mainMenu}</button>
        <button class="text-boton" onclick="retry()" data-i18n="retry">${translations[currentLang].retry}</button>
    `;

// Delegar eventos de clic a todos los botones con clase text-boton
document.body.addEventListener("click", function(event) {
    if (event.target && event.target.matches(".text-boton")) {
        audio.play(); // Reproduce el sonido al hacer clic en un botón
    }
});

}

// Generar los trofeos según el tiempo restante
function getTrophies(timeLeft) {
    const { trophyLevels } = gameData.gameSettings;

    let trophyHTML = '';

    if (timeLeft >= trophyLevels.gold.minTime) {
        trophyHTML = `
            <div class="trophy trophy-gold">${trophyLevels.gold.emoji}</div>
            <div class="trophy trophy-gold">${trophyLevels.gold.emoji}</div>
            <div class="trophy trophy-gold">${trophyLevels.gold.emoji}</div>
        `;
    } else if (timeLeft >= trophyLevels.silver.minTime) {
        trophyHTML = `
            <div class="trophy trophy-silver">${trophyLevels.silver.emoji}</div>
            <div class="trophy trophy-silver">${trophyLevels.silver.emoji}</div>
        `;
    } else if (timeLeft >= trophyLevels.bronze.minTime) {
        trophyHTML = `
            <div class="trophy trophy-bronze">${trophyLevels.bronze.emoji}</div>
        `;
    }

    return trophyHTML;
}

// Funciones para cambiar de nivel o menú
function nextLevel() {
    window.location.href = "../Nivel 3/index.html";
}

function mainMenu() {
    closeModal();
    window.location.href = "../mapas/mapa3.html"; // Ruta al menú principal
}

function retry() {
    closeModal();
    resetGame();
}

function closeModal() {
    document.getElementById("completionModal").style.display = "none";
}

// Restablecer botellas
function resetBottles() {
    const bottles = document.querySelectorAll('.bottle');
    const itemsContainer = document.querySelector('.items');

    bottles.forEach(bottle => {
        const items = bottle.querySelectorAll('.item');
        items.forEach(item => {
            itemsContainer.appendChild(item);
        });
    });
}

// Mezclar elementos
function shuffleItems() {
    const itemsContainer = document.querySelector('.items');
    const items = Array.from(itemsContainer.children);

    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    items.forEach(item => {
        itemsContainer.appendChild(item);
    });
}

// Cerrar el modal de instrucciones
function closeInstructionsModal() {
    document.getElementById("instructionsModal").style.display = "none";
}

// Configuración inicial al cargar la página
window.onload = function() {
    const savedLang = localStorage.getItem('language') || 'es';
    document.getElementById('langSelect').value = savedLang;
    loadGameData(savedLang);
};



function nextLevel() {
    closeModal('completionModal');
    window.location.href = '../Nivel 5/index.html';
}


// Función para el botón "Volver al Mapa"
function mainMenu() {
    closeModal();  // Cierra el modal
    window.location.href = '../mapas/mapa5.html';  // Redirige al menú principal (ajusta la ruta según sea necesario)
}

// Función para el botón "Reintentar"
function retry() {
    closeModal();  // Cierra el modal de error o éxito
    restartGame();  // Reinicia el juego
}

// Función para reiniciar el juego (sin recargar la página)
function restartGame() {
    currentLevel = 0;  // Vuelve al primer nivel
    correctAnswers = 0;  // Resetea el número de respuestas correctas
    selectedElements.clear();  // Limpia la selección de elementos
    initLevel();  // Inicializa el primer nivel
    hideAllModals();  // Asegúrate de ocultar cualquier modal activo
    showInstructions();  // Muestra las instrucciones nuevamente
}

// Función para cerrar los modales
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';  // Oculta todos los modales
    });
}
