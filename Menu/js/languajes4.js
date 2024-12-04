document.addEventListener('DOMContentLoaded', function() {
    const translations = {
        "es": {
            "title": "Juego de Conjuntos",
            "loader_text": "SECRET SET",
            "loader_gif_alt": "Imagen gif",
            "instructions_title": "¿Cómo Jugar?",
            "instruction_1": "Resuelve problemas de conjuntos seleccionando los números correctos según la operación pedida",
            "instruction_2": "Haz clic en los números para seleccionarlos o deseleccionarlos de tu respuesta",
            "instruction_3": "Gana trofeos por cada respuesta correcta:\n🏆 3 respuestas correctas: 3 trofeos\n🏆 2 respuestas correctas: 2 trofeos\n🏆 1 respuesta correcta: 1 trofeo",
            "instruction_4": "Aprenderás sobre:\n• Intersección (∩)\n• Unión (∪)\n• Diferencia (-)",
            "start_game_button": "¡Empezar a Jugar!",
            "game_over_title": "¡Fin del Juego!",
            "finished_button": "Haz Terminado",
            "retry_title": "¡Necesitas Practicar Más!",
            "retry_message": "No has conseguido ningún trofeo. ¡No te rindas!",
            "retry_button": "Reintentar",
            "menu_button": "Menú Principal",
            "level_label": "Nivel:",
            "correct_count_label": "Correctas:",
            "set_a_label": "Conjunto A",
            "set_b_label": "Conjunto B",
            "your_answer_label": "Tu Respuesta",
            "check_answer_button": "Comprobar Respuesta"
        },
        "en": {
            "title": "Set Game",
            "loader_text": "SECRET SET",
            "loader_gif_alt": "Gif image",
            "instructions_title": "How to Play?",
            "instruction_1": "Solve set problems by selecting the correct numbers according to the given operation",
            "instruction_2": "Click on the numbers to select or deselect them from your answer",
            "instruction_3": "Win trophies for each correct answer:\n🏆 3 correct answers: 3 trophies\n🏆 2 correct answers: 2 trophies\n🏆 1 correct answer: 1 trophy",
            "instruction_4": "You will learn about:\n• Intersection (∩)\n• Union (∪)\n• Difference (-)",
            "start_game_button": "Start Playing!",
            "game_over_title": "Game Over!",
            "finished_button": "You're Done",
            "retry_title": "You Need More Practice!",
            "retry_message": "You didn't get any trophies. Don't give up!",
            "retry_button": "Retry",
            "menu_button": "Main Menu",
            "level_label": "Level:",
            "correct_count_label": "Correct:",
            "set_a_label": "Set A",
            "set_b_label": "Set B",
            "your_answer_label": "Your Answer",
            "check_answer_button": "Check Answer"
        }
    };

    const languageSelector = document.createElement('div');
    languageSelector.className = 'language-selector';
    languageSelector.style.cssText = 'position: absolute; top: 10px; right: 10px; z-index: 1000;';
    languageSelector.innerHTML = `
        <select id="langSelect">
            <option value="es">Español</option>
            <option value="en">English</option>
        </select>
    `;
    document.body.insertBefore(languageSelector, document.body.firstChild);

    const currentLang = localStorage.getItem('language') || 'es';
    document.getElementById('langSelect').value = currentLang;

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

        // Update page title
        document.title = translations[lang]['title'];

        // Save language preference
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        // Dispatch language change event
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }

    // Language change event listener
    document.getElementById('langSelect').addEventListener('change', function(e) {
        updateContent(e.target.value);
    });

    // Initial content update
    updateContent(currentLang);
});










