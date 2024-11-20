
const username = "<?php echo $_SESSION['nombre_user']; ?>"; // Variable de sesión en PHP

const sendButton = document.getElementById('send');
const messageInput = document.getElementById('messageInput');
const messages = document.getElementById('messages');
const playerList = document.getElementById('playerList');

sendButton.addEventListener('click', () => {
    const messageText = messageInput.value;
    if (messageText.trim() !== '') {
        // Muestra el mensaje con el nombre de usuario
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${username}:</strong> ${messageText}`;
        messages.appendChild(messageElement);

        messageInput.value = ''; // Limpia el campo de entrada
    }
});