// Pega o id_projeto da URL
const params = new URLSearchParams(window.location.search);
const id_projeto = params.get("id_projeto");

function carregarRequisitos(tipo = "", status = "") {
    let url = "../../listar_requisitos.php?";
    
    if (id_projeto) url += "id_projeto=" + id_projeto + "&";
    if (tipo) url += "tipo=" + tipo + "&";
    if (status) url += "status=" + status + "&";

    fetch(url)
    .then(res => res.json())
    .then(data => {
        renderizarLista(data.requisitos);
        atualizarMetricas(data.metricas);
    });
}

function renderizarLista(lista) {
    const container = document.getElementById("lista");
    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum requisito encontrado.</p>";
        return;
    }

    lista.forEach((req) => {
        const div = document.createElement("div");
        div.classList.add("card-requisito");
        div.innerHTML = `
            <strong>${req.titulo}</strong>
            <p>${req.descricao}</p>
            <p><b>Tipo:</b> ${req.tipo}</p>
            <p><b>Prioridade:</b> ${req.prioridade}</p>
            <span class="badge ${req.status}">${req.status}</span>
        `;
        container.appendChild(div);
    });
}

function atualizarMetricas(metricas) {
    document.getElementById("total").innerText = metricas.total;
    document.getElementById("funcionais").innerText = metricas.funcionais;
    document.getElementById("naoFuncionais").innerText = metricas.nao_funcionais;

    let percFuncionais = 0;
    let percNaoFuncionais = 0;

    if (metricas.total > 0) {
        percFuncionais = ((metricas.funcionais / metricas.total) * 100).toFixed(1);
        percNaoFuncionais = ((metricas.nao_funcionais / metricas.total) * 100).toFixed(1);
    }

    document.getElementById("percFuncionais").innerText = percFuncionais + "%";
    document.getElementById("percNaoFuncionais").innerText = percNaoFuncionais + "%";
}

function filtrar() {
    const tipo = document.getElementById("filtroTipo").value;
    const status = document.getElementById("filtroStatus").value;
    carregarRequisitos(tipo, status);
}

function voltar() {
    window.location.href = "../requisitos.html?id_projeto=" + id_projeto;
}

window.onload = () => {
    carregarRequisitos();
};