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
            "localGame": "Partida Local",
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

            "title": "SECRET SET",
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
            "Identifica 5 conjuntos vacíos": "Identifica 5 conjuntos vacíos"
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
            "localGame": "Local Game",
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

            "title": "Secret Set",
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
            "Identify 5 empty sets": "Identify 5 empty sets"


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
