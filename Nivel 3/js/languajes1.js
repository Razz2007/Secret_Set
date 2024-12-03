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
