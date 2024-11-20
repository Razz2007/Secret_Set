<?php
class Database {
    private $host = 'localhost';
    private $dbname = 'secret_set'; // Cambia por tu nombre de base de datos
    private $username = 'root';      // Cambia por tu usuario
    private $password = '';          // Cambia por tu contraseña
    private $charset = 'utf8';
    private $pdo;

    public function getConnection() {
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->dbname};charset={$this->charset}";
            $this->pdo = new PDO($dsn, $this->username, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->pdo;
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }
}

// Retornar la conexión
$database = new Database();
$pdo = $database->getConnection();
?>
