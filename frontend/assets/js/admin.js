document.getElementById("create-event-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const location = document.getElementById("location").value;
    const createdBy = 1; // Substitua por autenticação real

    try {
        const success = await createEvent({ title, description, date, location, created_by: createdBy });
        if (success) {
            alert("Evento criado com sucesso!");
            e.target.reset();
        } else {
            alert("Erro ao criar evento.");
        }
    } catch (error) {
        console.error(error);
    }
});
async function createEvent(eventData) {
    try {
        const response = await fetch("http://localhost:3000/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData),
        });

        if (!response.ok) {
            console.error("Erro na resposta do servidor:", response.status, await response.text());
            return false;
        }

        const data = await response.json();
        return data.success || true; // Retorna sucesso com base na resposta do backend
    } catch (error) {
        console.error("Erro na requisição:", error);
        return false;
    }
}