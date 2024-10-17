document.addEventListener('DOMContentLoaded', () => {
    const friends = [
        { name: 'Kekito2009', status: 'online' },
        { name: 'Manolita800', status: 'in-game' },
        { name: 'Terrenecitor087', status: 'offline' }
    ];

    const friendsList = document.querySelector('.friends-list');

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

    // Función para invitar o reservar
    document.querySelectorAll('.invitar').forEach(btn => {
        btn.addEventListener('click', function() {
            alert(`Has seleccionado la opción: ${this.textContent}`);
        });
    });

    // Abrir modal para agregar amigos
    const modal = document.getElementById('addFriendModal');
    const addFriendIcon = document.querySelector('.add-friend-icon');
    const closeModal = document.querySelector('.close-modal');

    addFriendIcon.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Simulación de búsqueda de amigos
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');

    searchBtn.addEventListener('click', () => {
        const friendName = document.getElementById('searchFriend').value;
        if (friendName) {
            searchResults.innerHTML = `
                <li>
                    <div class="friend" data-name="${friendName}">
                        <img src="./imgs/1.jpg" alt="Avatar de ${friendName}">
                        <span class="amigo-name">${friendName}</span>
                        <button class="add-friend-btn">Agregar</button>
                    </div>
                </li>
            `;
            // Añadir funcionalidad al botón de agregar
            document.querySelector('.add-friend-btn').addEventListener('click', () => {
                addFriend(friendName);
                modal.style.display = 'none'; // Cerrar el modal después de agregar
            });
        } else {
            searchResults.innerHTML = '<li>No se encontraron resultados</li>';
        }
    });

    // Función para agregar un amigo a la lista principal de amigos
    function addFriend(friendName) {
        const newFriendHTML = `
            <div class="friend">
                <img src="./imgs/1.jpg" alt="Avatar de ${friendName}">
                <span class="amigo-name">${friendName}</span>
                <span class="status offline">Desconectado</span>
                <img class="eliminar" src="./imgs/eliminar.png" alt="Eliminar">
            </div>
        `;
        friendsList.innerHTML += newFriendHTML;

        // Añadir funcionalidad al botón de eliminar para el nuevo amigo
        const newFriendElement = friendsList.lastElementChild;
        newFriendElement.querySelector('.eliminar').addEventListener('click', function() {
            newFriendElement.remove();
        });
    }

    // Función para eliminar amigos
    document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', function() {
            const friendElement = this.closest('.friend');
            friendElement.remove();
        });
    });
});


