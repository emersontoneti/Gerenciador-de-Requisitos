const form = document.getElementById("formProjeto");
const mensagem = document.getElementById("mensagem");
const card = document.querySelector(".card");
flatpickr("#dataInicio", {
    dateFormat: "d/m/Y",
    defaultDate: "today",
    allowInput: true,
    
});
form.addEventListener("submit", function(e){
  e.preventDefault();
  let nome = document.getElementById("nome").value.trim();
  let descricao = document.getElementById("descricao").value.trim();
  let data = document.getElementById("dataInicio").value;
  if(nome === "" || descricao === "" || data === ""){
      mensagem.style.color = "red";
      mensagem.innerText = "Preencha todos os campos!";
      mensagem.classList.add("show");
      setTimeout(()=> mensagem.classList.remove("show"),3000);
      return;
  }
  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('descricao', descricao);
  formData.append('data_inicio', data);

  fetch('salvar_projeto.php', {
      method: 'POST',
      body: formData
  })
  .then(res => res.json())
  .then(dataResponse => {
      if(dataResponse.sucesso) {
          mensagem.style.color = "green";
          mensagem.innerText = "Projeto cadastrado com sucesso!";
          mensagem.classList.add("show");
          card.classList.add("success"); 
          setTimeout(()=> card.classList.remove("success"), 800);
          form.reset();
          setTimeout(()=> mensagem.classList.remove("show"),3000);

          setTimeout(() => {
              window.location.href = "Interfacederequisitos/requisitos.html?id_projeto=" + dataResponse.id_projeto;
          }, 2000);
      } else {
          mensagem.style.color = "red";
          mensagem.innerText = "Erro ao cadastrar: " + (dataResponse.erro || "Desconhecido");
          mensagem.classList.add("show");
          setTimeout(()=> mensagem.classList.remove("show"),3000);
      }
  })
  .catch(err => {
      console.error(err);
      mensagem.style.color = "red";
      mensagem.innerText = "Erro de conexão.";
      mensagem.classList.add("show");
      setTimeout(()=> mensagem.classList.remove("show"),3000);
  });
 

});