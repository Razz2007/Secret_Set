document.addEventListener('DOMContentLoaded', function () {
    const translations = {
        es: {
            title: "Juego de Clasificación",
            loaderText: "SECRET SET",
            timeRemaining: "Tiempo restante:",
            seconds: "segundos",
            instructionsTitle: "Instrucciones del Juego",
            instruction1: "Arrastra cada elemento a la categoría correcta.",
            instruction2: "Completa el juego antes de que el tiempo termine para ganar trofeos.",
            instruction3: "Si el elemento no pertenece a la categoría, recibirás un mensaje de error.",
            startGame: "Comenzar Juego",
            timeUp: "¡Se acabó el tiempo! Intenta de nuevo.",
            wrongItem: "¡Elemento incorrecto! Coloca el elemento en el conjunto correcto.",
            retry: "REINTENTAR",
            nextLevel: "SIGUIENTE NIVEL",
            mainMenu: "MENÚ PRINCIPAL"
        },
        en: {
            title: "Sorting Game",
            loaderText: "SECRET SET",
            timeRemaining: "Time remaining:",
            seconds: "seconds",
            instructionsTitle: "Game Instructions",
            instruction1: "Drag each item to the correct category.",
            instruction2: "Complete the game before time runs out to win trophies.",
            instruction3: "If the item doesn't belong to the category, you'll get an error message.",
            startGame: "Start Game",
            timeUp: "Time's up! Try again.",
            wrongItem: "Wrong item! Place the item in the correct set.",
            retry: "RETRY",
            nextLevel: "NEXT LEVEL",
            mainMenu: "MAIN MENU"
        }
    };

    const currentLang = localStorage.getItem('language') || 'es';
    document.getElementById('langSelect').value = currentLang;

    function updateContent(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        document.title = translations[lang].title;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        gameData.messages = {
            timeUp: translations[lang].timeUp,
            wrongItem: translations[lang].wrongItem
        };
    }

    document.getElementById('langSelect').addEventListener('change', function (e) {
        updateContent(e.target.value);
    });

    updateContent(currentLang);
});
