const getBasePath = () => {
    const path = window.location.pathname;
    const projectRoot = path.substring(0, path.indexOf('/', 1) + 1);
    return projectRoot || '/';
};

document.addEventListener('DOMContentLoaded', function() {
    const basePath = getBasePath();
    let currentLang = localStorage.getItem('language') || 'es';

    // Comprehensive translations object
    const translations = {
        "es": {
            // Page Title
            "title": "Rompecabezas",

            // Loader
            "loaderText": "CONJUNTO SECRETO",
            "gifAlt": "Imagen de saludo",

            // Timer
            "timer": "Tiempo: 00:00",

            // Completion Modal
            "congratulationsTitle": "¡Felicidades!",
            "puzzleCompleted": "Has completado el rompecabezas en",
            "nextLevel": "Siguiente Nivel",
            "backToMap": "Volver al mapa",
            "retry": "Reintentar",

            // Error Modal
            "errorTitle": "¡Ups! Algo no está bien",
            "errorMessage": "Las piezas no están en las posiciones correctas. ¡Inténtalo de nuevo!",
            "tryAgain": "Intentar de nuevo",

            // Instructions Modal
            "howToPlay": "¿Cómo Jugar?",
            "dragPieces": "Arrastra las piezas del rompecabezas desde la parte superior hacia el tablero",
            "timerStart": "El temporizador comenzará cuando muevas la primera pieza",
            "getTrophies": "¡Consigue trofeos según tu tiempo!",
            "trophy3": "3 trofeos: Menos de 30 segundos",
            "trophy2": "2 trofeos: Menos de 60 segundos",
            "trophy1": "1 trofeo: Completar el puzzle",
            "placeCorrectly": "Coloca todas las piezas en su posición correcta para ganar",
            "startPlaying": "¡Empezar a Jugar!",
            
            "title": "Rompecabezas",
            "loaderText": "CONJUNTO SECRETO",
            "gifAlt": "Imagen de saludo",
            "timer": "Tiempo: 00:00",
            "howToPlay": "¿Cómo Jugar?",
            "dragPieces": "Arrastra las piezas del rompecabezas desde la parte superior hacia el tablero",
            "getTrophies": "¡Consigue trofeos según tu tiempo!",
            "placeCorrectly": "Coloca todas las piezas en su posición correcta para ganar",
            "startPlaying": "¡Empezar a Jugar!"

        },
        "en": {
            // Page Title
            "title": "Puzzle",

            // Loader
            "loaderText": "SECRET SET",
            "gifAlt": "Greeting image",

            // Timer
            "timer": "Time: 00:00",

            // Completion Modal
            "congratulationsTitle": "Congratulations!",
            "puzzleCompleted": "You completed the puzzle in",
            "nextLevel": "Next Level",
            "backToMap": "Back to Map",
            "retry": "Retry",

            // Error Modal
            "errorTitle": "Oops! Something is wrong",
            "errorMessage": "The pieces are not in the correct positions. Try again!",
            "tryAgain": "Try Again",

            // Instructions Modal
            "howToPlay": "How to Play?",
            "dragPieces": "Drag the puzzle pieces from the top to the board",
            "timerStart": "The timer will start when you move the first piece",
            "getTrophies": "Get trophies based on your time!",
            "trophy3": "3 trophies: Less than 30 seconds",
            "trophy2": "2 trophies: Less than 60 seconds",
            "trophy1": "1 trophy: Complete the puzzle",
            "placeCorrectly": "Place all pieces in their correct position to win",
            "startPlaying": "Start Playing!",

            "title": "Puzzle",
            "loaderText": "SECRET SET",
            "gifAlt": "Greeting image",
            "timer": "Time: 00:00",
            "howToPlay": "How to Play?",
            "dragPieces": "Drag the puzzle pieces from the top to the board",
            "getTrophies": "Get trophies based on your time!",
            "placeCorrectly": "Place all pieces in their correct position to win",
            "startPlaying": "Start Playing!"
        }
    };

    // Language Selector Setup
    const languageSelector = document.createElement('div');
    languageSelector.className = 'language-selector';
    languageSelector.style.opacity = '1';
    languageSelector.style.pointerEvents = 'auto';
    languageSelector.innerHTML = `
        <select id="langSelect">
            <option value="es">Español</option>
            <option value="en">English</option>
        </select>
    `;
    document.body.insertBefore(languageSelector, document.body.firstChild);
    document.getElementById('langSelect').value = currentLang;

    // Function to update content based on selected language
    function updateContent(lang) {
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update alt attributes
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            if (translations[lang] && translations[lang][key]) {
                element.alt = translations[lang][key];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Dispatch language change event
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));

        // Update page title
        document.title = translations[lang]['title'];

        // Save language preference
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
    }

    // Language change event listener
    document.getElementById('langSelect').addEventListener('change', function(e) {
        currentLang = e.target.value;
        updateContent(currentLang);
    });

    // Initial content update
    updateContent(currentLang);
});