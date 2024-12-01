const API_BASE_URL = "http://localhost:3000/api";

// Obter todos os eventos
async function getEvents() {
    try {
        const response = await fetch(`${API_BASE_URL}/events`);
        if (!response.ok) throw new Error("Erro ao buscar eventos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Obter detalhes de um evento pelo ID
async function getEventById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar detalhes do evento");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Inscrever-se em um evento
async function registerForEvent(userId, eventId) {
    try {
        const response = await fetch(`${API_BASE_URL}/events/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, event_id: eventId }),
        });

        const data = await response.json(); // Lê a resposta JSON da API

        if (!response.ok) {
            console.error("Erro na inscrição:", data.message || data.error || "Erro desconhecido");
            return false; // Retorna false caso a inscrição não seja bem-sucedida
        }

        return true; // Inscrição bem-sucedida
    } catch (error) {
        console.error("Erro ao realizar inscrição:", error);
        return false; // Retorna false em caso de erro
    }
}

// Criar um novo evento
async function createEvent(eventData) {
    try {
        const response = await fetch(`${API_BASE_URL}/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData),
        });
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
}

