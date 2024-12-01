const express = require("express");
const db = require("../db/database");
const router = express.Router();

// Listar feedbacks de um evento específico
router.get("/:event_id", (req, res) => {
    const { event_id } = req.params;
    const query = `
        SELECT feedback.id, feedback.rating, feedback.comment, users.name AS user_name
        FROM feedback
        INNER JOIN users ON feedback.user_id = users.id
        WHERE feedback.event_id = ?
    `;
    db.all(query, [event_id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Enviar um feedback
router.post("/", (req, res) => {
    const { user_id, event_id, rating, comment } = req.body;
    const query = `
        INSERT INTO feedback (user_id, event_id, rating, comment)
        VALUES (?, ?, ?, ?)
    `;
    db.run(query, [user_id, event_id, rating, comment], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

module.exports = router;
