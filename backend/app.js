const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Conexão ao banco de dados (se necessário)
const db = require("./db/database");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rota principal para login.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "login.html"));
});

// Servindo arquivos estáticos da pasta "frontend"
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.use("/assets", express.static(path.join(__dirname, "..", "frontend", "assets")));

// Rotas da API
const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");
const feedbackRoutes = require("./routes/feedback");
const loginRoutes = require("./routes/login");

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/login", loginRoutes);

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
