let timer;
let seconds = 0;
let isGameStarted = false;
let gameConfig = null;

// Función para iniciar el temporizador
function startTimer() {
    if (!isGameStarted && gameConfig.timer.startOnFirstMove) {
        isGameStarted = true;
        timer = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
    }
}

// Función para actualizar la visualización del temporizador
function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    document.getElementById('timer').textContent = `Tiempo: ${display}`;
    return display;
}

// Función para detener el temporizador
function stopTimer() {
    clearInterval(timer);
}

// Función para determinar los trofeos basados en el tiempo
function getTrophies() {
    const { trophies } = gameConfig;
    
    if (seconds <= trophies.gold.time) {
        return Array(trophies.gold.count).fill(trophies.gold.emoji);
    } else if (seconds <= trophies.silver.time) {
        return Array(trophies.silver.count).fill(trophies.silver.emoji);
    } else {
        return Array(trophies.bronze.count).fill(trophies.bronze.emoji);
    }
}

// Cargar el archivo JSON
fetch('./json/config.json')
    .then(response => response.json())
    .then(data => {
        gameConfig = data;
        
        // Configurar bloques
        data.blocks.forEach(block => {
            document.getElementById(block.id).style.backgroundImage = `url("${block.image}")`;
        });
        
        // Configurar mensajes
        window.nextLevelMessage = data.actions.nextLevelMessage;
        window.mainMenuMessage = data.actions.mainMenuMessage;
        window.retryMessage = data.actions.retryMessage;
        
        // Mostrar/ocultar timer según configuración
        const timerElement = document.getElementById('timer');
        timerElement.style.display = data.timer.enabled ? 'block' : 'none';
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    if (!isGameStarted) {
        startTimer();
    }
}

function allowDrop(event) {
    event.preventDefault();
}

const correctPositions = {
    'drop1': 'block1',
    'drop2': 'block2',
    'drop3': 'block3',
    'drop4': 'block4',
    'drop5': 'block5',
    'drop6': 'block6',
    'drop7': 'block7',
    'drop8': 'block8',
    'drop9': 'block9'
};

let allPiecesPlaced = false;

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let dropZone = event.target.id;
    
    if (event.target.children.length === 0) {
        event.target.appendChild(document.getElementById(data));
        checkAllPiecesPlaced();
    }
}

function checkAllPiecesPlaced() {
    const correctBlocks = [
        { dropId: 'drop1', blockId: 'block1' },
        { dropId: 'drop2', blockId: 'block2' },
        { dropId: 'drop3', blockId: 'block3' },
        { dropId: 'drop4', blockId: 'block4' },
        { dropId: 'drop5', blockId: 'block5' },
        { dropId: 'drop6', blockId: 'block6' },
        { dropId: 'drop7', blockId: 'block7' },
        { dropId: 'drop8', blockId: 'block8' },
        { dropId: 'drop9', blockId: 'block9' }
    ];
    
    let allPlaced = true;
    let allCorrect = true;
    
    correctBlocks.forEach(pair => {
        let dropBox = document.getElementById(pair.dropId);
        let block = dropBox.children[0];
        
        if (!block) {
            allPlaced = false;
        } else if (block.id !== pair.blockId) {
            allCorrect = false;
        }
    });
    
    if (allPlaced) {
        if (allCorrect) {
            stopTimer();
            showSuccessModal();
        } else {
            showErrorModal();
        }
    }
}

function showSuccessModal() {
    const modal = document.getElementById('completionModal');
    const finalTimeSpan = document.getElementById('finalTime');
    const trophiesDiv = document.getElementById('trophies');
    
    finalTimeSpan.textContent = updateTimerDisplay();
    
    // Limpiar trofeos anteriores
    trophiesDiv.innerHTML = '';
    
    // Mostrar trofeos
    const trophies = getTrophies();
    trophies.forEach(trophy => {
        const trophySpan = document.createElement('span');
        trophySpan.className = 'trophy';
        trophySpan.textContent = trophy;
        trophiesDiv.appendChild(trophySpan);
    });
    
    modal.style.display = 'block';
}

function showErrorModal() {
    document.getElementById('errorModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function nextLevel() {
    closeModal('completionModal');
    window.location.href = '../Nivel 2/index.html';
}

function mainMenu() {
    closeModal('completionModal');
    window.location.href = '../mapas/mapa2.html';
}

function retry() {
    closeModal('errorModal');
    closeModal('completionModal');
    window.location.reload();
}

window.onload = function() {
    let parent = document.getElementById('drag');
    let frag = document.createDocumentFragment();
    let childrenArray = Array.from(parent.children);
    
    while (childrenArray.length) {
        let randomIndex = Math.floor(Math.random() * childrenArray.length);
        frag.appendChild(childrenArray.splice(randomIndex, 1)[0]);
    }
    
    parent.appendChild(frag);
};
window.onload = function() {
    let parent = document.getElementById('drag');
    let frag = document.createDocumentFragment();
    let childrenArray = Array.from(parent.children);
    
    while (childrenArray.length) {
        let randomIndex = Math.floor(Math.random() * childrenArray.length);
        frag.appendChild(childrenArray.splice(randomIndex, 1)[0]);
    }
    
    parent.appendChild(frag);
    
    // Mostrar el modal de instrucciones
    showInstructionModal();
};

function showInstructionModal() {
    document.getElementById('instructionModal').style.display = 'block';
}

function closeInstructionModal() {
    document.getElementById('instructionModal').style.display = 'none';
}

