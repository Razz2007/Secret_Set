const getBasePath = () => {
    // Obtiene la ruta base del proyecto
    const path = window.location.pathname;
    const projectRoot = path.substring(0, path.indexOf('/', 1) + 1);
    return projectRoot || '/';
};

document.addEventListener('DOMContentLoaded', function() {
    const basePath = getBasePath();
    // Default language
    let currentLang = localStorage.getItem('language') || 'es';

    // Translations object
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
            "footer": "© 2024 Secret Set - Todos los Derechos Reservados"
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
            "footer": "© 2024 Secret Set - All Rights Reserved"
        }
    };

    // Function to update content
    function updateContent(lang) {
        // Update regular elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName.toLowerCase() === 'input') {
                    // Para elementos input, actualizar el valor
                    element.value = translations[lang][key];
                } else if (element.tagName.toLowerCase() === 'button') {
                    // Para botones, actualizar el texto
                    element.textContent = translations[lang][key];
                } else {
                    // Para otros elementos, usar innerHTML para preservar el formato
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Dispatch a custom event to notify that the language has changed
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));

        // Save selected language
        localStorage.setItem('language', lang);
        
        // Update the HTML lang attribute
        document.documentElement.lang = lang;

        // Actualizar el valor del selector de idiomas
        document.getElementById('langSelect')?.value = lang;
    }

    // Initial content update
    updateContent(currentLang);
});









