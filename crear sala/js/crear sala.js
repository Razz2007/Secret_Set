let maxPlayers = 20;
let minPlayers = 4;
let maxRounds = 5;
let minRounds = 1;

// Cambiar cantidad de jugadores
function changePlayers(value) {
    let players = document.getElementById("players");
    let currentPlayers = parseInt(players.textContent);
    currentPlayers += value;
    if (currentPlayers >= minPlayers && currentPlayers <= maxPlayers) {
        players.textContent = currentPlayers;
    }
}

// Cambiar cantidad de rondas
function changeRounds(value) {
    let rounds = document.getElementById("rounds");
    let currentRounds = parseInt(rounds.textContent);
    currentRounds += value;
    if (currentRounds >= minRounds && currentRounds <= maxRounds) {
        rounds.textContent = currentRounds;
    }
}

// Restablecer valores predeterminados
function resetValues() {
    document.getElementById("players").textContent = maxPlayers;
    document.getElementById("rounds").textContent = maxRounds;
    document.getElementById("mapSelect").value = "";
}

// Selección aleatoria de mapa, jugadores y rondas
function setRandom() {
    const maps = ["Nueva York", "Los Ángeles", "Miami", "San Francisco", "Las Vegas", "Londres", "París", "Roma", "Berlín", "Madrid", "Barcelona", "Ámsterdam", "Viena", "Praga", "Ciudad de México", "Buenos Aires", "São Paulo", "Río de Janeiro", "Bogotá", "Medellín"];
    let randomPlayers = Math.floor(Math.random() * (maxPlayers - minPlayers + 1)) + minPlayers;
    let randomRounds = Math.floor(Math.random() * (maxRounds - minRounds + 1)) + minRounds;
    let randomMap = maps[Math.floor(Math.random() * maps.length)];

    document.getElementById("players").textContent = randomPlayers;
    document.getElementById("rounds").textContent = randomRounds;
    document.getElementById("mapSelect").value = randomMap;
}
