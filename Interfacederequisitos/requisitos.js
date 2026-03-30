const form = document.getElementById("formRequisito");
const mensagem = document.getElementById("mensagem");
const STORAGE_KEY = "reqmanager_requisitos";

function carregarRequisitos() {
    const dados = localStorage.getItem(STORAGE_KEY);

    if (!dados) {
        return [];
    }

    try {
        const requisitos = JSON.parse(dados);
        return Array.isArray(requisitos) ? requisitos : [];
    } catch (erro) {
        console.error("Falha ao ler requisitos salvos:", erro);
        return [];
    }
}

function salvarRequisitos(lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

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

    setTimeout(() => {
        div.remove();
    }, 4000);
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
    const requisito = {
        id: Date.now(),
        titulo,
        descricao,
        tipo,
        prioridade,
        status
    };

    const requisitos = carregarRequisitos();
    requisitos.push(requisito);
    salvarRequisitos(requisitos);

    mostrarHistoricoTemp(requisito);

    mensagem.className = "show sucesso";
    mensagem.innerText = "✅ Requisito cadastrado com sucesso!";
    setTimeout(() => mensagem.classList.remove("show"), 3000);

    form.reset();
});

document.getElementById("btnVoltar").addEventListener("click", () => {
    window.location.href = "../index.php";
});

document.getElementById("btnProxima").addEventListener("click", () => {
    if (form.checkValidity()) {
        window.location.href = "deshboard/lista.html";
    } else {
        form.reportValidity();
    }
});