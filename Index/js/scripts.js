// Obtener elementos
        const adminButton = document.querySelector('.button:nth-child(1)');
        const userButton = document.querySelector('.button:nth-child(2)');
        const adminModal = document.getElementById('admin-modal');
        const userModal = document.getElementById('user-modal');
        const adminCancelar = document.getElementById('admin-cancelar');
        const userCancelar = document.getElementById('user-cancelar');

        // Mostrar modal al hacer clic en el botón Admin
        adminButton.addEventListener('click', () => {
            adminModal.style.display = 'flex';
        });

        // Mostrar modal al hacer clic en el botón Usuario
        userButton.addEventListener('click', () => {
            userModal.style.display = 'flex';
        });

        // Cerrar modal al hacer clic en el botón Cancelar en Admin
        adminCancelar.addEventListener('click', () => {
            adminModal.style.display = 'none';
        });

        // Cerrar modal al hacer clic en el botón Cancelar en Usuario
        userCancelar.addEventListener('click', () => {
            userModal.style.display = 'none';
        });

        // Evitar que el modal se cierre al hacer clic fuera de él
        window.addEventListener('click', (event) => {
            if (event.target === adminModal || event.target === userModal) {
                event.stopPropagation();
            }
        });

    document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');

    const registerForm = document.getElementById('register-form');
    const registerButton = document.getElementById('register-button');

    const changePasswordForm = document.getElementById('change-password-form');
    const changePasswordButton = document.getElementById('change-password-button');

    const validateForm = document.getElementById('validate-form');
    const validateButton = document.getElementById('validate-button');

    function validateFormFields(form, button) {
        const inputs = form.querySelectorAll('input');
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value) {
                allFilled = false;
            }
        });

        button.disabled = !allFilled;
    }

    if (loginForm) {
        loginForm.addEventListener('input', function() {
            validateFormFields(loginForm, loginButton);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('input', function() {
            validateFormFields(registerForm, registerButton);
        });
    }

    if (changePasswordForm) {
        changePasswordForm.addEventListener('input', function() {
            validateFormFields(changePasswordForm, changePasswordButton);
        });
    }

    if (validateForm) {
        validateForm.addEventListener('input', function() {
            validateFormFields(validateForm, validateButton);
        });
    }

    // Resend code button logic
    const resendButton = document.getElementById('resend-code');
    if (resendButton) {
        resendButton.addEventListener('click', function() {
            alert('Código reenviado al email.');
        });
    }

    // Cancel recover password process
    const cancelRecoverButton = document.getElementById('cancel-recover');
    if (cancelRecoverButton) {
        cancelRecoverButton.addEventListener('click', function() {
            window.location.href = 'login.php';
        });
    }    
});
