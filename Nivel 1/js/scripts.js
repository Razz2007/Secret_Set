// Cargar el archivo JSON
fetch('./json/config.json')
    .then(response => response.json())
    .then(data => {
        // Asignar imágenes desde el JSON
        data.blocks.forEach(block => {
            document.getElementById(block.id).style.backgroundImage = `url("${block.image}")`;
        });

        // Definir los mensajes de acción desde el JSON
        window.nextLevelMessage = data.actions.nextLevelMessage;
        window.mainMenuMessage = data.actions.mainMenuMessage;
        window.retryMessage = data.actions.retryMessage;
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

// Función para arrastrar
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Permitir soltar
function allowDrop(event) {
    event.preventDefault();
}

// Función para soltar
function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");

    if (event.target.children.length === 0) {
        event.target.appendChild(document.getElementById(data));
        checkCompletion();
    }
}

// Verificación de completar el rompecabezas
function checkCompletion() {
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

    let completed = true;

    correctBlocks.forEach(pair => {
        let dropBox = document.getElementById(pair.dropId);
        let block = dropBox.children[0];
        if (!block || block.id !== pair.blockId) {
            completed = false;
        }
    });

    if (completed) {
        showModal();
    }
}

// Mostrar modal
function showModal() {
    document.getElementById('completionModal').style.display = 'block';
}

// Cerrar modal
function closeModal() {
    document.getElementById('completionModal').style.display = 'none';
}

// Funciones para botones usando mensajes del JSON
function nextLevel() {
    closeModal();
    alert(window.nextLevelMessage);
    // Redirigir a la página del siguiente nivel
    window.location.href = '../Nivel 2/Index.html'; // Cambia esta ruta según la estructura de tus archivos
}

function mainMenu() {
    closeModal();
    alert(window.mainMenuMessage);
    // Lógica para volver al menú principal
    window.location.href = '../modos de juego.html';
}

function retry() {
    closeModal();
    alert(window.retryMessage);
    window.location.reload();
}

// Barajar los bloques al cargar la página
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
