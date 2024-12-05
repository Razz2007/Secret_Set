document.addEventListener('DOMContentLoaded', function() {
    const translations = {
        "es": {
       
        },
        "en": {
          
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










