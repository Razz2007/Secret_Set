<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecretSet</title>
    <link rel="stylesheet" href="./css/inicio styles.css">
    <link rel="stylesheet" href="./css/loader.css">
</head>
<body>
<div class="loader-container" id="loader">
        <div class="loader"></div>
        <div class="loader-text">SECRET SET</div>
    </div>
    <video muted autoplay loop id="bg-video">
        <source src="./video/tierra inicio.mp4" type="video/mp4">
    </video>

    <h1 class="title">SECRET SET</h1>

    <div class="buttons">
        <div class="button">
            <img src="./imgs/admin.jpg" alt="Admin" class="icon">
            <span>Admin</span>
        </div>
        <div class="button">
            <img src="./imgs/usuario.jpg" alt="Usuario" class="icon">
            <span>Usuario</span>
        </div>
    </div>

    <!-- Modal para Admin -->
    <div id="admin-modal" class="modal">
        <div class="modal-content">
            <p>Si haces clic en este apartado iniciaras sesión como administrador</p>
            <a href="#"><button id="admin-ingresar" class="modal-button">Ingresar</button></a>
            <button id="admin-cancelar" class="modal-button cancel-button">Cancelar</button>
        </div>
    </div>

    <!-- Modal para Usuario -->
    <div id="user-modal" class="modal">
        <div class="modal-content">
            <p>Si haces clic en este apartado iniciaras sesión como usuario</p>
            <a href="../login y registro/login y registro.php"><button id="user-ingresar" class="modal-button">Ingresar</button></a>
            <button id="user-cancelar" class="modal-button cancel-button">Cancelar</button>
        </div>
    </div>

    <footer>
        <p>© 2024 <b>Secret Set</b> - Todos los Derechos Reservados</p>
    </footer>
    <script src="./js/scripts.js"></script>
    <script src="./js/loader.js"></script>
</body>
</html>    