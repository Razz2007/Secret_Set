const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
    console.log("Conectado al servidor WebSocket");
};

socket.onclose = (event) => {
    if (event.wasClean) {
        console.log("Conexión cerrada limpiamente por el cliente");
    } else {
        console.log("Conexión cerrada por el servidor o debido a un error");
    }
};

socket.onerror = (error) => {
    console.error("Error en la conexión WebSocket:", error);
};

socket.onmessage = (event) => {
    try {
        let data = JSON.parse(event.data);
        
        let text = document.createElement("div");
        text.classList.add("other");
        text.innerText = data.message;

        document.getElementById("messages").appendChild(text);
    } catch (e) {
        console.error("Error al analizar el mensaje:", e);
    }
};

// Función para enviar un mensaje si la conexión está abierta
function sendMessage() {
    const messageInput = document.getElementById("messageInput"); // Corregido para usar el ID correcto
    let message = messageInput.value;
    messageInput.value = "";

    // Añadir el mensaje propio a la interfaz
    let text = document.createElement("div");
    text.classList.add("me");
    text.innerText = message;
    document.getElementById("messages").appendChild(text);

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ message }));
    } else {
        console.warn("No se pudo enviar el mensaje. WebSocket no está conectado.");
    }
}

// Evento al hacer clic en el botón de envío
document.getElementById("send").addEventListener("click", sendMessage);

// Cierra la conexión de WebSocket cuando el usuario cierra la pestaña
window.onbeforeunload = () => {
    socket.close();
};
