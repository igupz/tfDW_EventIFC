document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Coletar os dados de email e senha do formulário
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Enviar os dados para o servidor
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        // Verificar se a resposta foi bem-sucedida
        if (response.ok) {
            const user = await response.json(); // Obter os dados do usuário retornados pelo servidor

            // Salvar os dados do usuário no sessionStorage
            sessionStorage.setItem("user", JSON.stringify(user));
            alert("Login realizado com sucesso!");

            // Redirecionar com base no papel do usuário
            if (user.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "index.html";
            }
        } else {
            throw new Error("Credenciais inválidas");
        }
    } catch (error) {
        // Exibir a mensagem de erro na página
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = error.message;
        errorMessage.style.display = "block";
    }
});

// Verificar a autenticação do usuário nas outras páginas (não na de login)
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    // Ignorar a verificação de login se estivermos na página de login
    if (window.location.pathname.includes("login.html")) {
        return; // Não faz verificação na página de login
    }

    if (!user) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html"; // Redirecionar para login se não estiver logado
    }

    // Verificar se é uma página de admin e se o usuário não é admin
    const isAdminPage = window.location.pathname.includes("admin.html");
    if (isAdminPage && user.role !== "admin") {
        alert("Acesso restrito! Apenas administradores podem acessar esta página.");
        window.location.href = "index.html"; // Redirecionar para página inicial
    }
});

// Logout
const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        sessionStorage.removeItem("user"); // Remove os dados do usuário
        alert("Você saiu com sucesso!");
        window.location.href = "login.html"; // Redirecionar para login
    });
}
