const form = document.getElementById("formRequisito");
const mensagem = document.getElementById("mensagem");

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
        titulo,
        descricao,
        tipo,
        prioridade,
        status
    };
    console.log("Requisito:", requisito);
<<<<<<< HEAD
    mostrarHistoricoTemp(requisito);
    mensagem.className = "show sucesso";
    mensagem.innerText = "✅ Requisito cadastrado com sucesso!";
    setTimeout(() => mensagem.classList.remove("show"), 3000);
    form.reset();
});
document.getElementById("btnVoltar").addEventListener("click", () => {
    window.location.href = "Repmanager/index.html";
});
document.getElementById("btnProxima").addEventListener("click", () => {
    if (form.checkValidity()) {
      window.location.href = "interfacederequisitos/lista.html";
=======

    mostrarHistoricoTemp(requisito);

    mensagem.className = "show sucesso";
    mensagem.innerText = "✅ Requisito cadastrado com sucesso!";
    setTimeout(() => mensagem.classList.remove("show"), 3000);

    form.reset();
});




document.getElementById("btnVoltar").addEventListener("click", () => {
    window.location.href = "../index.htm";
});


document.getElementById("btnProxima").addEventListener("click", () => {
    if (form.checkValidity()) {
        window.location.href = "deshboard/lista.html";
>>>>>>> 9f5f5c6 (alterações no submódulo)
    } else {
        form.reportValidity();
    }
});