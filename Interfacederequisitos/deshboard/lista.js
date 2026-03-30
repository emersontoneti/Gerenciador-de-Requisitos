const STORAGE_KEY = "reqmanager_requisitos";
let requisitos = carregarRequisitos();
salvarRequisitos(requisitos);

function carregarRequisitos() {
    const dados = localStorage.getItem(STORAGE_KEY);

    if (!dados) {
        return [];
    }

    try {
        const lista = JSON.parse(dados);
        if (!Array.isArray(lista)) {
            return [];
        }

        const listaNormalizada = lista.map((item, index) => ({
            id: item.id || `${Date.now()}-${index}`,
            titulo: item.titulo || "Sem titulo",
            descricao: item.descricao || "Sem descricao",
            tipo: item.tipo || "nao-funcional",
            prioridade: item.prioridade || "baixa",
            status: item.status || "aberto"
        }));

        return listaNormalizada;
    } catch (erro) {
        console.error("Falha ao ler requisitos salvos:", erro);
        return [];
    }
}

function salvarRequisitos(lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

function renderizarLista(lista) {
    const container = document.getElementById("lista");
    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum requisito cadastrado ainda.</p>";
        atualizarMetricas(lista);
        return;
    }

    lista.forEach((req) => {
        const div = document.createElement("div");
        div.classList.add("card-requisito");

        div.innerHTML = `
            <button class="btn-excluir">✖</button>
            <strong>${req.titulo}</strong>
            <p>${req.descricao}</p>
            <p><b>Tipo:</b> ${req.tipo}</p>
            <p><b>Prioridade:</b> ${req.prioridade}</p>
            <span class="badge ${req.status}">${req.status}</span>
        `;

  
        div.querySelector(".btn-excluir").onclick = () => {
            if (confirm("Deseja excluir este requisito?")) {
                requisitos = requisitos.filter((item) => item.id !== req.id);
                salvarRequisitos(requisitos);
                filtrar();
            }
        };

        container.appendChild(div);
    });

    atualizarMetricas(lista);
}

function atualizarMetricas(lista) {
    const total = lista.length;

    const funcionais = lista.filter(r => r.tipo === "funcional").length;
    const naoFuncionais = lista.filter(r => r.tipo === "nao-funcional").length;

    document.getElementById("total").innerText = total;
    document.getElementById("funcionais").innerText = funcionais;
    document.getElementById("naoFuncionais").innerText = naoFuncionais;

    let percFuncionais = 0;
    let percNaoFuncionais = 0;

    if (total > 0) {
        percFuncionais = ((funcionais / total) * 100).toFixed(1);
        percNaoFuncionais = ((naoFuncionais / total) * 100).toFixed(1);
    }

    document.getElementById("percFuncionais").innerText = percFuncionais + "%";
    document.getElementById("percNaoFuncionais").innerText = percNaoFuncionais + "%";
}

function filtrar() {
    const tipo = document.getElementById("filtroTipo").value;
    const status = document.getElementById("filtroStatus").value;

    let filtrados = [...requisitos];

    if (tipo) {
        filtrados = filtrados.filter(r => r.tipo === tipo);
    }

    if (status) {
        filtrados = filtrados.filter(r => r.status === status);
    }

    renderizarLista(filtrados);
}

window.onload = () => {
    renderizarLista(requisitos);
};