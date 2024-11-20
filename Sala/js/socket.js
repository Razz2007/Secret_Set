const palabrasProhibidas = [
    'puta', 'mierda', 'pendejo', 'idiota', 'estupido', 'imbecil', 'carajo',
    'verga', 'puto', 'hijo de puta', 'maldito', 'joder', 'coño'
    // Añade más palabras según sea necesario
];

// Función para censurar palabras
function censurarPalabras(texto) {
    let textoprocesado = texto.toLowerCase();
    
    palabrasProhibidas.forEach(palabra => {
        const regex = new RegExp(palabra, 'gi');
        textoprocessado = textoProcessado.replace(regex, '*'.repeat(palabra.length));
    });
    
    return textoprocessado;
}

// Configuración del WebSocket
const username = "<?php echo $_SESSION['nombre_user']; ?>";
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
    console.log("Conectado al servidor WebSocket");
    
    // Notificar que un nuevo usuario se ha unido
    socket.send(JSON.stringify({
        type: 'join',
        user: username
    }));
};

socket.onclose = (event) => {
    if (event.wasClean) {
        console.log("Conexión cerrada limpiamente");
    } else {
        console.log("Conexión interrumpida");
    }
};

socket.onerror = (error) => {
    console.error("Error en la conexión WebSocket:", error);
};

socket.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data);
        
        // Manejar diferentes tipos de mensajes
        switch(data.type) {
            case 'message':
                mostrarMensaje(data.user, data.message, data.user === username);
                break;
            case 'join':
                mostrarNotificacion(`${data.user} se ha unido al chat`);
                break;
            case 'leave':
                mostrarNotificacion(`${data.user} ha abandonado el chat`);
                break;
        }
    } catch (e) {
        console.error("Error al procesar mensaje:", e);
    }
};

// Función para mostrar mensajes en el chat
function mostrarMensaje(usuario, mensaje, esPropio) {
    const mensajeCensurado = censurarPalabras(mensaje);
    const contenedorMensajes = document.getElementById("messages");
    
    const elementoMensaje = document.createElement("div");
    elementoMensaje.classList.add(esPropio ? "me" : "other");
    
    // Añadir timestamp
    const timestamp = new Date().toLocaleTimeString();
    
    elementoMensaje.innerHTML = `
        <div class="message-header">
            <strong>${usuario}</strong>
            <span class="timestamp">${timestamp}</span>
        </div>
        <div class="message-content">${mensajeCensurado}</div>
    `;
    
    contenedorMensajes.appendChild(elementoMensaje);
    contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
}

// Función para mostrar notificaciones del sistema
function mostrarNotificacion(mensaje) {
    const contenedorMensajes = document.getElementById("messages");
    const notificacion = document.createElement("div");
    notificacion.classList.add("system-message");
    notificacion.textContent = mensaje;
    contenedorMensajes.appendChild(notificacion);
    contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
}

// Manejar el envío de mensajes
function enviarMensaje() {
    const messageInput = document.getElementById("messageInput");
    const mensaje = messageInput.value.trim();
    
    if (mensaje === "") return;
    
    // Limpiar el input
    messageInput.value = "";
    
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            type: 'message',
            user: username,
            message: mensaje
        }));
    } else {
        console.warn("No se pudo enviar el mensaje. WebSocket no está conectado.");
    }
}

// Event listeners
document.getElementById("send").addEventListener("click", enviarMensaje);
document.getElementById("messageInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        enviarMensaje();
    }
});

// Manejar el cierre de la ventana
window.onbeforeunload = () => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            type: 'leave',
            user: username
        }));
    }
    socket.close();
};