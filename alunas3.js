//definir que dropMenu é o menu
var dropMenu = document.getElementById("menu");
//adicionar o evento escutador 'change'
dropMenu.addEventListener("change", informacoes);
//quando a janela der onload vai executar a função exibirMenu()
window.onload = exibirMenu()

//Função que vai executar as informações do drop-dropMenu
function exibirMenu(){
  // define var que cria a opção dentro do menu
  var nomeMenu = document.createElement("option");
  //mostra no HTML o nome que vai aparecer no menu
  nomeMenu.innerHTML = "Escolha a sede";
  //esse nome não tem valor
  nomeMenu.value = "none";
  //adiciona o filho "nome do menu"
  dropMenu.appendChild(nomeMenu);
  //para cada sede dentro de data
  for(sede in data){
    var itemMenu = document.createElement("option");
    itemMenu.value = sede;
    itemMenu.innerHTML = sede;
    dropMenu.appendChild(itemMenu);
  }
}

// função que vai separar as informações do número total de alunas por cada geração e desistentes
function informacoes(){
  var sede = dropMenu.value;
  var geracao = document.getElementById("dados");
  for(turma in data[sede]){
    for(i in data[sede][turma]["students"]){
      var alunas = document.createElement("alunas");
      alunas.innerHTML = data[sede][turma]["students"][i]["name"];
      dados.appendChild(alunas);
      }
    }
  }

//função para as alunas desistentes
  function desistentes(sede,turma){
    var ativas = 0;
    var desativadas = 0;
    for(var i = 0; i < data.length; i++){
      for( i in data[sede][turma]["students"][i]["active"]){
      if(active === true){
         ativas = +1;
         console.log(ativas);
      }else{
         desativadas = +1;
      }
    }
  }
}
