var dropMenu = document.getElementById('alunas-menu');
dropMenu.addEventListener('change', carregaProgramers);

window.onload = carregaMenu();

 function carregaMenu(){
     var nome = document.createElement('option');
     nome.innerHTML = 'selecione sede';
     nome.value = 'none';
     dropMenu.appendChild(nome);
     console.log(data);
     for (sede in data){
         var itemMenu = document.createElement('option');
         itemMenu.value = sede;
         itemMenu.innerHTML = sede;
         dropMenu.appendChild(itemMenu);
     }
};

function carregaProgramers(){
  var turma = dropMenu.value;
  var listaTurma = document.getElementById('print-programers');
  listaTurma.innerHTML = '';
  for (geracao in data[turma]){
    for (i in data [turma][geracao]['students'])

    var nome = document.createElement('p');
    var identity = document.createTextNode(data[turma][geracao]['students'][i]['name']);
    nome.appendChild(identity);
    document.body.appendChild(nome);
    }
  };
