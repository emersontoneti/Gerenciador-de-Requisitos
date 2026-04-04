const form = document.getElementById("formRequisito");
const mensagem = document.getElementById("mensagem");


const params = new URLSearchParams(window.location.search);
const id_projeto = params.get("id_projeto");

function mostrarHistoricoTemp(req) {
    const container = document.getElementById("historicoTemp");
    const div = document.createElement("div");
    div.classList.add("card-temp");
    div.innerHTML = `
        <button>&times;</button>
        <strong>${req.titulo}</strong><br>
        ${req.descricao}<br>
        ${req.tipo} | ${req.prioridade} | ${req.status}
    `;
    const botao = div.querySelector("button");
    botao.onclick = () => {
        if (confirm("Deseja excluir este requisito?")) {
            div.remove();
        }
    };
    container.appendChild(div);
    setTimeout(() => { div.remove(); }, 4000);
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let titulo = document.getElementById("titulo").value.trim();
    let descricao = document.getElementById("descricao").value.trim();
    let tipo = document.getElementById("tipo").value;
    let status = document.getElementById("status").value;
    let prioridadeSelecionada = document.querySelector('input[name="prioridade"]:checked');

    if (titulo === "" || descricao === "" || tipo === "" || !prioridadeSelecionada) {
        mensagem.className = "show erro";
        mensagem.innerText = "⚠️ Preencha todos os campos!";
        setTimeout(() => mensagem.classList.remove("show"), 3000);
        return;
    }

    let prioridade = prioridadeSelecionada.value;

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("tipo", tipo);
    formData.append("prioridade", prioridade);
    formData.append("status", status);
    formData.append("id_projeto", id_projeto);

    fetch("../salvar_requisito.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.sucesso) {
            mostrarHistoricoTemp({ titulo, descricao, tipo, prioridade, status });
            mensagem.className = "show sucesso";
            mensagem.innerText = "✅ Requisito cadastrado com sucesso!";
            setTimeout(() => mensagem.classList.remove("show"), 3000);
            form.reset();
        } else {
            mensagem.className = "show erro";
            mensagem.innerText = "❌ Erro ao cadastrar: " + data.erro;
            setTimeout(() => mensagem.classList.remove("show"), 3000);
        }
    });
});

document.getElementById("btnVoltar").addEventListener("click", () => {
    window.location.href = "../index.php";
});

document.getElementById("btnProxima").addEventListener("click", () => {
    window.location.href = "deshboard/lista.html?id_projeto=" + id_projeto;
});