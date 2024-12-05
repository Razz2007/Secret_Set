let gameData;
let timeLeft;
let timerId;

// Comprehensive translations for the game
const translations = {
    "es": {
        "title": "Juego de Clasificación",
        "timer": "Tiempo restante: {time} segundos",
        "loaderText": "SECRET SET",
        "messages": {
            "timeUp": "¡Tiempo agotado!",
            "wrongItem": "¡Elemento no pertenece a esta categoría!"
        },
        "completionModal": {
            "congratulations": "¡FELICIDADES!",
            "completionTime": "Has completado el rompecabezas en",
            "nextLevel": "SIGUIENTE NIVEL",
            "mainMenu": "MENÚ PRINCIPAL",
            "retry": "REINTENTAR"
        },
        "instructions": {
            "title": "Instrucciones del Juego",
            "step1": "Arrastra cada elemento a la categoría correcta.",
            "step2": "Completa el juego antes de que el tiempo termine para ganar trofeos.",
            "step3": "Si el elemento no pertenece a la categoría, recibirás un mensaje de error.",
            "startButton": "Comenzar Juego"
        }
    },
    "en": {
        "title": "Sorting Game",
        "timer": "Time remaining: {time} seconds",
        "loaderText": "SECRET SET",
        "messages": {
            "timeUp": "Time's up!",
            "wrongItem": "Item does not belong to this category!"
        },
        "completionModal": {
            "congratulations": "CONGRATULATIONS!",
            "completionTime": "You completed the puzzle in",
            "nextLevel": "NEXT LEVEL",
            "mainMenu": "MAIN MENU",
            "retry": "RETRY"
        },
        "instructions": {
            "title": "Game Instructions",
            "step1": "Drag each element to the correct category.",
            "step2": "Complete the game before time runs out to win trophies.",
            "step3": "If the element does not belong to the category, you will receive an error message.",
            "startButton": "Start Game"
        }
    }
};

// Language updating function
function updateLanguage(lang) {
    const langData = translations[lang];

    // Update document title
    document.title = langData.title;

    // Update timer display
    const timeElement = document.getElementById("time");
    if (timeElement) {
        timeElement.textContent = timeElement.textContent;
    }

    // Update instructions modal
    const instructionsModal = document.getElementById("instructionsModal");
    if (instructionsModal) {
        const modalTitle = instructionsModal.querySelector('h2');
        if (modalTitle) modalTitle.textContent = langData.instructions.title;

        const instructionSteps = instructionsModal.querySelectorAll('.instruction-step p');
        if (instructionSteps.length >= 3) {
            instructionSteps[0].textContent = langData.instructions.step1;
            instructionSteps[1].textContent = langData.instructions.step2;
            instructionSteps[2].textContent = langData.instructions.step3;
        }

        const startButton = instructionsModal.querySelector('.start-button');
        if (startButton) startButton.textContent = langData.instructions.startButton;
    }

    // Modify game messages
    gameData.messages = langData.messages;

    // Update completion modal
    const completionModal = document.getElementById("completionModal");
    if (completionModal && completionModal.style.display === "block") {
        const modalContent = completionModal.querySelector('.modal-content');
        if (modalContent) {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            const trophies = getTrophies(timeLeft);
            
            modalContent.innerHTML = `
                <h2>${langData.completionModal.congratulations}</h2>
                <div class="completion-time">
                    ${langData.completionModal.completionTime}<br>
                    ${formattedTime}
                </div>
                <div class="trophies-container">
                    ${trophies}
                </div>
                <button onclick="nextLevel()">${langData.completionModal.nextLevel}</button>
                <button onclick="mainMenu()">${langData.completionModal.mainMenu}</button>
                <button onclick="retry()">${langData.completionModal.retry}</button>
            `;
        }
    }
}

// Modify existing functions to support language switching
document.addEventListener('DOMContentLoaded', function() {
    // Create language selector
    const languageSelector = document.createElement('div');
    languageSelector.className = 'language-selector';
    languageSelector.style.cssText = 'position: absolute; top: 10px; right: 10px; z-index: 1000;';
    languageSelector.innerHTML = `
        <select id="langSelect">
            <option value="es">Español</option>
            <option value="en">English</option>
        </select>
    `;
    document.body.insertBefore(languageSelector, document.body.firstChild);

    // Get or set default language
    const currentLang = localStorage.getItem('language') || 'es';
    document.getElementById('langSelect').value = currentLang;

    // Language change event listener
    document.getElementById('langSelect').addEventListener('change', function(e) {
        const selectedLang = e.target.value;
        localStorage.setItem('language', selectedLang);
        document.documentElement.lang = selectedLang;
        updateLanguage(selectedLang);
    });
});

// Existing game functions
async function loadGameData() {
    try {
        const response = await fetch('./json/config.json');
        gameData = await response.json();
        timeLeft = gameData.gameSettings.timeLimit;
        
        // Set initial language
        const currentLang = localStorage.getItem('language') || 'es';
        updateLanguage(currentLang);
        
        initializeGame();
    } catch (error) {
        console.error('Error loading game data:', error);
    }
}

function initializeGame() {
    document.getElementById("time").textContent = timeLeft;
    createBottles();
    createItems();
    startTimer();
    shuffleItems();
}

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        const currentLang = localStorage.getItem('language') || 'es';
        const langData = translations[currentLang];
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            alert(gameData.messages.timeUp);
            resetGame();
        }
    }, 1000);
}

function showCompletionModal() {
    const modal = document.getElementById("completionModal");
    modal.style.display = "block";
    
    const currentLang = localStorage.getItem('language') || 'es';
    const langData = translations[currentLang];
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const trophies = getTrophies(timeLeft);
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <h2>${langData.completionModal.congratulations}</h2>
        <div class="completion-time">
            ${langData.completionModal.completionTime}<br>
            ${formattedTime}
        </div>
        <div class="trophies-container">
            ${trophies}
        </div>
        <button onclick="nextLevel()">${langData.completionModal.nextLevel}</button>
        <button onclick="mainMenu()">${langData.completionModal.mainMenu}</button>
        <button onclick="retry()">${langData.completionModal.retry}</button>
    `;
}

// Rest of the existing game functions remain the same...

window.onload = function() {
    document.getElementById("instructionsModal").style.display = "block";
    loadGameData();
};
