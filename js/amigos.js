document.addEventListener('DOMContentLoaded', () => {
    const friends = [
        { name: 'Kekito2009', status: 'online' },
        { name: 'Manolita800', status: 'in-game' },
        { name: 'Terrenecitor087', status: 'offline' }
    ];

    // Función para actualizar el estado visual
    function updateFriendStatus() {
        const friendElements = document.querySelectorAll('.friend');
        friendElements.forEach((element, index) => {
            const statusElement = element.querySelector('.status');
            statusElement.classList.remove('online', 'in-game', 'offline');
            statusElement.classList.add(friends[index].status);
            if (friends[index].status === 'online') {
                statusElement.textContent = 'Conectado';
            } else if (friends[index].status === 'in-game') {
                statusElement.textContent = 'En partida';
            } else {
                statusElement.textContent = 'Desconectado';
            }
        });
    }

    updateFriendStatus();

    // Función para invitar o reservar (puedes añadir funcionalidad según necesites)
    document.querySelectorAll('.invitar').forEach(btn => {
        btn.addEventListener('click', function() {
            alert(`Has seleccionado la opción: ${this.textContent}`);
        });
    });
});
