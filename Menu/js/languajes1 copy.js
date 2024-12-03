document.addEventListener('DOMContentLoaded', function () {
    const translations = {
        es: {
            "loader.text": "SECRET SET",
            "header.timer": "Tiempo: <span id='time'>10</span>s",
            "instructions.title": "Cómo Jugar",
            "instructions.rule1": "Encuentra todos los pares de cartas coincidentes antes de que se acabe el tiempo",
            "instructions.rule2": "Tienes 190 segundos para completar el nivel",
            "instructions.rule3": "Gana trofeos según el tiempo restante:<br>3 trofeos: >66% del tiempo<br>2 trofeos: >33% del tiempo<br>1 trofeo: completado",
            "instructions.rule4": "Memoriza la ubicación de las cartas para encontrar las parejas más rápido",
            "instructions.start": "¡Empezar a Jugar!",
            "win.title": "¡Felicitaciones!",
            "win.nextLevel": "Siguiente Nivel",
            "win.retry": "Reintentar",
            "win.menu": "Menú Principal",
            "lose.title": "¡Tiempo agotado!",
            "lose.prompt": "¿Qué deseas hacer?",
            "lose.retry": "Reintentar",
            "lose.menu": "Menú principal"
        },
        en: {
            "loader.text": "SECRET SET",
            "header.timer": "Time: <span id='time'>10</span>s",
            "instructions.title": "How to Play",
            "instructions.rule1": "Find all matching card pairs before time runs out",
            "instructions.rule2": "You have 190 seconds to complete the level",
            "instructions.rule3": "Earn trophies based on remaining time:<br>3 trophies: >66% of time<br>2 trophies: >33% of time<br>1 trophy: completed",
            "instructions.rule4": "Memorize the cards' locations to match pairs faster",
            "instructions.start": "Start Playing!",
            "win.title": "Congratulations!",
            "win.nextLevel": "Next Level",
            "win.retry": "Retry",
            "win.menu": "Main Menu",
            "lose.title": "Time's Up!",
            "lose.prompt": "What would you like to do?",
            "lose.retry": "Retry",
            "lose.menu": "Main Menu"
        }
    };

    // Add language selector to the page
    const languageSelector = document.createElement('select');
    languageSelector.id = 'langSelect';
    languageSelector.className = 'language-selector';
    document.body.insertBefore(languageSelector, document.body.firstChild);

    // Get current language from localStorage or default to Spanish
    let currentLang = localStorage.getItem('language') || 'es';
    languageSelector.value = currentLang;

    function updateContent(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        // Update HTML language attribute
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
    }

    // Language change event listener
    languageSelector.addEventListener('change', function (e) {
        currentLang = e.target.value;
        updateContent(currentLang);
    });

    // Initial content update
    updateContent(currentLang);
});