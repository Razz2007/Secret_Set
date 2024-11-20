let gameData;
let timeLeft;
let timerId;

// Cargar los datos del juego
async function loadGameData() {
    try {
        const response = await fetch('./json/config.json');
        gameData = await response.json();
        timeLeft = gameData.gameSettings.timeLimit;
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
    itemsContainer.innerHTML = '';
    
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

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            alert(gameData.messages.timeUp);
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    timeLeft = gameData.gameSettings.timeLimit;
    document.getElementById("time").textContent = timeLeft;
    clearInterval(timerId);
    startTimer();
    document.getElementById("completionModal").style.display = "none";
    resetBottles();
    shuffleItems();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let droppedElement = document.getElementById(data);
    
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

function showCompletionModal() {
    const modal = document.getElementById("completionModal");
    modal.style.display = "block";
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const trophies = getTrophies(timeLeft);
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <h2>¡FELICIDADES!</h2>
        <div class="completion-time">
            Has completado el rompecabezas en<br>
            ${formattedTime}
        </div>
        <div class="trophies-container">
            ${trophies}
        </div>
        <button onclick="nextLevel()">SIGUIENTE NIVEL</button>
        <button onclick="mainMenu()">MENÚ PRINCIPAL</button>
        <button onclick="retry()">REINTENTAR</button>
    `;
}
function nextLevel() {
    window.location.href = "../Nivel 3/index.html";
}

function mainMenu() {
    closeModal();
    // Redirigir al menú principal, asegurándote de que la ruta sea correcta
    window.location.href = "../mapa/mapa.html"; // Ruta al archivo del menú principal
}

function retry() {
    closeModal();
    resetGame();
}

function closeModal() {
    document.getElementById("completionModal").style.display = "none";
}

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
function closeInstructionsModal() {
    document.getElementById("instructionsModal").style.display = "none";
}

window.onload = function() {
    document.getElementById("instructionsModal").style.display = "block";
    loadGameData();
};
// Iniciar el juego al cargar la página
window.onload = loadGameData;