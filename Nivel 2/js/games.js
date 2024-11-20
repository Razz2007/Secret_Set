let score = 0;
let currentMission = 0;
let selectedItems = [];

// Cargar misiones y territorios
fetch('json/data.json')
    .then(response => response.json())
    .then(data => {
        initializeGame(data);
    });

function initializeGame(data) {
    const missionText = document.getElementById("mission-text");
    const territoriesContainer = document.getElementById("territories-container");
    
    // Mostrar misión inicial
    showMission(data.missions[currentMission], missionText);

    // Crear territorios
    for (const [territory, elements] of Object.entries(data.territories)) {
        const territoryDiv = document.createElement("div");
        territoryDiv.classList.add("territory");
        territoryDiv.dataset.territory = territory;
        territoryDiv.innerText = `Territorio ${territory}`;
        
        territoryDiv.addEventListener("click", () => {
            selectTerritory(elements, territoryDiv);
        });
        
        territoriesContainer.appendChild(territoryDiv);
    }

    // Botón para completar la misión
    document.getElementById("submit-button").addEventListener("click", () => {
        checkMission(data.missions[currentMission]);
    });
}

function showMission(mission, missionText) {
    missionText.innerText = mission.description;
}

function selectTerritory(elements, territoryDiv) {
    territoryDiv.classList.toggle("selected");
    if (territoryDiv.classList.contains("selected")) {
        selectedItems = selectedItems.concat(elements);
    } else {
        selectedItems = selectedItems.filter(item => !elements.includes(item));
    }
}

function checkMission(mission) {
    const result = performOperation(mission.operation, mission.expected, selectedItems);
    const resultText = document.getElementById("score");
    
    if (result) {
        score += 10;
        resultText.innerText = `Puntuación: ${score}`;
        alert("¡Misión completada!");
        nextMission();
    } else {
        alert("Respuesta incorrecta. Inténtalo de nuevo.");
    }
}

function performOperation(operation, expected, selected) {
    let result;

    if (operation === "union") {
        result = [...new Set(selected)];
    } else if (operation === "intersection") {
        result = expected.filter(item => selected.includes(item));
    } else if (operation === "difference") {
        result = expected.filter(item => !selected.includes(item));
    }

    return JSON.stringify(result) === JSON.stringify(expected);
}

function nextMission() {
    const missionText = document.getElementById("mission-text");
    fetch('json/missions.json')
        .then(response => response.json())
        .then(data => {
            currentMission++;
            if (currentMission < data.missions.length) {
                showMission(data.missions[currentMission], missionText);
                selectedItems = [];
            } else {
                missionText.innerText = "¡Juego completado! Puntuación final: " + score;
            }
        });
}
