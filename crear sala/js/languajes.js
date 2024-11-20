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
            "footer": "© 2024 Secret Set - Todos los Derechos Reservados"
        },
        "en": {
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
            "footer": "© 2024 Secret Set - All Rights Reserved"
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
