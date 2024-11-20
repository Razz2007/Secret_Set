function initializeLevelMap() {
    const levels = document.querySelectorAll('.button a');

    levels.forEach((levelLink, index) => {
        const levelNumber = index + 1;
        const isUnlocked = localStorage.getItem(`level${levelNumber}Unlocked`) === 'true';

        if (!isUnlocked && levelNumber > 1) {
            // Desactivamos el enlace o añadimos el icono de bloqueo
            levelLink.style.pointerEvents = 'none';
            levelLink.classList.add('locked');

            // Opcional: Añadir superposición de bloqueo
            const lockOverlay = document.createElement('div');
            lockOverlay.classList.add('lock-overlay');
            lockOverlay.innerHTML = '🔒';
            levelLink.parentElement.appendChild(lockOverlay);
        } else {
            // Si está desbloqueado, eliminar la clase 'locked' y la superposición de bloqueo (si existe)
            levelLink.classList.remove('locked');
            const lockOverlay = levelLink.parentElement.querySelector('.lock-overlay');
            if (lockOverlay) {
                lockOverlay.remove();
            }
        }
    });
}

// Aseguramos que el primer nivel siempre esté desbloqueado
if (!localStorage.getItem('level1Unlocked')) {
    localStorage.setItem('level1Unlocked', 'true');
}

// Llamar la función para asegurarse de que el mapa esté actualizado cada vez que se cargue
window.onload = initializeLevelMap;
