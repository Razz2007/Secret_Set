document.addEventListener('DOMContentLoaded', function () {
    const translations = {
        es: {
            title: "Juego de Conjuntos",
            loader_text: "Cargando...",
            game_title: "Maestro de Conexiones",
            timer_label: "Tiempo: 03:00",
            trophy_modal_title: "¡Felicidades!",
            game_over_title: "¡Tiempo Agotado!",
            retry_button: "Reintentar",
            menu_button: "Menú Principal",
            message_correct: "¡Conexión encontrada!",
            message_wrong: "Intenta de nuevo"
        },
        en: {
            title: "Matching Game",
            loader_text: "Loading...",
            game_title: "Master of Connections",
            timer_label: "Time: 03:00",
            trophy_modal_title: "Congratulations!",
            game_over_title: "Time's Up!",
            retry_button: "Retry",
            menu_button: "Main Menu",
            message_correct: "Connection found!",
            message_wrong: "Try again"
        }
    };

    const languageSelector = document.createElement('select');
    languageSelector.id = 'langSelect';
    languageSelector.innerHTML = `
        <option value="es">Español</option>
        <option value="en">English</option>
    `;
    document.body.insertBefore(languageSelector, document.body.firstChild);

    let currentLang = localStorage.getItem('language') || 'es';
    languageSelector.value = currentLang;

    function updateContent(lang) {
        // Actualizar textos con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        // Actualizar dinámicamente el mensaje en el juego
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = '';
        }

        const timerElement = document.getElementById('timer');
        if (timerElement) {
            const timeText = translations[lang].timer_label || "Time: 03:00";
            timerElement.textContent = timeText.replace("03:00", timerElement.textContent.split(": ")[1]);
        }

        // Cambiar el idioma del documento
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        document.title = translations[lang].title;
    }

    languageSelector.addEventListener('change', function () {
        currentLang = this.value;
        updateContent(currentLang);
    });

    updateContent(currentLang);

});
