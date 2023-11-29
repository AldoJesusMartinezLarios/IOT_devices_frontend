document.addEventListener('DOMContentLoaded', function () {
    obtenerDispositivos();

    function obtenerDispositivos() {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://127.0.0.1:8000/iot');
        request.send();

        request.onload = function () {
            if (request.status === 200) {
                const dispositivos = JSON.parse(request.responseText);

                // Limpiar la lista de dispositivos antes de actualizarla
                const deviceList = document.getElementById('deviceList');
                deviceList.innerHTML = '';

                dispositivos.forEach(device => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${device.id}</td>
                        <td>${device.device}</td>
                        <td>${device.value}</td>
                        <td>
                            <button class="btn btn-primary ver-button">Ver</button>
                            <button class="btn btn-success editar-button">Editar</button>
                            <button class="btn btn-danger borrar-button">Borrar</button>
                        </td>
                    `;
                    deviceList.appendChild(tr);

                    // Asignar event listeners a los botones
                    const verButton = tr.querySelector('.ver-button');
                    const editarButton = tr.querySelector('.editar-button');
                    const borrarButton = tr.querySelector('.borrar-button');

                    verButton.addEventListener('click', function () {
                        verDispositivo(device.id);
                    });

                    editarButton.addEventListener('click', function () {
                        editarDispositivo(device.id);
                    });

                    borrarButton.addEventListener('click', function () {
                        borrarDispositivo(device.id);
                    });
                });
            } else {
                console.error('Error al obtener dispositivos. Código de estado:', request.status);
            }
        };

        request.onerror = function () {
            console.error('Error de red al intentar obtener dispositivos.');
        };
    }

    function verDispositivo(id) {
        window.location.href = `ver?id=${id}`;
    }

    function editarDispositivo(id) {
        window.location.href = `editar?id=${id}`;
    }

    function borrarDispositivo(id) {
        window.location.href = `borrar?id=${id}`;
    }
});
