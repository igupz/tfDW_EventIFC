document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();
    const user = JSON.parse(sessionStorage.getItem("user"));

    // Se estamos na página de login, não realizamos nenhuma verificação
    if (currentPage === "login.html") {
        return; // Sai da função, não faz a verificação de login
    }

    // Se o usuário não estiver logado e a página não for login, redireciona para o login
    if (!user && currentPage !== "login.html") {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
        return;
    }

    // Controla a exibição do link "Admin" com base no tipo de usuário
    const adminLink = document.getElementById("admin-link");
    if (adminLink && user && user.role !== "admin") {
        adminLink.style.display = "none"; // Esconde o link "Admin" se não for admin
    }

    // Exibir o botão de logout se o usuário estiver logado
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.style.display = "block"; // Garante que o botão de logout esteja visível

        logoutButton.addEventListener("click", () => {
            // Remover os dados do usuário do sessionStorage
            sessionStorage.removeItem("user");

            // Verificar se o usuário foi removido
            const user = sessionStorage.getItem("user");
            if (!user) {
                alert("Você saiu com sucesso!");
                window.location.href = "login.html"; // Redireciona para a página de login
            } else {
                alert("Erro ao deslogar. Tente novamente.");
            }
        });
    }
});
