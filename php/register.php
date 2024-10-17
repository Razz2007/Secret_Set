<?php
// Incluir el archivo de conexión
include "conexion.php";

// Clase para gestionar las operaciones del usuario
class Usuario {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // Método para registrar un nuevo usuario
    public function registrar($nombre_user, $email_user, $contrasena_user) {
        // Verificar si el nombre de usuario ya existe
        $stmt = $this->pdo->prepare("SELECT * FROM usuarios WHERE nombre_user = :nombre_user OR email_user = :email_user");
        $stmt->execute([
            'nombre_user' => $nombre_user,
            'email_user' => $email_user
        ]);

        if ($stmt->rowCount() > 0) {
            return "El nombre de usuario o correo electrónico ya está en uso.";
        }

        // Encriptar la contraseña
        $hash_contrasena = $contrasena_user;

        // Insertar el nuevo usuario en la base de datos
        $stmt = $this->pdo->prepare("INSERT INTO usuarios (nombre_user, email_user, contrasena_user) VALUES (:nombre_user, :email_user, :contrasena_user)");

        if ($stmt->execute([
            'nombre_user' => $nombre_user,
            'email_user' => $email_user,
            'contrasena_user' => $hash_contrasena
        ])) {
            return "Registro exitoso";
        } else {
            return "Error al registrar el usuario";
        }
    }
}

// Crear una instancia de la clase Usuario
$usuarioModel = new Usuario($pdo);

// Obtener los datos del formulario (nombre de usuario, correo y contraseña)
$nombre_user = $_POST['nombre_user']; // Campo de nombre de usuario del formulario
$email_user = $_POST['email_user'];   // Campo de email del formulario
$contrasena_user = $_POST['contrasena_user']; // Campo de contraseña del formulario

// Intentar registrar al usuario
$resultado = $usuarioModel->registrar($nombre_user, $email_user, $contrasena_user);

if ($resultado === "Registro exitoso") {
    // Si el registro es exitoso, se redirige a la página de login
    echo '<script>
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        window.location = "../login y registro.php"; // Redirige a la página de login
    </script>';
} else {
    // Si hay un error (usuario o correo ya existente), se muestra un mensaje de error
    echo '<script>
        alert("' . $resultado . '");
        window.location = "../login y registro.php"; // Redirige de nuevo al formulario de registro
    </script>';
}

?>
