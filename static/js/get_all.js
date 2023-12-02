document.addEventListener('DOMContentLoaded', function () {
    obtenerDispositivos();

    function obtenerDispositivos() {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://iot-backend-iylp.onrender.com/dispositivos');
        request.send();

        request.onload = function () {
            if (request.status === 200) {
                const dispositivos = JSON.parse(request.responseText);

                // Obtener el elemento 'deviceList'
                const dispositivoList = document.getElementById('deviceList');

                // Verificar si el elemento existe antes de operar sobre él
                if (dispositivoList) {
                    // Limpiar la lista de dispositivos antes de actualizarla
                    dispositivoList.innerHTML = '';

                    dispositivos.forEach(dispositivo => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${dispositivo.id}</td>
                            <td>${dispositivo.dispositivo}</td>
                            <td>${dispositivo.valor}</td>
                            <td>
                                <button class="btn btn-success editar-button">Editar</button>
                            </td>
                        `;
                        dispositivoList.appendChild(tr);

                        // Asignar event listeners a los botones
                        const editarButton = tr.querySelector('.editar-button');

                        editarButton.addEventListener('click', function () {
                            editarDispositivo(dispositivo.id);
                        });
                    });
                } else {
                    console.error('Elemento con ID "deviceList" no encontrado.');
                }
            } else {
                console.error('Error al obtener dispositivos. Código de estado:', request.status);
            }
        };

        request.onerror = function () {
            console.error('Error de red al intentar obtener dispositivos.');
        };
    }

    function editarDispositivo(id) {
        window.location.href = `editar?id=${id}`;
    }
});