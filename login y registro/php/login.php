<?php
include "conexion.php";

// Clase para gestionar las operaciones del usuario
    class Usuario {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // Método para verificar el login del usuario
    public function login($nombre_user, $contrasena_user) {
        $stmt = $this->pdo->prepare("SELECT * FROM usuarios WHERE nombre_user = :nombre_user");
        $stmt->execute(['nombre_user' => $nombre_user]);
        
        // Verificar si existe el usuario
        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verificar la contraseña (debe estar encriptada en la base de datos)
            if ($contrasena_user === $user['contrasena_user']) {
                return $user;  // Retorna el usuario si el login es exitoso
            } else {
                return false;  // Contraseña incorrecta
            }
        } else {
            return false; // Usuario no encontrado
        }
    }
}


// Crear una instancia de la clase Usuario
$usuarioModel = new Usuario($pdo);

// Obtener los datos del formulario (nombre de usuario y contraseña)
$nombre_user = $_POST['nombre_user']; // Campo de nombre de usuario del formulario
$contrasena_user = $_POST['contrasena_user']; // Campo de contraseña del formulario

// Intentar iniciar sesión
$user = $usuarioModel->login($nombre_user, $contrasena_user);

if ($user) {
    // Si el inicio de sesión es exitoso, se inicia una sesión y se redirige
    session_start();
    $_SESSION['nombre_user'] = $user['nombre_user'];

    echo '<script>
        alert("Inicio de sesión exitoso. Bienvenido ' . $user['nombre_user'] . '");
        window.location = "../../Menu/menu.html"; // Redirige a la página principal
    </script>';
} else {
    // Si no es exitoso, mostramos un mensaje de error y redirigimos al formulario de login
    echo '<script>
        alert("Nombre de usuario o contraseña incorrectos. Inténtalo de nuevo.");
        window.location = "../login y registro.php"; 
    </script>';
}

?>
