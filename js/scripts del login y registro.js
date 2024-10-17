const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnlogin-popup');
const iconClose = document.querySelector('.icon-close');
registerLink.addEventListener('click',() => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click',() => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click',() => {
    wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click',() => {
    wrapper.classList.remove('active-popup');
});

// Get modal elements
        var modalQuienes = document.getElementById("modalQuienes");
        var modalJuego = document.getElementById("modalJuego");
        var modalTeoria = document.getElementById("modalTeoria");
        var modalContact = document.getElementById("modalContact");

        // Get open buttons
        var btnQuienes = document.getElementById("openModalQuienes");
        var btnJuego = document.getElementById("openModalJuego");
        var btnTeoria = document.getElementById("openModalTeoria");
        var btnContact = document.getElementById("openModalContact");

        // Get close buttons
        var closeQuienes = document.getElementById("closeQuienes");
        var closeJuego = document.getElementById("closeJuego");
        var closeTeoria = document.getElementById("closeTeoria");
        var closeContact = document.getElementById("closeContact");

        // Event listeners to open modals
        btnQuienes.onclick = function() {
            modalQuienes.style.display = "block";
        }
        btnJuego.onclick = function() {
            modalJuego.style.display = "block";
        }
        btnTeoria.onclick = function() {
            modalTeoria.style.display = "block";
        }
        btnContact.onclick = function() {
            modalContact.style.display = "block";
        }

        // Event listeners to close modals
        closeQuienes.onclick = function() {
            modalQuienes.style.display = "none";
        }
        closeJuego.onclick = function() {
            modalJuego.style.display = "none";
        }
        closeTeoria.onclick = function() {
            modalTeoria.style.display = "none";
        }
        closeContact.onclick = function() {
            modalContact.style.display = "none";
        }

        // Close modal when clicking outside of it
        window.onclick = function(event) {
            if (event.target == modalQuienes) {
                modalQuienes.style.display = "none";
            }
            if (event.target == modalJuego) {
                modalJuego.style.display = "none";
            }
            if (event.target == modalTeoria) {
                modalTeoria.style.display = "none";
            }
            if (event.target == modalContact) {
                modalContact.style.display = "none";
            }
        }

// Función para el Login
function mostrarContrasena() {
    var passwordInput = document.getElementById("password");
    var iconEye = document.getElementById("iconEye");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        iconEye.name = "eye-off-outline";
    } else {
        passwordInput.type = "password";
        iconEye.name = "eye-outline";
    }
}

// Función para el Registro
function mostrarContrasenaRegister() {
    var passwordInput = document.getElementById("passwordRegister");
    var iconEye = document.getElementById("iconEyeRegister");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        iconEye.name = "eye-off-outline";
    } else {
        passwordInput.type = "password";
        iconEye.name = "eye-outline";
    }
}
