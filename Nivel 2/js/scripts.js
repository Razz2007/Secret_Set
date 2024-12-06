let gameData;
let timeLeft;
let timerId;

async function loadGameData(lang = 'es') {
    try {
        clearInterval(timerId); // Detener el temporizador actual

        const response = await fetch('./json/config.json');
        const data = await response.json();

        gameData = {
            gameSettings: {
                ...data.gameSettings,
                categories: data.gameSettings.categories[lang]
            },
            messages: data.messages[lang]
        };

        timeLeft = gameData.gameSettings.timeLimit;
        initializeGame();
    } catch (error) {
        console.error('Error loading game data:', error);
    }
}


// Inicializar el juego
function initializeGame() {
    document.getElementById("time").textContent = timeLeft;
    createBottles();
    createItems();
    startTimer();
    shuffleItems();
}

// Crear las botellas/categorías
function createBottles() {
    const containersDiv = document.querySelector('.containers');
    containersDiv.innerHTML = ''; // Limpiar contenedores existentes

    gameData.gameSettings.categories.forEach(category => {
        const bottle = document.createElement('div');
        bottle.id = category.id;
        bottle.className = 'bottle';
        bottle.ondrop = drop;
        bottle.ondragover = allowDrop;

        const bottleTitle = document.createElement('h2');
        bottleTitle.textContent = category.name;

        bottle.appendChild(bottleTitle);
        containersDiv.appendChild(bottle);
    });
}

function createItems() {
    const itemsContainer = document.querySelector('.items');
    itemsContainer.innerHTML = ''; // Limpiar contenedor existente

    // Generar elementos para cada categoría en el idioma actual
    gameData.gameSettings.categories.forEach(category => {
        category.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.id = item.id;
            itemElement.className = 'item';
            itemElement.draggable = true;
            itemElement.ondragstart = drag;
            itemElement.innerHTML = `${item.emoji} ${item.name}`;
            itemsContainer.appendChild(itemElement);
        });
    });
}

function updateLanguage(lang) {
    clearInterval(timerId); // Detener temporizador actual
    loadGameData(lang).then(() => {
        createBottles(); // Regenerar botellas
        createItems();   // Regenerar elementos arrastrables
        document.getElementById("time").textContent = timeLeft;
        startTimer();    // Reiniciar temporizador
    });
}


// Configuración inicial al cargar la página
window.onload = function() {
    const savedLang = localStorage.getItem('language') || 'es';
    document.getElementById('langSelect').value = savedLang;
    updateLanguage(savedLang);
};

document.getElementById('langSelect').addEventListener('change', (event) => {
    const newLang = event.target.value;
    localStorage.setItem('language', newLang);
    updateLanguage(newLang);
});

function startTimer() {
    clearInterval(timerId); // Asegurarse de que no haya temporizadores duplicados

    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            alert(gameData.messages.timeUp);
            resetGame();
        }
    }, 1000); // Actualización cada segundo
}


// Reiniciar el juego
function resetGame() {
    timeLeft = gameData.gameSettings.timeLimit;
    document.getElementById("time").textContent = timeLeft;
    clearInterval(timerId);
    startTimer();
    document.getElementById("completionModal").style.display = "none";
    resetBottles();
    shuffleItems();
}

// Funciones de arrastrar y soltar
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const droppedElement = document.getElementById(data);

    if (event.target.classList.contains("bottle") || event.target.closest('.bottle')) {
        const bottle = event.target.classList.contains("bottle") ? event.target : event.target.closest('.bottle');
        const category = gameData.gameSettings.categories.find(cat => cat.id === bottle.id);

        if (category && category.items.some(item => item.id === data)) {
            bottle.appendChild(droppedElement);
            checkWin();
        } else {
            alert(gameData.messages.wrongItem);
        }
    }
}

// Verificar si el jugador ha ganado
function checkWin() {
    const allBottlesFull = gameData.gameSettings.categories.every(category => {
        const bottle = document.getElementById(category.id);
        return bottle.children.length === category.items.length + 1;
    });

    if (allBottlesFull) {
        clearInterval(timerId);
        showCompletionModal();
    }
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
