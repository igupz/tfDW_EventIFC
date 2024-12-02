// Seletores dos modais e botões
const editEventForm = document.getElementById("edit-event-form");
const deleteEventForm = document.getElementById("delete-event-form");
const deleteEventIdInput = document.getElementById("delete-event-id");
const deleteEventNameInput = document.getElementById("delete-event-name");
const editEventIdInput = document.getElementById("edit-event-id");
const editTitleInput = document.getElementById("edit-title");
const editDescriptionInput = document.getElementById("edit-description");
const editDateInput = document.getElementById("edit-date");
const editLocationInput = document.getElementById("edit-location");

// Evento de envio do formulário de edição
editEventForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const id = editEventIdInput.value;
    const updatedData = {
        title: editTitleInput.value,
        description: editDescriptionInput.value,
        date: editDateInput.value,
        location: editLocationInput.value
    };

    try {
        const response = await fetch(`http://localhost:3000/api/events/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            alert("Evento atualizado com sucesso!");
            location.reload(); // Atualiza a página para refletir as mudanças
        } else {
            alert("Erro ao atualizar o evento.");
        }
    } catch (error) {
        console.error("Erro ao atualizar o evento:", error);
    }
});

// Evento de envio do formulário de remoção
deleteEventForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = deleteEventIdInput.value;

    try {
        const response = await fetch(`http://localhost:3000/api/events/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Evento deletado com sucesso!");
            location.reload(); // Atualiza a página
        } else {
            alert("Erro ao deletar o evento.");
        }
    } catch (error) {
        console.error("Erro ao deletar o evento:", error);
    }
});

// Preenche os campos do modal de edição ao selecionar o ID do evento
editEventIdInput.addEventListener("input", async () => {
    const id = editEventIdInput.value;

    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/api/events/${id}`);
            if (response.ok) {
                const event = await response.json();
                editTitleInput.value = event.title || "";
                editDescriptionInput.value = event.description || "";
                editDateInput.value = event.date || "";
                editLocationInput.value = event.location || "";
            } else {
                alert("Evento não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar detalhes do evento:", error);
        }
    }
});

// Preenche o campo do nome do evento no modal de deleção
deleteEventIdInput.addEventListener("input", async () => {
    const id = deleteEventIdInput.value;

    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/api/events/${id}`);
            if (response.ok) {
                const event = await response.json();
                deleteEventNameInput.value = event.title || "";
            } else {
                alert("Evento não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar detalhes do evento:", error);
        }
    }
});
