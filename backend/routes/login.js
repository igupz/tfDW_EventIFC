const express = require("express");
const router = express.Router();
const db = require("../db/database"); // Conexão com o banco de dados

router.post("/", (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.get(query, [email, password], (err, user) => {
        if (err) {
            console.error("Erro no banco de dados:", err);
            return res.status(500).json({ error: "Erro ao autenticar usuário." });
        }
        if (!user) {
            console.log("Usuário ou senha incorretos");
            return res.status(401).json({ error: "Credenciais inválidas." });
        }
        res.json({ id: user.id, email: user.email, role: user.role }); // Retornando apenas os dados necessários
    });
});

module.exports = router;
