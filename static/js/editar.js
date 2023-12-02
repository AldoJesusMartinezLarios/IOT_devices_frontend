document.addEventListener('DOMContentLoaded', function () {
    // Obtener el ID del dispositivo de la URL (asumimos que está en formato "?id=123")
    const urlParams = new URLSearchParams(window.location.search);
    const dispositivoId = urlParams.get('id');

    // Obtener los botones de encendido y apagado
    const encenderButton = document.getElementById('encenderButton');
    const apagarButton = document.getElementById('apagarButton');

    // Asignar event listeners a los botones
    encenderButton.addEventListener('click', function () {
        editarValorDispositivo(dispositivoId, 1);
    });

    apagarButton.addEventListener('click', function () {
        editarValorDispositivo(dispositivoId, 0);
    });

    function editarValorDispositivo(id, nuevoValor) {
        const request = new XMLHttpRequest();
        request.open('PUT', `https://iot-backend-iylp.onrender.com/dispositivos/${id}`);
        request.setRequestHeader('Content-Type', 'application/json');

        // Utilizar un objeto para enviar el nuevo valor en el cuerpo de la solicitud
        const nuevoValorData = { valor: nuevoValor };

        request.send(JSON.stringify(nuevoValorData));

        request.onload = function () {
            if (request.status === 200) {
                alert('Valor actualizado correctamente');
            } else {
                console.error('Error al actualizar el valor. Código de estado:', request.status);
            }
        };

        request.onerror = function () {
            console.error('Error de red al intentar actualizar el valor.');
        };
    }
});
