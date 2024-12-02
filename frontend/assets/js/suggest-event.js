document.addEventListener("DOMContentLoaded", async () => {
    const eventDetailsContainer = document.getElementById("event-details");
    const registerButton = document.getElementById("register-button");

    // Obter o ID do evento da URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");

    try {
        // Carregar detalhes do evento
        const event = await getEventById(eventId);
        if (!event) {
            eventDetailsContainer.innerHTML = "<p class='text-danger'>Evento não encontrado.</p>";
        } else {
        eventDetailsContainer.innerHTML = `
            <h2>${event.title}</h2>
            <p><strong>Descrição:</strong> ${event.description}</p>
            <p><strong>Data:</strong> ${event.date}</p>
            <p><strong>Local:</strong> ${event.location}</p>
        `;
    }
        // Configurar botão de inscrição
        registerButton.addEventListener("click", async () => {
            const userId = 1; // Substitua por autenticação real
            const success = await registerForEvent(userId, eventId);
            if (success) {
                alert("Inscrição realizada com sucesso!");
            } else {
                alert("Erro ao realizar inscrição.");
            }
        });
    } catch (error) {
        eventDetailsContainer.innerHTML = "<p class='text-danger'>Erro ao carregar detalhes do evento.</p>";
    }
});
