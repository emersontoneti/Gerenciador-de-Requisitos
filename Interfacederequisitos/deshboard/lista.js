let requisitos = [
    {
        titulo: "Login de usuário",
        descricao: "Sistema deve permitir login",
        tipo: "funcional",
        prioridade: "alta",
        status: "aberto"
    },
    {
        titulo: "Tempo de resposta",
        descricao: "Sistema deve responder em até 2s",
        tipo: "nao-funcional",
        prioridade: "media",
        status: "desenvolvimento"
    }
];

function renderizarLista(lista) {
    const container = document.getElementById("lista");
    container.innerHTML = "";

    lista.forEach((req, index) => {
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
                requisitos.splice(index, 1); // remove do array
                renderizarLista(requisitos); // atualiza tela
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

    let filtrados = requisitos;

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