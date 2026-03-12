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
  mensagem.style.color = "green";
  mensagem.innerText = "Projeto cadastrado com sucesso!";
  mensagem.classList.add("show");
  card.classList.add("success"); 
  setTimeout(()=> card.classList.remove("success"), 800);
  form.reset();
  setTimeout(()=> mensagem.classList.remove("show"),3000);

setTimeout(() => {
  window.location.href = "requisitos.html";
}, 2000);
 

});