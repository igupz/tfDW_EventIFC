const express = require("express");
const db = require("../db/database");
const router = express.Router();

// Listar todos os usuários (apenas admins podem ver)
router.get("/", (req, res) => {
    db.all("SELECT id, name, email, role FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Criar um novo usuário (registro)
router.post("/", (req, res) => {
    const { name, email, password, role } = req.body;
    const query = `
        INSERT INTO users (name, email, password, role)
        VALUES (?, ?, ?, ?)
    `;
    db.run(query, [name, email, password, role], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

// Login básico (verificação de credenciais)
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const query = `
        "SELECT * FROM users WHERE email = ? AND password = ?";
    `;
    db.get(query, [email, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (row) {
            // Se as credenciais estiverem corretas, retorne o usuário
            res.json({ id: row.id, name: row.name, role: row.role });
        } else {
            // Se as credenciais estiverem incorretas
            res.status(401).json({ error: "Credenciais inválidas" });
        }
        res.json(user);
    });
});

module.exports = router;
