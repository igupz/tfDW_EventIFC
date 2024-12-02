// Carregar eventos ao iniciar
document.addEventListener("DOMContentLoaded", async () => {
    const eventsContainer = document.getElementById("events-container");

    try {
        const events = await getEvents();
        if (events.length === 0) {
            eventsContainer.innerHTML = "<p class='text-muted'>Nenhum evento disponível no momento.</p>";
        } else {
            events.forEach((event) => {
                const eventCard = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${event.title}</h5>
                                <p class="card-text">${event.description}</p>
                                <a href="event-details.html?id=${event.id}" class="btn btn-primary">Detalhes</a>
                            </div>
                        </div>
                    </div>
                `;
                eventsContainer.innerHTML += eventCard;
            });
        }
    } catch (error) {
        eventsContainer.innerHTML = "<p class='text-danger'>Erro ao carregar eventos.</p>";
    }
});
