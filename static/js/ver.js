document.addEventListener("DOMContentLoaded", function () {
    // Obtén el parámetro del ID de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Realiza una solicitud para obtener detalles del dispositivo con el ID proporcionado
    // Puedes utilizar una ruta en tu backend (FastAPI o Flask) para manejar esta solicitud

    // Ejemplo de solicitud con Fetch API
    fetch(`http://127.0.0.1:8000/iot/${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(data => {
            // Manipula los detalles del dispositivo y actualiza el contenido en la página
            const deviceDetailsDiv = document.getElementById("device-details");
            deviceDetailsDiv.innerHTML = `
                <p>ID: ${data.id}</p>
                <p>Dispositivo: ${data.device}</p>
                <p>Valor: ${data.value}</p>
            `;
        })
        .catch(error => console.error("Error al obtener detalles del dispositivo:", error));
});
