document.addEventListener('DOMContentLoaded', function () {
    // ...

    function obtenerDispositivos() {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://127.0.0.1:8000/iot');
        request.send();

        request.onload = (e) => {
            const response = request.responseText;
            const dispositivos = JSON.parse(response);
            console.log("response: " + response);
            console.log("json: " + JSON.stringify(dispositivos));
            console.log("status_code: " + request.status);

            const deviceList = document.getElementById('deviceList');

            // Limpia la lista de dispositivos antes de actualizarla
            deviceList.innerHTML = '';

            dispositivos.forEach(device => {
                const li = document.createElement('li');
                li.textContent = `ID: ${device.id}, Dispositivo: ${device.device}, Valor: ${device.value}`;

                // Crear botón "Ver" para cada dispositivo
                const viewButton = document.createElement('button');
                viewButton.textContent = 'Ver';
                viewButton.className = 'btn btn-primary'; // Aplicar la clase de Bootstrap

                viewButton.addEventListener('click', function () {
                    // Redirige a la página "ver.html" con el ID como parámetro
                    window.location.href = `ver?id=${device.id}`;
                });

                // Crear botón "Editar" para cada dispositivo
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.className = 'btn btn-success'; // Aplicar la clase de Bootstrap

                editButton.addEventListener('click', function () {
                    // Redirige a la página "editar.html" con el ID como parámetro
                    window.location.href = `editar?id=${device.id}`;
                });

                // Crear botón "Borrar" para cada dispositivo
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Borrar';
                deleteButton.className = 'btn btn-danger'; // Aplicar la clase de Bootstrap

                deleteButton.addEventListener('click', function () {
                    // Redirige a la página "borrar.html" con el ID como parámetro
                    window.location.href = `borrar?id=${device.id}`;
                });

                // Agregar los botones a la lista de dispositivos
                li.appendChild(viewButton);
                li.appendChild(editButton);
                li.appendChild(deleteButton);

                deviceList.appendChild(li);
            });
        };
    }

    // Llama a la función para obtener dispositivos cuando la página se carga
    obtenerDispositivos();
});
