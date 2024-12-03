const getBasePath = () => {
    const path = window.location.pathname;
    const projectRoot = path.substring(0, path.indexOf('/', 1) + 1);
    return projectRoot || '/';
};

document.addEventListener('DOMContentLoaded', function() {
    const basePath = getBasePath();
    let currentLang = localStorage.getItem('language') || 'es';
    
    const languageSelector = document.createElement('div');
    languageSelector.className = 'language-selector';
    languageSelector.innerHTML = `
        <select id="langSelect">
            <option value="es">Español</option>
            <option value="en">English</option>
        </select>
    `;
    document.body.insertBefore(languageSelector, document.body.firstChild);
    document.getElementById('langSelect').value = currentLang;

    const translations = {
        "es": {
            // Menú principal
            "welcome": "Bienvenido",
            "home": "Inicio",
            "settings": "Configuración",
            "friends": "Amigos",
            "profile": "Mi perfil",
            "musicSettings": "Configuración de Música",
            "masterVolume": "Volumen Maestro",
            "turnOff": "Apagar Música y Efectos",
            "turnOn": "Encender Música y Efectos",
            "effectsVolume": "Volumen de Efectos",
            "musicVolume": "Volumen de Música",
            "footer": "© 2024 Secret Set - Todos los Derechos Reservados",

            // Modos de juego
            "localGame1": "Partida Local",
            "multiplayer": "Multijugador",
            "footerGameModes": "© 2024 Secret Set - Todos los Derechos Reservados",

            // Página de amigos
            "friendsTitle": "Amigos",
            "statusOnline": "Conectado",
            "statusOffline": "Desconectado",
            "statusInGame": "En partida",
            "invite": "Invitar",
            "addFriends": "Añadir Amigos",
            "searchFriend": "Buscar amigo...",
            "search": "Buscar",
            "friendRequests": "Solicitudes de Amistad",
            "footerFriends": "© 2024 Secret Set - Todos los Derechos Reservados",

            "title": "Secret Set",
            "joinRoom": "Unirme a Sala",
            "createRoom": "Crear Sala",
            "footer": "© 2024 Secret Set - Todos los Derechos Reservados",

            "title": "Secret Set",
            "multiplayer": "Multijugador",
            "selectAvatar": "Elije tu avatar",
            "enterCode": "Ingresa el código para unirte a la sala",
            "placeholderCode": "Fg12kwZ",
            "footer": "© 2024 Secret Set - Todos los Derechos Reservados",

            "title1": "SECRET SET",
            "createRoomTitle": "Crear Sala",
            "createRoom": "Crear Sala",
            "players": "Jugadores",
            "rounds": "Rondas",
            "maps": "Mapas",
            "selectMap": "Selecciona un mapa",
            "newYork": "Nueva York",
            "losAngeles": "Los Ángeles",
            "miami": "Miami",
            "sanFrancisco": "San Francisco",
            "lasVegas": "Las Vegas",
            "london": "Londres",
            "paris": "París",
            "rome": "Roma",
            "berlin": "Berlín",
            "madrid": "Madrid",
            "barcelona": "Barcelona",
            "amsterdam": "Ámsterdam",
            "vienna": "Viena",
            "prague": "Praga",
            "mexicoCity": "Ciudad de México",
            "buenosAires": "Buenos Aires",
            "saoPaulo": "São Paulo",
            "rioDeJaneiro": "Río de Janeiro",
            "bogota": "Bogotá",
            "medellin": "Medellín",
            "resetValues": "Restablecer valores predeterminados",
            "random": "Aleatorio",
            "createRoomButton": "Crear Sala",
            "footer": "© 2024 Secret Set - Todos los Derechos Reservados",

            "welcome": "Bienvenido",
            "home": "Inicio",
            "settings": "Configuración",
            "friends": "Amigos",
            "profile": "Mi perfil",
            "Ejercicios Completados": "Ejercicios Completados",
            "Problemas Resueltos": "Problemas Resueltos",
            "Tiempo total de estudio": "Tiempo total de estudio",
            "Trofeos ganados 🏆": "Trofeos ganados 🏆",
            "Progreso al Siguiente Nivel": "Progreso al Siguiente Nivel",
            "Logros por Desbloquear": "Logros por Desbloquear",
            "Unión Perfecta": "Unión Perfecta",
            "Completa 5 ejercicios de unión de conjuntos": "Completa 5 ejercicios de unión de conjuntos",
            "Maestro de Intersección": "Maestro de Intersección",
            "Resuelve 10 problemas de intersección": "Resuelve 10 problemas de intersección",
            "Subconjuntos Experto": "Subconjuntos Experto",
            "Identifica correctamente 15 subconjuntos": "Identifica correctamente 15 subconjuntos",
            "Vacío Perfecto": "Vacío Perfecto",
            "Identifica 5 conjuntos vacíos": "Identifica 5 conjuntos vacíos",

            "localGame": "Jugar",
            "loaderText": "SECRET SET",
            "backArrowAlt": "Flecha de retroceder",
            "playButtonAlt": "Partida Local",
            "gifAlt": "Imagen gif",
            "title": "SECRET SET",

            "loaderText": "SECRET SET",
            "gifAlt": "Imagen gif",
            "backArrowAlt": "Flecha de retroceder",
            "title": "Niveles",
            "nivel1": "1",
            "nivelLocked": "Bloqueado",

            "timer": "Tiempo: 00:00",
            "congratulationsTitle": "¡Felicidades!",
            "puzzleCompleted": "Has completado el rompecabezas en",
            "nextLevel": "Siguiente Nivel",
            "backToMap": "Volver al mapa",
            "retry": "Reintentar",
            "errorTitle": "¡Ups! Algo no está bien",
            "errorMessage": "Las piezas no están en las posiciones correctas. ¡Inténtalo de nuevo!",
            "tryAgain": "Intentar de nuevo",
            "howToPlay": "¿Cómo Jugar?",
            "dragPieces": "Arrastra las piezas del rompecabezas desde la parte superior hacia el tablero",
            "timerStart": "El temporizador comenzará cuando muevas la primera pieza",
            "getTrophies": "¡Consigue trofeos según tu tiempo!",
            "trophy3": "3 trofeos: Menos de 30 segundos",
            "trophy2": "2 trofeos: Menos de 60 segundos",
            "trophy1": "1 trofeo: Completar el puzzle",
            "placeCorrectly": "Coloca todas las piezas en su posición correcta para ganar",
            "startPlaying": "¡Empezar a Jugar!",

            "title": "Juego de Clasificación",
            "loaderText": "SECRET SET",
            "gifAlt": "Imagen gif",
            "timeRemaining": "Tiempo restante:",
            "seconds": "segundos",
            "gameInstructions": "Instrucciones del Juego",
            "instruction1": "Arrastra cada elemento a la categoría correcta.",
            "instruction2": "Completa el juego antes de que el tiempo termine para ganar trofeos.",
            "instruction3": "Si el elemento no pertenece a la categoría, recibirás un mensaje de error.",
            "startGame": "Comenzar Juego",
            
            // Mensajes adicionales que podrías necesitar para el modal de completado
            "congratulations": "¡Felicitaciones!",
            "gameCompleted": "Has completado el juego",
            "timeSpent": "Tiempo empleado:",
            "nextLevel": "Siguiente Nivel",
            "retryLevel": "Reintentar",
            "backToMenu": "Volver al Menú",
            "errorMessage": "¡Categoria incorrecta!",
            "tryAgain": "Inténtalo de nuevo",

            "missionDescription1": "Encuentra la unión de frutas en Territorio A y B",
            "missionOperation1": "unión",
            "missionExpected1": ["manzana", "banana", "naranja", "pera"],
            "missionDescription2": "Encuentra la intersección entre Territorio B y C",
            "missionOperation2": "intersección",
            "missionExpected2": ["banana"],
            "missionDescription3": "Selecciona los elementos de A que no están en C",
            "missionOperation3": "diferencia",
            "missionExpected3": ["manzana"],
            "territoryA": "Territorio A",
            "territoryB": "Territorio B", 
            "territoryC": "Territorio C",


            "loader_text": "SECRET SET",
            "instructions_title": "Cómo Jugar",
            "instructions_gameplay": "Encuentra todos los pares de cartas coincidentes antes de que se acabe el tiempo",
            "instructions_timer": "Tienes 190 segundos para completar el nivel",
            "instructions_trophies": "Gana trofeos según el tiempo restante:\n3 trofeos: >66% del tiempo\n2 trofeos: >33% del tiempo\n1 trofeo: completado",
            "instructions_tip": "Memoriza la ubicación de las cartas para encontrar las parejas más rápido",
            "button_start_game": "¡Empezar a Jugar!",
            "win_title": "¡Felicitaciones!",
            "win_next_level": "Siguiente Nivel",
            "win_retry": "Reintentar",
            "win_main_menu": "Menú Principal",
            "lose_title": "¡Tiempo agotado!",
            "lose_retry": "Reintentar",
            "lose_main_menu": "Menú principal",
            "timer_label": "Tiempo",
            "footer": "© 2024 Secret Set - Todos los Derechos Reservados",
            "welcome": "Bienvenido",
            "home": "Inicio",
            "settings": "Configuración",
            "friends": "Amigos",
            "profile": "Mi perfil",
            "musicSettings": "Configuración de Música",
            "masterVolume": "Volumen Maestro",
            "turnOff": "Apagar Música y Efectos",
            "turnOn": "Encender Música y Efectos",
            "effectsVolume": "Volumen de Efectos",
            "musicVolume": "Volumen de Música"
            
            
        },
        "en": {
            // Main menu
            "welcome": "Welcome",
            "home": "Home",
            "settings": "Settings",
            "friends": "Friends",
            "profile": "My Profile",
            "musicSettings": "Music Settings",
            "masterVolume": "Master Volume",
            "turnOff": "Turn Off Music and Effects",
            "turnOn": "Turn On Music and Effects",
            "effectsVolume": "Effects Volume",
            "musicVolume": "Music Volume",
            "footer": "© 2024 Secret Set - All Rights Reserved",

            // Game modes
            "localGame1": "Local Game",
            "multiplayer": "Multiplayer",
            "footerGameModes": "© 2024 Secret Set - All Rights Reserved",

            // Friends page
            "friendsTitle": "Friends",
            "statusOnline": "Online",
            "statusOffline": "Offline",
            "statusInGame": "In Game",
            "invite": "Invite",
            "addFriends": "Add Friends",
            "searchFriend": "Search friend...",
            "search": "Search",
            "friendRequests": "Friend Requests",
            "footerFriends": "© 2024 Secret Set - All Rights Reserved",

            "title": "Secret Set",
            "joinRoom": "Join Room",
            "createRoom": "Create Room",
            "footer": "© 2024 Secret Set - All Rights Reserved",

            "title1": "Secret Set",
            "multiplayer": "Multiplayer",
            "selectAvatar": "Choose your avatar",
            "enterCode": "Enter the code to join the room",
            "placeholderCode": "Fg12kwZ",
            "footer": "© 2024 Secret Set - All Rights Reserved",

            "title": "SECRET SET",
            "createRoomTitle": "Create Room",
            "createRoom": "Create Room",
            "players": "Players",
            "rounds": "Rounds",
            "maps": "Maps",
            "selectMap": "Select a map",
            "newYork": "New York",
            "losAngeles": "Los Angeles",
            "miami": "Miami",
            "sanFrancisco": "San Francisco",
            "lasVegas": "Las Vegas",
            "london": "London",
            "paris": "Paris",
            "rome": "Rome",
            "berlin": "Berlin",
            "madrid": "Madrid",
            "barcelona": "Barcelona",
            "amsterdam": "Amsterdam",
            "vienna": "Vienna",
            "prague": "Prague",
            "mexicoCity": "Mexico City",
            "buenosAires": "Buenos Aires",
            "saoPaulo": "São Paulo",
            "rioDeJaneiro": "Rio de Janeiro",
            "bogota": "Bogotá",
            "medellin": "Medellín",
            "resetValues": "Reset Default Values",
            "random": "Random",
            "createRoomButton": "Create Room",
            "footer": "© 2024 Secret Set - All Rights Reserved",

            "welcome": "Welcome",
            "home": "Home",
            "settings": "Settings",
            "friends": "Friends",
            "profile": "My Profile",
            "Exercises Completed": "Exercises Completed",
            "Problems Solved": "Problems Solved",
            "Total Study Time": "Total Study Time",
            "Trophies Earned 🏆": "Trophies Earned 🏆",
            "Progress to Next Level": "Progress to Next Level",
            "Achievements to Unlock": "Achievements to Unlock",
            "Perfect Union": "Perfect Union",
            "Complete 5 set union exercises": "Complete 5 set union exercises",
            "Intersection Master": "Intersection Master",
            "Solve 10 intersection problems": "Solve 10 intersection problems",
            "Subsets Expert": "Subsets Expert",
            "Correctly identify 15 subsets": "Correctly identify 15 subsets",
            "Perfect Emptiness": "Perfect Emptiness",
            "Identify 5 empty sets": "Identify 5 empty sets",

            "localGame": "Play",
            "loaderText": "SECRET SET",
            "backArrowAlt": "Back Arrow",
            "playButtonAlt": "Local Game",
            "gifAlt": "GIF Image",
            "title": "SECRET SET",

            "loaderText": "SECRET SET",
            "gifAlt": "GIF Image",
            "backArrowAlt": "Back Arrow",
            "title": "Levels",
            "nivel1": "1",
            "nivelLocked": "Locked",

            "timer": "Time: 00:00",
            "congratulationsTitle": "Congratulations!",
            "puzzleCompleted": "You completed the puzzle in",
            "nextLevel": "Next Level",
            "backToMap": "Back to Map",
            "retry": "Retry",
            "errorTitle": "Oops! Something's not right",
            "errorMessage": "The pieces are not in the correct positions. Try again!",
            "tryAgain": "Try Again",
            "howToPlay": "How to Play?",
            "dragPieces": "Drag the puzzle pieces from the top to the board",
            "timerStart": "The timer will start when you move the first piece",
            "getTrophies": "Get trophies based on your time!",
            "trophy3": "3 trophies: Less than 30 seconds",
            "trophy2": "2 trophies: Less than 60 seconds",
            "trophy1": "1 trophy: Complete the puzzle",
            "placeCorrectly": "Place all pieces in their correct position to win",
            "startPlaying": "Start Playing!",

            "title": "Classification Game",
            "loaderText": "SECRET SET",
            "gifAlt": "Gif image",
            "timeRemaining": "Time remaining:",
            "seconds": "seconds",
            "gameInstructions": "Game Instructions",
            "instruction1": "Drag each item to the correct category.",
            "instruction2": "Complete the game before time runs out to earn trophies.",
            "instruction3": "If the item doesn't belong to the category, you'll receive an error message.",
            "startGame": "Start Game",
            
            // Additional messages you might need for the completion modal
            "congratulations": "Congratulations!",
            "gameCompleted": "You have completed the game",
            "timeSpent": "Time spent:",
            "nextLevel": "Next Level",
            "retryLevel": "Retry",
            "backToMenu": "Back to Menu",
            "errorMessage": "Wrong category!",
            "tryAgain": "Try again",

            "missionDescription1": "Find the union of fruits in Territory A and B",
            "missionOperation1": "union",
            "missionExpected1": ["apple", "banana", "orange", "pear"],
            "missionDescription2": "Find the intersection between Territory B and C",
            "missionOperation2": "intersection",
            "missionExpected2": ["banana"],
            "missionDescription3": "Select the elements of A that are not in C",
            "missionOperation3": "difference",
            "missionExpected3": ["apple"],
            "territoryA": "Territory A",
            "territoryB": "Territory B",
            "territoryC": "Territory C",

            
            "loader_text": "SECRET SET",
            "instructions_title": "How to Play",
            "instructions_gameplay": "Find all matching card pairs before time runs out",
            "instructions_timer": "You have 190 seconds to complete the level",
            "instructions_trophies": "Earn trophies based on remaining time:\n3 trophies: >66% of time\n2 trophies: >33% of time\n1 trophy: completed",
            "instructions_tip": "Memorize the cards' locations to match pairs faster",
            "button_start_game": "Start Playing!",
            "win_title": "Congratulations!",
            "win_next_level": "Next Level",
            "win_retry": "Retry",
            "win_main_menu": "Main Menu",
            "lose_title": "Time's Up!",
            "lose_retry": "Retry",
            "lose_main_menu": "Main Menu",
            "timer_label": "Time",
            "footer": "© 2024 Secret Set - All Rights Reserved",
            "welcome": "Welcome",
            "home": "Home",
            "settings": "Settings",
            "friends": "Friends",
            "profile": "My Profile",
            "musicSettings": "Music Settings",
            "masterVolume": "Master Volume",
            "turnOff": "Turn Off Music and Effects",
            "turnOn": "Turn On Music and Effects",
            "effectsVolume": "Effects Volume",
            "musicVolume": "Music Volume"

        }
    };

    function updateContent(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
    }

    document.getElementById('langSelect').addEventListener('change', function(e) {
        currentLang = e.target.value;
        updateContent(currentLang);
    });

    updateContent(currentLang);
});


