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
    languageSelector.innerHTML = 
        `<option value="es">Español</option>
        <option value="en">English</option>`;
    document.body.insertBefore(languageSelector, document.body.firstChild);

    let currentLang = localStorage.getItem('language') || 'es';
    languageSelector.value = currentLang;

    // Global functions for HTML onclick events
    window.returnToMenu = function() {
        window.location.href = '../mapas/mapa5.html';
    }

    window.restartGame = function() {
        // Reset game variables
        selectedCards = [];
        matchedPairs = [];
        timeLeft = 180;
        
        // Hide modals
        document.getElementById('trophyModal').style.display = 'none';
        document.getElementById('gameOverModal').style.display = 'none';
        
        // Clear messages
        document.getElementById('message').textContent = '';
        
        // Recreate game board
        createGameBoard();
    }

    function updateContent(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = '';
        }

        const timerElement = document.getElementById('timer');
        if (timerElement) {
            const timeText = translations[lang].timer_label || "Time: 03:00";
            timerElement.textContent = timeText.replace("03:00", timerElement.textContent.split(': ')[1]);
        }

        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        document.title = translations[lang].title;
    }

    languageSelector.addEventListener('change', function () {
        currentLang = this.value;
        updateContent(currentLang);
        createGameBoard();
    });

    updateContent(currentLang);

    const connections = [
        { left_es: 'Gato', left_en: 'Cat', right_es: 'Ratón', right_en: 'Mouse' },
        { left_es: 'Libro', left_en: 'Book', right_es: 'Biblioteca', right_en: 'Library' },
        { left_es: 'Sol', left_en: 'Sun', right_es: 'Planeta', right_en: 'Planet' },
        { left_es: 'Zapato', left_en: 'Shoe', right_es: 'Pie', right_en: 'Foot' },
        { left_es: 'Árbol', left_en: 'Tree', right_es: 'Bosque', right_en: 'Forest' },
        { left_es: 'Cuchillo', left_en: 'Knife', right_es: 'Cocina', right_en: 'Kitchen' },
        { left_es: 'Luna', left_en: 'Moon', right_es: 'Noche', right_en: 'Night' },
        { left_es: 'Pluma', left_en: 'Pen', right_es: 'Escritura', right_en: 'Writing' },
        { left_es: 'Agua', left_en: 'Water', right_es: 'Mar', right_en: 'Sea' },
        { left_es: 'Martillo', left_en: 'Hammer', right_es: 'Clavo', right_en: 'Nail' }
    ];

    function getTranslatedConnections(lang) {
        return connections.map(connection => ({
            left: connection[`left_${lang}`],
            right: connection[`right_${lang}`]
        }));
    }

    let selectedCards = [];
    let matchedPairs = [];
    let timeLeft = 180;
    let timerInterval;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createGameBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';

        const translatedConnections = getTranslatedConnections(currentLang);

        const allElements = [
            ...translatedConnections.map(c => c.left),
            ...translatedConnections.map(c => c.right)
        ];

        const shuffledElements = shuffleArray(allElements);

        shuffledElements.forEach(element => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.textContent = element;
            card.dataset.value = element;
            card.addEventListener('click', () => selectCard(card));
            gameBoard.appendChild(card);
        });

        startTimer();
    }

    function selectCard(card) {
        if (card.classList.contains('matched')) return;

        card.classList.toggle('selected');

        if (selectedCards.includes(card)) {
            selectedCards = selectedCards.filter(c => c !== card);
        } else {
            selectedCards.push(card);
        }

        if (selectedCards.length === 2) {
            checkConnection();
        }
    }

    function checkConnection() {
        const [card1, card2] = selectedCards;
        const value1 = card1.dataset.value;
        const value2 = card2.dataset.value;

        const translatedConnections = getTranslatedConnections(currentLang);

        const connection = translatedConnections.find(
            c => (c.left === value1 && c.right === value2) || 
                 (c.right === value1 && c.left === value2)
        );

        const messageElement = document.getElementById('message');

        if (connection) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs.push(connection);
            messageElement.textContent = translations[currentLang].message_correct;
            messageElement.style.color = 'green';
        } else {
            messageElement.textContent = translations[currentLang].message_wrong;
            messageElement.style.color = 'red';
        }

        selectedCards.forEach(card => card.classList.remove('selected'));
        selectedCards = [];

        if (matchedPairs.length === connections.length) {
            clearInterval(timerInterval);
            showTrophyModal();
        }
    }

    function startTimer() {
        const timerElement = document.getElementById('timer');
        timerInterval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${translations[currentLang].timer_label.split(':')[0]}: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showGameOverModal();
            }
        }, 1000);
    }

    function showTrophyModal() {
        const modal = document.getElementById('trophyModal');
        const trophies = document.querySelectorAll('.trophy');
        
        let activeTrophies = 0;
        if (timeLeft > 120) activeTrophies = 3;
        else if (timeLeft > 60) activeTrophies = 2;
        else if (timeLeft > 0) activeTrophies = 1;

        trophies.forEach((trophy, index) => {
            if (index < activeTrophies) {
                trophy.classList.add('active');
            } else {
                trophy.classList.remove('active');
            }
        });

        modal.style.display = 'flex';
    }

    function showGameOverModal() {
        const modal = document.getElementById('gameOverModal');
        modal.style.display = 'flex';
    }

    createGameBoard();
});