async function cadastrarUsuario() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem");

    if (!nome || !email) {
        mensagem.textContent = "Nome e e-mail são obrigatórios!";
        mensagem.style.color = "red";
        return;
    }

    if (!validarEmail(email)) {
        mensagem.textContent = "E-mail inválido!";
        mensagem.style.color = "red";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email }),
        });

        const data = await response.json();

        if (response.ok) {
            mensagem.textContent = "Usuário cadastrado com sucesso!";
            mensagem.style.color = "green";
            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
        } else {
            mensagem.textContent = data.error;
            mensagem.style.color = "red";
        }
    } catch (error) {
        mensagem.textContent = "Erro ao conectar com o servidor!";
        mensagem.style.color = "red";
    }
}
