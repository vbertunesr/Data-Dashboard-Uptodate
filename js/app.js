
var sedeLocal = document.getElementById("localSede");
var turmaLocal = document.getElementById("turmaGeneration");

window.onload = escolheSede();

function escolheSede(){
  var firstOption = document.createElement("option");
  firstOption.innerHTML = "Selecione Sede";
  firstOption.value = "none";
  sedeLocal.appendChild(firstOption);
  var secondOption = document.createElement("option");
  secondOption.innerHTML = "Selecione turma";
  secondOption.value = "none";
  turmaLocal.appendChild(secondOption);
  for (sede in data) {
    var itemMenu = document.createElement("option");
    itemMenu.value = sede;
    itemMenu.innerHTML = sede;
    sedeLocal.appendChild(itemMenu);
  }
}

function escolheTurma(){
  turmaLocal.options.length = 1;
  var sedeSelected = sedeLocal.value;
  var turmas = Object.keys(data[sedeSelected]);
  for (turma in turmas) {
    var itemMenu2 = document.createElement("option");
    itemMenu2.value = turmas[turma];
    itemMenu2.innerHTML = turmas[turma];
    turmaLocal.appendChild(itemMenu2);
  }
}
sedeLocal.addEventListener("change", escolheTurma);
turmaLocal.addEventListener("change", totalStudents);

