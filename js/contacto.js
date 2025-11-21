document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("status");

    if (!form || !status) {
        console.error("Formulario o contenedor de estado no encontrados.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                status.textContent = "Mensaje enviado correctamente";
                status.style.color = "green";
                form.reset();
            } else {
                status.textContent = "Hubo un error al enviar el mensaje";
                status.style.color = "red";
            }
        } catch (error) {
            status.textContent = "Error de conexión";
            status.style.color = "red";
        }
    });
});
    