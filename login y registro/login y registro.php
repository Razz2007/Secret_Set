<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website With Login & Registration</title>
    <link rel="stylesheet" href="./css/styles del login y registro.css">
    <link rel="stylesheet" href="./css/loader.css">
</head>
<body>    
<div class="loader-container" id="loader">
        <div class="loader"></div>
        <div class="loader-text">SECRET SET</div>
    </div>
    <video muted autoplay loop id="bg-video">
        <source src="./video/tierra inicio.mp4" type="video/mp4">
        Tu navegador no soporta la etiqueta de video.
    </video>
    
    <header>
        <a href="../Index/inicio.php"><h2 class="logo">SecretSet</h2></a>
        <nav class="navigation">
            <a href="#" id="openModalQuienes">¿Quiénes Somos?</a>
            <a href="#" id="openModalJuego">¿De qué se trata el juego?</a>
            <a href="#" id="openModalTeoria">¿Qué es la teoría de conjuntos?</a>
            <a href="#" id="openModalContact">Contáctanos!</a>
            <button class="btnlogin-popup">Login</button>
        </nav>
    </header>
    
    <!-- Modal Structure -->
    <div id="modalQuienes" class="modal">
        <div class="modal-content">
            <span class="close" id="closeQuienes">&times;</span>
            <h2>¿Quiénes Somos?</h2>
            <p>Somos una nueva empresa llamada <b>CODEFORGE STUDIOS</b> y nuestro lema es <b>Tu Visión, Nuestro Código, Juegos Inolvidables</b>, somos 3 programadores junior desarrollando un proyecto inolvidable para la historia.</p>
            <p><b>Programadores:</b></p>
            <ul>
                <li>Juan Sebastián González - Backend-Frontend-DataBase</li>
                <li>Racinger Prada Olaya - Mockups-Figma</li>
                <li>Jhampier Santos - Documentación</li>
            </ul>
        </div>
    </div>

    <div id="modalJuego" class="modal">
        <div class="modal-content">
            <span class="close" id="closeJuego">&times;</span>
            <h2>¿De qué se trata el juego?</h2>
            <p>Un juego educativo interactivo que utiliza problemas y modos de juego dinámicos e inmersivos para ayudar a los usuarios a comprender los conceptos fundamentales de la teoría de conjuntos. El juego tiene tanto un modo historia como un modo multijugador, cada uno con sistemas de juego diseñados para mejorar la teoría de conjuntos.</p>
        </div>
    </div>

    <div id="modalTeoria" class="modal">
        <div class="modal-content">
            <span class="close" id="closeTeoria">&times;</span>
            <h2>¿Qué es la teoría de conjuntos?</h2>
            <p>La teoría general de conjuntos es una rama de la matemática que estudia las colecciones de objetos, llamados conjuntos, y las relaciones entre ellos. Fue desarrollada por Georg Cantor a finales del siglo XIX y es fundamental para muchas áreas de la matemática moderna. Los conceptos básicos incluyen elementos, pertenencia, subconjuntos, intersección, unión y complementos.</p>
        </div>
    </div>

    <div id="modalContact" class="modal">
        <div class="modal-content">
            <span class="close" id="closeContact">&times;</span>
            <h2>Contáctanos!</h2>
            <p>Si tienes alguna pregunta o inquietud, puedes contactarnos en <b>soportecodeforgestudios.dev@gmail.com</b></p>
        </div>
    </div>

    <div class="wrapper">
        <span class="icon-close">
            <ion-icon name="close-outline"></ion-icon>
        </span>
        <div class="form-box login">
            <h2>Iniciar Sesion</h2>
            <form id="form_login" method="POST" action="php/login.php">
                <div class="input-box">
                    <span class="icon">
                        <ion-icon name="person-circle-outline"></ion-icon>
                    </span>
                    <input type="text" name="nombre_user" required>
                    <label>Usuario</label>
                </div>
                <div class="input-box">
                    <span class="icon">
                        <ion-icon name="lock-closed-outline" id="iconLock"></ion-icon>
                        <ion-icon name="eye-outline" id="iconEye" onclick="mostrarContrasena()"></ion-icon>
                   </span>
                   <input type="password" id="password" name="contrasena_user" required>
                   <label>Contraseña</label>
                </div>
                <div class="remember-forgot">
                    <label><input type="checkbox">
                    Recuerdame</label>
                    <a href="#">Olvidaste tu contraseña?</a>
                </div>
                <button type="submit" class="btn" name="login" >Entrar</button>
                <div class="login-register">
                    <p>No tienes cuenta?
                        <a href="#" class="register-link">Registrate</a></p>
                </div>
            </form>
        </div> 

        <div class="form-box register">
            <h2>Registrate</h2>
            <form id="form_register" method="POST" action="php/register.php">
                <div class="input-box">
                    <span class="icon">
                        <ion-icon name="person-circle-outline"></ion-icon>
                    </span>
                    <input type="text" name="nombre_user" required>
                    <label>Nombre de usuario</label>
                </div>
                <div class="input-box">
                    <span class="icon">
                        <ion-icon name="mail-outline"></ion-icon>
                    </span>
                    <input type="email" name="email_user" required>
                    <label>Email</label>
                </div>
                <div class="input-box">
                    <span class="icon">
                        <ion-icon name="lock-closed-outline" id="iconLockRegister"></ion-icon>
                        <ion-icon name="eye-outline" id="iconEyeRegister" onclick="mostrarContrasenaRegister()"></ion-icon>
                    </span>
                    <input type="password" id="passwordRegister" name="contrasena_user" required>
                     <label>Contraseña</label>
                </div>
                <div class="remember-forgot">
                    <label><input type="checkbox" id="terms" name="terms">Acepto los términos y condiciones</label>
                </div>
                <button type="submit" class="btn" name="registro" id="register_button" >Registrate</button>
                <div class="login-register">
                    <p>Ya tienes una cuenta?
                        <a href="#" class="login-link">Inicia Sesion</a></p>
                </div>
            </form>
        </div> 
    </div>
    <script src="./js/scripts del login y registro.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <scrip nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <script src="./js/loader.js"></script>
    
     <footer>
        <p>© 2024 <b>Secret Set</b> - Todos los Derechos Reservados</p>
    </footer>

</body>
</html>
