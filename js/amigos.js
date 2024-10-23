    // ===== CÓDIGO ORIGINAL DE AMIGOS =====
    const friends = [
        { name: 'Kekito2009', status: 'online' },
        { name: 'Manolita800', status: 'in-game' },
        { name: 'Terrenecitor087', status: 'offline' }
    ];
    const friendsList = document.querySelector('.friends-list');
    const requestList = document.getElementById('request-list');
    function updateFriendStatus() {
        const friendElements = document.querySelectorAll('.friend');
        friendElements.forEach((element, index) => {
            const statusElement = element.querySelector('.status');
            if (statusElement && friends[index]) {
                statusElement.classList.remove('online', 'in-game', 'offline');
                statusElement.classList.add(friends[index].status);
                if (friends[index].status === 'online') {
                    statusElement.textContent = 'Conectado';
                } else if (friends[index].status === 'in-game') {
                    statusElement.textContent = 'En partida';
                } else {
                    statusElement.textContent = 'Desconectado';
                }
            }
        });
    }
    updateFriendStatus();
    // Invitar amigos
    document.querySelectorAll('.invitar').forEach(btn => {
        btn.addEventListener('click', function() {
            alert(`Has seleccionado la opción: ${this.textContent}`);
        });
    });

    // Modal de agregar amigos
    const modal = document.getElementById('addFriendModal');
    const addFriendIcon = document.querySelector('.add-friend-icon');
    const closeModal = modal?.querySelector('.close-modal');

    if (addFriendIcon && modal) {
        addFriendIcon.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    // Búsqueda de amigos
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');

    if (searchBtn && searchResults) {
        searchBtn.addEventListener('click', () => {
            const friendName = document.getElementById('searchFriend')?.value.trim();
            if (friendName) {
                const existingFriends = friends.map(friend => friend.name);
                if (!existingFriends.includes(friendName)) {
                    searchResults.innerHTML = `
                        <li>
                            <div class="friend" data-name="${friendName}">
                                <img src="./imgs/1.jpg" alt="Avatar de ${friendName}">
                                <span class="amigo-name">${friendName}</span>
                                <button class="add-friend-btn">Agregar</button>
                            </div>
                        </li>
                    `;
                    const addBtn = document.querySelector('.add-friend-btn');
                    if (addBtn) {
                        addBtn.addEventListener('click', () => {
                            addFriend(friendName);
                            addFriendRequest(friendName);
                            modal.style.display = 'none';
                        });
                    }
                } else {
                    searchResults.innerHTML = '<li>Este amigo ya está en tu lista.</li>';
                }
            } else {
                searchResults.innerHTML = '<li>No se encontraron resultados</li>';
            }
        });
    }
    // Modal de solicitudes
    const solicitudModal = document.getElementById('solicitudModal2');
    const solicitudIcon = document.getElementById('openSolicitudModal');

    if (solicitudIcon && solicitudModal) {
        solicitudIcon.addEventListener('click', () => {
            solicitudModal.style.display = 'block';
            loadFriendRequests();
        });

        const closeSolicitudModal = solicitudModal.querySelector('.close-modal');
        if (closeSolicitudModal) {
            closeSolicitudModal.addEventListener('click', () => {
                solicitudModal.style.display = 'none';
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target === solicitudModal) {
                solicitudModal.style.display = 'none';
            }
        });
    }
    function addFriend(friendName) {
            const newFriendHTML = `
            <div class="friend">
                <img src="./imgs/1.jpg" alt="Avatar de ${friendName}">
                <span class="amigo-name">${friendName}</span>
                <span class="status in-game">En partida</span>
                <button class="invitar">Invitar</button>
                <img class="eliminar" src="./imgs/eliminar.png" alt="Eliminar">
            </div>
        `;
        friendsList.innerHTML += newFriendHTML;

        const newFriendElement = friendsList.lastElementChild;
        if (newFriendElement) {
            const deleteBtn = newFriendElement.querySelector('.eliminar');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => {
                    newFriendElement.remove();
                });
            }
        }
    }
    function addFriendRequest(friendName) {
        if (!requestList) return;
        const requestHTML = `
            <li>
                <div class="friend">
                    <img src="./imgs/1.jpg" alt="Avatar de ${friendName}">
                    <span>${friendName}</span>
                    <button class="accept-request">Aceptar</button>
                    <button class="reject-request">Rechazar</button>
                </div>
            </li>
        `;
        requestList.innerHTML += requestHTML;

        const requestElement = requestList.lastElementChild;
        if (requestElement) {
            const acceptBtn = requestElement.querySelector('.accept-request');
            const rejectBtn = requestElement.querySelector('.reject-request');

            if (acceptBtn) {
                acceptBtn.addEventListener('click', () => {
                    addFriend(friendName);
                    requestElement.remove();
                    saveFriendRequests();
                });
            }

            if (rejectBtn) {
                rejectBtn.addEventListener('click', () => {
                    requestElement.remove();
                    saveFriendRequests();
                });
            }
        }
        saveFriendRequests();
    }
    function saveFriendRequests() {
        if (!requestList) return;

        const requests = Array.from(requestList.children).map(item => {
            const span = item.querySelector('span');
            return span ? span.textContent : '';
        }).filter(Boolean);

        localStorage.setItem('friendRequests', JSON.stringify(requests));
    }
    function loadFriendRequests() {
        const storedRequests = JSON.parse(localStorage.getItem('friendRequests')) || [];
        if (requestList) {
            requestList.innerHTML = '';
            storedRequests.forEach(friendName => {
                addFriendRequest(friendName);
            });
        }
    }
    // Simulación inicial
    addFriendRequest('Terrenecitor087');
    // Eliminar amigos
    if (friendsList) {
        friendsList.addEventListener('click', (event) => {
            if (event.target.classList.contains('eliminar')) {
                const friendElement = event.target.closest('.friend');
                if (friendElement) {
                    friendElement.remove();
                }
            }
        });
    }
;

