document.addEventListener("DOMContentLoaded", function() {
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

    // Mostrar modal al hacer clic en Configuración
    configBtn.addEventListener("click", function() {
        configModal.style.display = "flex";
        reproducirMusica(); // Reproduce música al abrir el modal
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
    });

    // Encender música y efectos
    turnOnBtn.addEventListener("click", function() {
        // Establecer volúmenes a 100
        musicVolume.value = 100;
        effectsVolume.value = 100;
        musicValue.textContent = 100;
        effectsValue.textContent = 100;
        musicaAudio.volume = 1; // 1 es el 100% del volumen
        efectoAudio.volume = 1; // 1 es el 100% del volumen
        musicaAudio.play();
        efectoAudio.play();
    });

    // Función para reproducir los efectos y música al iniciar
    function reproducirEfecto() {
        efectoAudio.volume = effectsVolume.value / 100;
        efectoAudio.play();
    }

    function reproducirMusica() {
        musicaAudio.volume = musicVolume.value / 100;
        musicaAudio.play();
    }

    // Actualización de volumen en tiempo real
    effectsVolume.addEventListener("input", function() {
        effectsValue.textContent = effectsVolume.value;
        efectoAudio.volume = effectsVolume.value / 100;
    });

    musicVolume.addEventListener("input", function() {
        musicValue.textContent = musicVolume.value;
        musicaAudio.volume = musicVolume.value / 100;
    });
});


//Funcion Idiomas
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el botón de idioma y el contenido desplegable
    const languageBtn = document.querySelector(".language-btn");
    const accordionContent = document.querySelector(".accordion-content");

    // Añade un event listener para cuando se haga clic en el botón
    languageBtn.addEventListener("click", function() {
        // Alterna la clase 'active' en el botón para rotar el icono
        languageBtn.classList.toggle("active");

        // Alterna la visibilidad del menú desplegable
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
});

