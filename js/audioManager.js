document.addEventListener('DOMContentLoaded', () => {
    // ===== SISTEMA DE AUDIO =====
    const efectoAudio = document.getElementById("efectoAudio");
    const musicaAudio = document.getElementById("musicaAudio");

    if (efectoAudio && musicaAudio) {
        // Configuración básica de audio
        efectoAudio.loop = true;
        musicaAudio.loop = true;

        // Recuperar y establecer volúmenes
        const musicVolume = localStorage.getItem('musicVolume') || 50;
        const effectsVolume = localStorage.getItem('effectsVolume') || 50;
        
        musicaAudio.volume = musicVolume / 100;
        efectoAudio.volume = effectsVolume / 100;

        // Reproducir audio inmediatamente si el volumen no es 0
        function playAudio() {
            if (musicVolume > 0) {
                musicaAudio.play()
                    .catch(e => console.log("Error reproduciendo música:", e));
            }
            if (effectsVolume > 0) {
                efectoAudio.play()
                    .catch(e => console.log("Error reproduciendo efectos:", e));
            }
        }

        // Intentar reproducir automáticamente al cargar la página
        playAudio();

        // Intentar reproducir con el primer clic si no se pudo reproducir automáticamente
        document.body.addEventListener('click', function initAudio() {
            playAudio();
            document.body.removeEventListener('click', initAudio);
        }, { once: true });

        // Intentar reproducir automáticamente cuando la página ha terminado de cargar
        window.addEventListener('load', playAudio);
    }
    class AudioManager {
        constructor() {
            if (AudioManager.instance) {
                return AudioManager.instance;
            }
            AudioManager.instance = this;
            this.musicaAudio = new Audio('./musica/Efectos.mp3');
            this.efectoAudio = new Audio('./musica/fondo.mp3');  
            // Configuración inicial
            this.musicaAudio.loop = true;
            this.efectoAudio.loop = true;    
            // Restaurar volúmenes guardados
            const musicVolume = localStorage.getItem('musicVolume') || 50;
            const effectsVolume = localStorage.getItem('effectsVolume') || 50;
            
            this.musicaAudio.volume = musicVolume / 100;
            this.efectoAudio.volume = effectsVolume / 100;
            
            // Bandera para controlar si la música está iniciada
            this.isInitialized = false;
        }
        initializeAudio() {
            if (!this.isInitialized) {
                const promise1 = this.musicaAudio.play().catch(e => console.log("Autoplay prevented"));
                const promise2 = this.efectoAudio.play().catch(e => console.log("Autoplay prevented"));
                this.isInitialized = true;
            }
        }
        setMusicVolume(volume) {
            this.musicaAudio.volume = volume / 100;
            localStorage.setItem('musicVolume', volume);
        }
        setEffectsVolume(volume) {
            this.efectoAudio.volume = volume / 100;
            localStorage.setItem('effectsVolume', volume);
        }
        turnOff() {
            this.musicaAudio.pause();
            this.efectoAudio.pause();
            this.setMusicVolume(0);
            this.setEffectsVolume(0);
        }
        turnOn() {
            this.setMusicVolume(100);
            this.setEffectsVolume(100);
            this.musicaAudio.play();
            this.efectoAudio.play();
        }
    }
    // Crear instancia global
    window.audioManager = new AudioManager();
});