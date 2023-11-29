document.addEventListener("DOMContentLoaded", function () {
    // Obtén el parámetro del ID de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Obtén el mensaje y el mensaje de error por su ID
    const mensajeElemento = document.getElementById("mensaje");
    const errorMensajeElemento = document.getElementById("error-mensaje");

    // Realiza una solicitud GET para obtener detalles del dispositivo
    fetch(`http://127.0.0.1:8000/iot/${id}`)
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(`Error al obtener detalles del dispositivo. Código de estado: ${response.status}. Detalles: ${JSON.stringify(error)}`);
                });
            }
            return response.json();
        })
        .then(data => {
            // Muestra los detalles del dispositivo antes de borrar
            mensajeElemento.innerHTML = `¿Estás seguro de que deseas borrar el dispositivo con ID ${data.id}, ${data.device}, ${data.value}?`;

            // Crea un botón de confirmación para borrar
            const confirmButton = document.createElement('button');
            confirmButton.textContent = 'Sí, Borrar';
            confirmButton.className = 'btn btn-danger custom-button';
            confirmButton.addEventListener('click', function () {
                borrarDispositivo();
            });

            // Crea un botón de regreso
            const backButton = document.createElement('a');
            backButton.textContent = 'No, Regresar';
            backButton.className = 'btn btn-primary';
            backButton.href = '/'; // Puedes cambiar la URL según tu estructura de rutas

            // Agrega los botones a la página
            errorMensajeElemento.appendChild(confirmButton);
            errorMensajeElemento.appendChild(backButton);
        })
        .catch(error => {
            // Muestra el mensaje de error si no se pueden obtener los detalles del dispositivo
            errorMensajeElemento.innerHTML = `Error al obtener detalles del dispositivo: ${error.message}`;
        });

    function borrarDispositivo() {
        // Realiza una solicitud DELETE para borrar el dispositivo en el backend
        fetch(`http://127.0.0.1:8000/iot/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(`Error al borrar el dispositivo. Código de estado: ${response.status}. Detalles: ${JSON.stringify(error)}`);
                });
            }
            return response.json();
        })
        .then(data => {
            // Muestra el mensaje de éxito en la página
            mensajeElemento.innerHTML = `Dispositivo borrado con éxito: ID ${data.id}, ${data.device}, ${data.value}`;

            // Limpia el mensaje de error si estaba presente
            errorMensajeElemento.innerHTML = "";

            // Redirige a index.html después de borrar con éxito
            setTimeout(() => {
                window.location.href = '/';
            }, 2000); // Espera 2 segundos antes de redirigir (puedes ajustar según tus preferencias)
        })
        .catch(error => {
            // Muestra el mensaje de error en la página
            errorMensajeElemento.innerHTML = `Error al borrar el dispositivo: ${error.message}`;

            // Limpia el mensaje de éxito si estaba presente
            mensajeElemento.innerHTML = "";
        });
    }
});
