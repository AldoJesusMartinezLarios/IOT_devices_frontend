function agregarDispositivo() {
    // Obtén los valores del formulario
    const id = document.getElementById("id").value;
    const device = document.getElementById("device").value;
    const value = document.getElementById("value").value;

    // Realiza una solicitud POST para agregar el dispositivo en el backend
    fetch('http://127.0.0.1:8000/iot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            device: device,
            value: value,
        }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(`Error al agregar el dispositivo. Código de estado: ${response.status}. Detalles: ${JSON.stringify(error)}`);
            });
        }
        return response.json();
    })
    .then(data => {
        // Muestra el mensaje de éxito en la página
        const mensajeElemento = document.getElementById("mensaje");
        mensajeElemento.innerHTML = `Dispositivo agregado con éxito: ID ${data.id}, ${data.device}, ${data.value}`;

        // Limpia el mensaje de error si estaba presente
        const errorMensajeElemento = document.getElementById("error-mensaje");
        errorMensajeElemento.innerHTML = "";

        // Puedes redirigir a otra página o realizar alguna acción adicional si es necesario
    })
    .catch(error => {
        // Muestra el mensaje de error en la página
        const errorMensajeElemento = document.getElementById("error-mensaje");
        errorMensajeElemento.innerHTML = `Error al agregar el dispositivo: ${error.message}`;

        // Limpia el mensaje de éxito si estaba presente
        const mensajeElemento = document.getElementById("mensaje");
        mensajeElemento.innerHTML = "";
    });
}
