document.addEventListener("DOMContentLoaded", function() {
    // Variables para configuración de música
    const configBtn = document.getElementById("configBtn");
    const configModal = document.getElementById("configModal");
    const closeBtn = document.querySelector(".close");

    const effectsVolume = document.getElementById("effectsVolume");
    const effectsValue = document.getElementById("effectsValue");

    const musicVolume = document.getElementById("musicVolume");
    const musicValue = document.getElementById("musicValue");

    const efectoAudio = document.getElementById("efectoAudio");
    const musicaAudio = document.getElementById("musicaAudio");

    const turnOffBtn = document.getElementById("turnOffBtn");
    const turnOnBtn = document.getElementById("turnOnBtn");

    // Configuración inicial de audio
    musicaAudio.loop = true;
    efectoAudio.loop = true;

    // Cargar valores guardados o usar valores por defecto
    const savedMusicVolume = localStorage.getItem('musicVolume') || 50;
    const savedEffectsVolume = localStorage.getItem('effectsVolume') || 50;

    musicVolume.value = savedMusicVolume;
    effectsVolume.value = savedEffectsVolume;
    musicValue.textContent = savedMusicVolume;
    effectsValue.textContent = savedEffectsVolume;
    
    musicaAudio.volume = savedMusicVolume / 100;
    efectoAudio.volume = savedEffectsVolume / 100;

    // Mostrar modal al hacer clic en Configuración
    configBtn.addEventListener("click", function() {
        configModal.style.display = "flex";
        reproducirMusica();
        reproducirEfecto();
    });

    // Cerrar modal al hacer clic en la X
    closeBtn.addEventListener("click", function() {
        configModal.style.display = "none";
    });

    // Apagar música y efectos
    turnOffBtn.addEventListener("click", function() {
        musicaAudio.pause();
        efectoAudio.pause();
        // Establecer volúmenes a 0
        musicVolume.value = 0;
        effectsVolume.value = 0;
        musicValue.textContent = 0;
        effectsValue.textContent = 0;
        musicaAudio.volume = 0;
        efectoAudio.volume = 0;
        // Guardar valores
        localStorage.setItem('musicVolume', 0);
        localStorage.setItem('effectsVolume', 0);
    });

    // Encender música y efectos
    turnOnBtn.addEventListener("click", function() {
        // Establecer volúmenes a 100
        musicVolume.value = 100;
        effectsVolume.value = 100;
        musicValue.textContent = 100;
        effectsValue.textContent = 100;
        musicaAudio.volume = 1;
        efectoAudio.volume = 1;
        // Guardar valores
        localStorage.setItem('musicVolume', 100);
        localStorage.setItem('effectsVolume', 100);
        musicaAudio.play();
        efectoAudio.play();
    });

    // Función para reproducir los efectos y música al iniciar
    function reproducirEfecto() {
        efectoAudio.volume = effectsVolume.value / 100;
        efectoAudio.play().catch(error => {
            console.log("Error al reproducir efecto:", error);
        });
    }

    function reproducirMusica() {
        musicaAudio.volume = musicVolume.value / 100;
        musicaAudio.play().catch(error => {
            console.log("Error al reproducir música:", error);
        });
    }

    // Intentar reproducir automáticamente al cargar la página
    reproducirMusica();
    reproducirEfecto();

    // Intentar reproducir automáticamente cuando la página ha terminado de cargar
    window.addEventListener('load', () => {
        reproducirMusica();
        reproducirEfecto();
    });

    // Actualización de volumen en tiempo real
    effectsVolume.addEventListener("input", function() {
        effectsValue.textContent = effectsVolume.value;
        efectoAudio.volume = effectsVolume.value / 100;
        localStorage.setItem('effectsVolume', effectsVolume.value);
    });

    musicVolume.addEventListener("input", function() {
        musicValue.textContent = musicVolume.value;
        musicaAudio.volume = musicVolume.value / 100;
        localStorage.setItem('musicVolume', musicVolume.value);
    });

    // Funciones para el selector de idioma
    const languageBtn = document.querySelector(".language-btn");
    const accordionContent = document.querySelector(".accordion-content");

    languageBtn.addEventListener("click", function() {
        languageBtn.classList.toggle("active");
        if (accordionContent.style.display === "block") {
            accordionContent.style.display = "none";
        } else {
            accordionContent.style.display = "block";
        }
    });

    // Cierra el acordeón si se hace clic fuera de él
    document.addEventListener("click", function(event) {
        if (!languageBtn.contains(event.target) && !accordionContent.contains(event.target)) {
            accordionContent.style.display = "none";
            languageBtn.classList.remove("active");
        }
    });

    // Agregar evento al botón "Inicio" para navegar a modos de juego
    const inicioBtn = document.querySelector(".menu a[href='./modos de juego.html']");
    if (inicioBtn) {
        inicioBtn.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = './modos de juego.html';
        });
    }
});

