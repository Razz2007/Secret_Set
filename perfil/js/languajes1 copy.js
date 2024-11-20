const translations = {
    "es": {
        "profile_title": "Perfil de Jugador - Teoría de Conjuntos",
        "back_button": "Volver",
        "level_badge": "Nivel",
        "player_name": "Estudiante",
        "player_rank": "Novato en Conjuntos",
        "status_badge": "En línea",
        "completed_exercises": "Ejercicios Completados",
        "solved_problems": "Problemas Resueltos",
        "study_time": "Tiempo total de estudio",
        "trophies_won": "Trofeos ganados 🏆",
        "progress_to_next_level": "Progreso al Siguiente Nivel",
        "xp_progress": "0 / 1000 XP",
        "achievements_to_unlock": "Logros por Desbloquear",
        "achievement_union": "Unión Perfecta",
        "achievement_union_desc": "Completa 5 ejercicios de unión de conjuntos",
        "achievement_intersection": "Maestro de Intersección",
        "achievement_intersection_desc": "Resuelve 10 problemas de intersección",
        "achievement_subsets": "Subconjuntos Experto",
        "achievement_subsets_desc": "Identifica correctamente 15 subconjuntos",
        "achievement_empty_set": "Vacío Perfecto",
        "achievement_empty_set_desc": "Identifica 5 conjuntos vacíos"
    },
    "en": {
        "profile_title": "Player Profile - Set Theory",
        "back_button": "Back",
        "level_badge": "Level",
        "player_name": "Student",
        "player_rank": "Novice in Sets",
        "status_badge": "Online",
        "completed_exercises": "Completed Exercises",
        "solved_problems": "Solved Problems",
        "study_time": "Total Study Time",
        "trophies_won": "Trophies Won 🏆",
        "progress_to_next_level": "Progress to Next Level",
        "xp_progress": "0 / 1000 XP",
        "achievements_to_unlock": "Achievements to Unlock",
        "achievement_union": "Perfect Union",
        "achievement_union_desc": "Complete 5 union exercises",
        "achievement_intersection": "Intersection Master",
        "achievement_intersection_desc": "Solve 10 intersection problems",
        "achievement_subsets": "Subset Expert",
        "achievement_subsets_desc": "Correctly identify 15 subsets",
        "achievement_empty_set": "Perfect Empty",
        "achievement_empty_set_desc": "Identify 5 empty sets"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('langSelect');
    const changeLanguage = (lang) => {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = translations[lang][key] || el.textContent;
        });
    };

    langSelect.addEventListener('change', () => {
        const selectedLang = langSelect.value;
        localStorage.setItem('language', selectedLang);
        changeLanguage(selectedLang);
    });

    const savedLang = localStorage.getItem('language') || 'es';
    langSelect.value = savedLang;
    changeLanguage(savedLang);
});
