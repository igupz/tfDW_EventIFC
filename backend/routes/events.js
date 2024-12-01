const express = require("express");
const db = require("../db/database");
const router = express.Router();

// Obtém o ID do evento da URL
router.get("/:id", (req, res) => {
    const eventId = req.params.id; 
    const query = "SELECT * FROM events WHERE id = ?";

    db.get(query, [eventId], (err, row) => {
        if (err) {
            res.status(500).json({ error: "Erro ao buscar detalhes do evento." });
        } else if (!row) {
            res.status(404).json({ error: "Evento não encontrado." });
        } else {
            res.json(row);
        }
    });
});


// Listar todos os eventos
router.get("/", (req, res) => {
    db.all("SELECT * FROM events", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Criar um novo evento
router.post("/", (req, res) => {
    const { title, description, date, location, created_by } = req.body;
    const query = `
        INSERT INTO events (title, description, date, location)
        VALUES (?, ?, ?, ?)
    `;
    db.run(query, [title, description, date, location], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

router.post("/register", async (req, res) => {
    const { user_id, event_id } = req.body;
    console.log("user_id:", user_id, "event_id:", event_id); // Verifique no console se os valores estão sendo recebidos

    try {
        // Lógica para registrar o usuário no evento
        const event = await Event.findById(event_id);
        if (!event) {
            return res.status(404).json({ success: false, message: "Evento não encontrado." });
        }

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado." });
        }

        // Inscrever o usuário no evento (exemplo)
        event.participants.push(user._id);
        await event.save();

        return res.json({ success: true });
    } catch (error) {
        console.error("Erro ao registrar inscrição:", error);
        return res.status(500).json({ success: false, message: "Erro no servidor." });
    }
});

module.exports = router;
