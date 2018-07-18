var anotacoes = document.getElementById('anotacoes');
var botao = document.getElementById('sendNote');
var textarea = document.getElementById('note');
var saveNote = document.getElementById('anotar');

function anotar(event){
  event.preventDefault();
  var minhaDiv = document.createElement('div');
  anotacoes.prepend(minhaDiv);
  minhaDiv.setAttribute('class', 'anotar');
  minhaDiv.className='styleColor';
  var newText = document.createElement('p');  
  newText.textContent = textarea.value;
  minhaDiv.appendChild(newText);

  textarea.value = "";
}
botao.addEventListener("click", anotar);

function desativaBotao(){
  var limite = 300;
  var limiteTexto = document.querySelector('#note').value.length;
  var caracteres = limite - limiteTexto;        
  if(caracteres > 0){ 
    document.getElementById('limiteTexto').innerHTML = caracteres;
    document.getElementById('sendNote').disabled = false;
  }else{
    document.getElementById('limiteTexto').innerHTML = caracteres;
    document.getElementById('sendNote').disabled = true;
  }
}