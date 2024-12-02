const express = require("express");
const db = require("../db/database");
const router = express.Router();

// Obtém os detalhes de um evento pelo ID
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
    const query = "SELECT * FROM events ORDER BY date ASC"; // Ordenação opcional
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: "Erro ao listar eventos." });
        } else {
            res.json(rows);
        }
    });
});

// Criar um novo evento
router.post("/", (req, res) => {
    const { title, description, date, location, created_by } = req.body;
    const query = `
        INSERT INTO events (title, description, date, location, created_by)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [title, description, date, location, created_by], function (err) {
        if (err) {
            res.status(500).json({ error: "Erro ao criar evento." });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

// Atualizar um evento
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, date, location } = req.body;
    const query = `
        UPDATE events
        SET title = ?, description = ?, date = ?, location = ?
        WHERE id = ?
    `;

    db.run(query, [title, description, date, location, id], function (err) {
        if (err) {
            res.status(500).json({ error: "Erro ao atualizar evento." });
        } else if (this.changes === 0) {
            res.status(404).json({ error: "Evento não encontrado." });
        } else {
            res.json({ success: true });
        }
    });
});

// Deletar um evento
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM events WHERE id = ?";

    db.run(query, [id], function (err) {
        if (err) {
            res.status(500).json({ error: "Erro ao deletar evento." });
        } else if (this.changes === 0) {
            res.status(404).json({ error: "Evento não encontrado." });
        } else {
            res.json({ success: true });
        }
    });
});

// Registrar um usuário em um evento
router.post("/register", (req, res) => {
    const { user_id, event_id } = req.body;
    const query = `
        INSERT INTO event_registrations (user_id, event_id)
        VALUES (?, ?)
    `;

    db.run(query, [user_id, event_id], function (err) {
        if (err) {
            res.status(500).json({ error: "Erro ao registrar usuário no evento." });
        } else {
            res.status(201).json({ success: true });
        }
    });
});

module.exports = router;
