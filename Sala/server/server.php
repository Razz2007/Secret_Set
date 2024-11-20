<?php

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

require __DIR__ . '/vendor/autoload.php';

class Chat implements MessageComponentInterface
{
    protected SplObjectStorage $clients;

    public function __construct()
    {
        $this->clients = new SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn)
    {
        // Almacena la nueva conexión para enviarle mensajes más adelante
        $this->clients->attach($conn);
        echo "Nueva conexión! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        // Decodificar el mensaje recibido
        $data = json_decode($msg, true);

        // Asegurarse de que contiene tanto el usuario como el mensaje
        if (isset($data['user']) && isset($data['message'])) {
            $user = $data['user'];
            $message = $data['message'];

            // Enviar el mensaje a todos los clientes excepto al remitente
            foreach ($this->clients as $client) {
                if ($from !== $client) {
                    $client->send(json_encode([
                        'user' => $user,
                        'message' => $message
                    ]));
                }
            }

            echo "Mensaje enviado por {$user}: {$message}\n";
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        // Cuando se cierra la conexión, se elimina
        $this->clients->detach($conn);
        echo "Conexión {$conn->resourceId} desconectada\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "Ocurrió un error: {$e->getMessage()}\n";
        $conn->close();
    }
}

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    ),
    8080
);

$server->run();