function totalStudents() {
  sede = sedeLocal.value;
  turma = turmaLocal.value;
  for (students in data[sede][turma]) {
    var students = data[sede][turma].students;
    var qtdAlunas = document.getElementById("qtdAlunas");
    qtdAlunas.innerHTML = students.length + "<br>" + "<span> ESTUDANTES</span>";
    var inscritas = document.getElementById("inscritas");
    inscritas.setAttribute("class", "box");
    var matriculdas = document.getElementById("matriculadas");
    matriculadas.innerHTML = "DADOS ESTUDANTES" + '<hr class="hr-data-title"></hr>';
  }

//tópico dois
var students = data[sede][turma].students;
var desistentes = 0;
for (i in data[sede][turma]["students"]) {
  if (students[i].active === false) {
   desistentes++;
    var porcentoDesiste = parseInt((desistentes * 100 / students.length));
  }
  var desistencia = document.getElementById("desistencia");
  desistencia.innerHTML = porcentoDesiste + '%' + '<br>' + '<span>   DE DESISTÊNCIAS</span>';
}
turmaLocal.addEventListener("change", infoAlunas);

function infoAlunas(){
  sede = sedeLocal.value;
  turma = turmaLocal.value;

  var perfilAlunas = document.getElementById("perfilAlunas");
  perfilAlunas.innerHTML = "";

  for (i in data[sede][turma]['students']) {
    /* Cria a div que vai receber as informações das alunas */
    var areaPerfil = document.createElement("div");
    areaPerfil.setAttribute('class', 'areaPerfil');
   
    /* Insere o nome da aluna */
    var names = document.createElement("p");
    names.innerHTML = data[sede][turma]['students'][i]['name'] + '<hr class="hr-info-title"></hr>';
    names.setAttribute('class', 'profileName');
   
    /* Insere o status das alunas */
var situation = document.createElement("p");
situation.setAttribute('class', 'information');
areaPerfil.appendChild(situation);
if (data[sede][turma]['students'][i]['active'] === true) {
  situation.innerHTML = 'ATIVA: SIM';
} else {
  situation.innerHTML = 'ATIVA: NÃO';
}
  
for (j in data[sede][turma]['students'][i]['sprints']) {
  if (data[sede][turma]['students'][i].sprints.length !== 0) {
    var tech1 = data[sede][turma]['students'][i]['sprints'][0]['score']['tech'];
    var tech2 = data[sede][turma]['students'][i]['sprints'][1]['score']['tech'];
    var hse1 = data[sede][turma]['students'][i]['sprints'][0]['score']['hse'];
    var hse2 = data[sede][turma]['students'][i]['sprints'][1]['score']['hse'];
    if (data[sede][turma]['students'][i].sprints.length > 2) {
      var tech3 = data[sede][turma]['students'][i]['sprints'][2]['score']['tech'];
      var hse3 = data[sede][turma]['students'][i]['sprints'][2]['score']['hse'];
        if (data[sede][turma]['students'][i].sprints.length > 3) {
        var tech4 = data[sede][turma]['students'][i]['sprints'][3]['score']['tech'];
        var hse4 = data[sede][turma]['students'][i]['sprints'][3]['score']['hse'];
      }
    }
  }

tech1 = tech1?tech1:"sem dados";
tech2 = tech2?tech2:"sem dados";
tech3 = tech3?tech3:"sem dados";
tech4 = tech4?tech4:"sem dados";
hse1 = hse1?hse1:"sem dados";
hse2 = hse2?hse2:"sem dados";
hse3 = hse3?hse3:"sem dados";
hse4 = hse4?hse4:"sem dados";

var sprintsTech = document.createElement("p");
sprintsTech.innerHTML = '<span class="description">MÉTRICA HABILIDADE TECH</span>' + '<br>' + '<span class="profileTitle">SPRINT 1: </span>' + tech1 + '<br>' + '<span class="profileTitle">SPRINT 2: </span>' + tech2 + '<br>' + '<span class="profileTitle">SPRINT 3: </span>' + tech3 + '<br>' + '<span class="profileTitle">SPRINT 4: </span>' + tech4;
sprintsTech.setAttribute('class', 'profileScores');

var sprintsHse = document.createElement("p");
sprintsHse.innerHTML = '<span class="description">MÉTRICA HABILIDADE HSE</span>' + '<br>' + '<span class="profileTitle">SPRINT 1: </span>' + hse1 + '<br>' + '<span class="profileTitle">SPRINT 2: </span>' + hse2 + '<br>' + '<span class="profileTitle">SPRINT 3: </span>' + hse3 + '<br>' + '<span class="profileTitle">SPRINT 4: </span>' + hse4;
sprintsHse.setAttribute('class', 'profileScores');

    areaPerfil.appendChild(names);
    areaPerfil.appendChild(situation);
    areaPerfil.appendChild(sprintsTech);
    areaPerfil.appendChild(sprintsHse);
    perfilAlunas.appendChild(areaPerfil);

}
}

//O número de alunas que excedem a meta de pontos, em média, de todos os sprints realizados. O objetivo dos pontos é 70% do total de pontos em HSE e em tecnologia.
//function mediaPontoSprint() {
  var alunas = students;
  var array = [];
  for (var i = 0; i < students.length; i++) {
    var techTotal = 0;
    var hseTotal = 0;
    if (students[i].active === true) {
      var sprint = students[i].sprints.length;
      for (var j = 0; j < sprint; j++) {
        var tech = students[i].sprints[j].score.tech;
        techTotal = techTotal + tech;
        var hse = students[i].sprints[j].score.hse;
        hseTotal = hseTotal + hse;
      }
      var mediaHse = hseTotal / sprint;
      var mediaTech = techTotal / sprint;
    
      array.push([mediaTech, mediaHse]);
      var mediaAlunas = 0;
      for (var k = 0; k < array.length; k++) {
        if (array[k][0] > 1800 && array[k][1] > 1200) {
          mediaAlunas++;
        }
      }
    }
    var resultado = document.getElementById("mediaAlunas");
    resultado.innerHTML = mediaAlunas + "<br>" + " <span>  ESTUDANTES</span>";
    var objetivo = document.getElementById("objetivo");
    objetivo.setAttribute("class", "box");
    var titleObjetivo = document.getElementById("titleObjetivo");
    titleObjetivo.innerHTML = "Resutados" + '<hr class="hr-data-title"></hr>' + '<span class="description">ESTUDANTES QUE EXCEDEM 0S 70% DAS NOTAS</span>';
    

    /* Porcentagem que representa os dados anteriores em relação ao total de alunas*/ 
    var mediaPorcentoAlunas = parseInt((mediaAlunas * 100 / students.length));
    var finalTotal = document.getElementById("mediaPorcentoAlunas");
    finalTotal.innerHTML = mediaPorcentoAlunas + '%' + "<br>" + "<span> % TOTAL " + "(" + students.length + ")</span>"; 
  }

//tópico cinco
var ratings = data[sede][turma].ratings;
  var npsQtd = 0;
  var promoters = 0;
  var passive = 0;
  var detractors = 0;
  var cumpre = 0;
  var superAvit = 0;
  var naoCumpre = 0;
  var mentores = 0;
  var jedi = 0;

  for (var i = 0; i < ratings.length; i++) {
    var menos = ratings[i]['nps']['promoters'] - ratings[i]['nps']['detractors'];
    npsQtd = npsQtd + menos;
    promoters = promoters + ratings[i]['nps']['promoters'];
    passive = passive + ratings[i]['nps']['passive'];
    detractors = detractors + ratings[i]['nps']['detractors'];
    
    cumpre = cumpre + ratings[i]['student']['cumple'];
    superAvit = superAvit + ratings[i]['student']['supera'];
    naoCumpre = naoCumpre +  ratings[i]['student']['no-cumple'];

    mentores = mentores + ratings[i]['teacher'];
    jedi = jedi + ratings[i]['jedi'];
  }
  var totalGeral = parseInt(npsQtd/ratings.length);
  
  /* Cálculo do NPS médio específico */
  var metricaPromoters = parseInt(promoters/ratings.length);
  var metricaPassive = parseInt(passive/ratings.length);
  var metricaDetractors = parseInt(detractors/ratings.length);

  var finalNps = document.getElementById("finalNps");
  finalNps.innerHTML = totalGeral + '%' + '<br>' + '<span>% NPS ACUMULADO</span>';
  var medioSpeciNps = document.getElementById("medioSpecicNps");
  medioSpeciNps.innerHTML = '<span>' + metricaPromoters + '%' + ' PROMOTERS' + '<br>' + metricaPassive + '%' + ' PASSIVE' + '<br>' + metricaDetractors + '%' + ' DETRACTORS' + '</span>';
  //medioSpeciNps.appendChild(medioSpeciNps);
  var nps = document.getElementById("nps");
  nps.setAttribute("class", "box");
  var dadosNps = document.getElementById("dadosNps");
  dadosNps.innerHTML = "NET PROMOTER SCORE (NPS)" + '<hr class="hr-data-title"></hr>' + '<span class="description">RECOMENDAÇÃO DAS ESTUDANTES PERANTE À LABORATORIA</span>' + '<br>' + '<span class="description">(NPS MÉDIO DOS SPRINTS)</span>';
  dadosNps.appendChild(dadosNps);
}


 /*A quantidade e porcentagem que representa o total de alunas que excedem a meta de pontos de HSE em média e sprint*/
 var hsePointsSprints = [0, 0, 0, 0];
  
 for (var s = 0; s < students.length; s++) {
   var aluna= students[s];
   var alunasSprints = students.sprints;

   for (var t = 0; t < students.length; t++) {
     var sprint = alunasSprints[t];
   
     if (sprint.score.hse > 1200) {
      hsePointsSprints[t] =  hsePointsSprints[t] + 1;
     }
   } 
 }

 var finalHse = document.getElementById('hseNumber');
 finalHse.innerHTML = '<span class="sprint">SPRINT 1 = </span>' + hsePointsSprints[0] + '<br>' + '<span class="sprint">SPRINT 2 = </span>' + hsePointsSprints[1] + '<br>' + '<span class="sprint">SPRINT 3 = </span>' + hsePointsSprints[2] + '<br>' + '<span class="sprint">SPRINT 4 = </span>' + hsePointsSprints[3] + '<br>' + '<span>NÚMERO DE ESTUDANTES</span>';

 var porcentagemHse = document.getElementById('porcentagemHse');
 porcentagemHse.innerHTML = '<span class="sprint">SPRINT 1 = </span>' + parseInt(hsePointsSprints[0] * 100 / students.length) + '%' + '<br>' + '<span class="sprint">SPRINT 2 = </span>' + parseInt(hsePointsSprints[1] * 100 / students.length) + '%' + '<br>' + '<span class="sprint">SPRINT 3 = </span>' + parseInt(hsePointsSprints[2] * 100 / students.length) + '%' + '<br>' + '<span class="sprint">SPRINT 4 = </span>' + parseInt(hsePointsSprints[3] * 100 / students.length) + '%' + '<br>' + '<span>% DE ESTUDANTES</span>';

 var hsePoints = document.getElementById('hseScores');
 hsePoints.setAttribute('class', 'box');
 var hseData =  document.getElementById('hseData');
 hseData.innerHTML = 'ESTUDANTES QUE EXCEDEM A MÉDIA DE HSE' + '<hr class="hr-data-title"></hr>';


var techPointsSprint = [0, 0, 0, 0];
  
  for (var s = 0; s < alunas.length; s++) {
    var aluna = alunas[s];
    var alunaSprints = alunas.sprints;

    for (var t = 0; t < alunaSprints.length; t++) {
      var sprint = alunaSprints[t];
    
      if (sprint.score.tech > 1800) {
        techPointsSprint[t] = techPointsSprint[t] + 1;
      }
    } 
  }
  
  var finallTech = document.getElementById("techPoints");
  finalTech.innerHTML = '<span class="sprint">SPRINT 1 = </span>' + techPointsSprint[0] + '<br>' + '<span class="sprint">SPRINT 2 = </span>' + techPointsSprint[1] + '<br>' + '<span class="sprint">SPRINT 3 = </span>' + techPointsSprint[2] + '<br>' + '<span class="sprint">SPRINT 4 = </span>' + techPointsSprint[3] + '<br>' + '<span> Estudantes que excederam pontos Tech.</span>';

  var porcentagemTech = document.getElementById("porcentagemTech");
  porcentagemTech.innerHTML = '<span class="sprint">SPRINT 1 = </span>' + parseInt(techPointsSprint[0] * 100 / alunas.length) + '%' + '<br>' + '<span class="sprint">SPRINT 2 = </span>' + parseInt(techPointsSprint[1] * 100 / alunas.length) + '%' + '<br>' + '<span class="sprint">SPRINT 3 = </span>' + parseInt(techPointsSprint[2] * 100 / alunas.length) + '%' + '<br>' + '<span class="sprint">SPRINT 4 = </span>' + parseInt(techPointsSprint[3] * 100 / alunas.length) + '%' + '<br>' + '<span> % DE ESTUDANTES</span>';

  var techPoints = document.getElementById("techPoints");
  techPoints.setAttribute("class", "box");
  var techData=  document.getElementById("techData");
  techData.innerHTML = "ESTUDANTES QUE EXCEDEM A MÉDIA TECH" + '<hr class="hr-data-title"></hr>';

  var satisfied = document.getElementById('satisfied');
  satisfaction.setAttribute('class', 'box');
  var satisfiedData =  document.getElementById('satisfiedData');
  satisfiedData.innerHTML = 'MÉDIA DE SATISFAÇÃO DAS ESTUDANTES' + '<hr class="hr-data-title"></hr>' + '<span class="description">ESTUDANTES SATISFEITAS COM A EXPERIÊNCIA DA LABORATORIA <br> (CUMPRE, SUPERA OU NÃO CUMPRE ÀS EXPECTATIVAS)</span>';
  var porcentagemSatisfied = document.getElementById('porcentagemSatisfied');
  porcentagemSatisfied.innerHTML = '<span class="sprint">CUMPRE = </span>' + parseInt((cumpre/ratings.length)) + '%' + '<br>' + '<span class="sprint">SUPERA = </span>' + parseInt((superAvit/ratings.length)) + '%' + '<br>' + '<span class="sprint">NÃO CUMPRE = </span>' + parseInt((naoCumpre/ratings.length)) + '%';

 /* Pontuação média dos mentores */
 var mentors = mentores/ratings.length;
 var mentors = document.getElementById('mentors');
 mentors.setAttribute('class', 'box');
 var mentoresData =  document.getElementById('mentoresData');
 mentoresData.innerHTML = 'PONTUAÇÃO MÉDIA DE MENTORES' + '<hr class="hr-data-title"></hr>';
 var pontosMentores = document.getElementById('pontosMentores');
 pontosMentores.innerHTML = finallMentors.toFixed(1) + '<br>' + '<span>PONTUAÇÃO MÁXIMA: 5.0</span>';

 /* Pontuação média dos mestres Jedi */
 var finalJedi = jedi/ratings.length;
 var jedi = document.getElementById('jedi');
 jedi.setAttribute('class', 'box');
 var jediData =  document.getElementById('jediData');
 jediTitle.innerHTML = "PONTUAÇÃO MÉDIA DE JEDI'S" + '<hr class="hr-data-title"></hr>';
 var pontosJedi = document.getElementById('pontosJedi');
 pontosJedi.innerHTML = finalJedi.toFixed(1) + '<br>' + '<span>PONTUAÇÃO MÁXIMA: 5.0</span>';
}




