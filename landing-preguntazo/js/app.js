(function(){
"use strict";
var $=function(s){return document.querySelector(s)};
var ROLES=[
{n:"Diseño web",e:"🎨",d:"Construye y publica la landing page.",w:"Wix, WordPress o HTML/CSS/JS; Canva para imágenes",out:"Página publicada y adaptada a móvil",t:["Elegir plantilla, colores y tipografía","Redactar el titular y la llamada a la acción","Probar la página en móvil y en ordenador"],h:"Entrega la URL al rol de Formulario para incrustarlo."},
{n:"Formulario y datos",e:"📋",d:"Recoge el correo y gestiona los registros.",w:"Google Forms o Microsoft Forms; Sheets o Excel",out:"Formulario con validación y hoja de registros",t:["Crear el campo de correo con validación","Conectar las respuestas a la hoja de cálculo","Añadir el enlace al juego en el mensaje de confirmación"],h:"Entrega el formulario a Diseño web y los registros a Legal para revisarlos."},
{n:"Preguntas del juego",e:"❓",d:"Prepara el banco de preguntas y el juego.",w:"Kahoot, Socrative o Genially",out:"Juego con al menos 10 preguntas y respuestas",t:["Escribir preguntas sobre los contenidos trabajados","Ordenar por dificultad y añadir puntos","Revisar que cada pregunta tenga una sola respuesta correcta"],h:"Entrega el enlace del juego al rol de Formulario."},
{n:"Legal y seguridad",e:"🛡️",d:"Cuida los datos y las licencias.",w:"RGPD y LOPDGDD, Creative Commons",out:"Texto de privacidad y lista de licencias",t:["Pedir solo el correo imprescindible y redactar el consentimiento","Comprobar licencias y citar la autoría de imágenes y música","Revisar contraseñas seguras y que no se publiquen los correos"],h:"Si hay menores de 14 años, pide el consentimiento de las familias antes de publicar."}
];
var QS=[
{q:"¿Qué animal es el mamífero más grande del mundo?",o:["Elefante africano","Ballena azul","Jirafa","Tiburón blanco"],c:1},
{q:"¿Cuánto es 7 × 8?",o:["54","48","56","64"],c:2},
{q:"¿Qué color se forma al mezclar azul y amarillo?",o:["Morado","Naranja","Marrón","Verde"],c:3}];
var RANK=[["Lucía M.",1250,"🦊"],["Mateo R.",1180,"🦁"],["Noa P.",1040,"🐙"],["Hugo S.",920,"🦖"],["Carmen T.",810,"🐝"]];
var state={tab:0,done:{},who:{}};
try{var s=JSON.parse(localStorage.getItem("pz-team")||"null");if(s&&s.done)state.done=s.done,state.who=s.who||{}}catch(e){}
function save(){try{localStorage.setItem("pz-team",JSON.stringify({done:state.done,who:state.who}))}catch(e){}}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

/* Formulario */
$("#form").addEventListener("submit",function(ev){
  ev.preventDefault();
  var m=$("#correo").value.trim().toLowerCase(),okMail=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m),okC=$("#ok").checked;
  $("#e1").textContent=okMail?"":"Escribe un correo con formato nombre@ejemplo.com.";
  $("#e2").textContent=okC?"":"Marca la casilla para continuar.";
  if(okMail&&okC){$("#form").classList.add("hidden");$("#done").classList.remove("hidden");$("#done .btn").focus()}
});

/* Roles */
function renderTabs(){
  $("#tabs").innerHTML=ROLES.map(function(r,i){return '<button class="tab" role="tab" id="t'+i+'" aria-selected="'+(i===state.tab)+'" aria-controls="panel" tabindex="'+(i===state.tab?0:-1)+'" data-i="'+i+'">'+r.e+" "+r.n+"</button>"}).join("");
}
function renderPanel(){
  var r=ROLES[state.tab],i=state.tab;
  $("#panel").setAttribute("aria-labelledby","t"+i);
  $("#panel").innerHTML='<div><h3>'+r.e+" "+esc(r.n)+'</h3><p style="font-weight:700;margin:8px 0 12px">'+esc(r.d)+'</p>'
  +'<label for="who">Responsable</label><input id="who" type="text" maxlength="40" placeholder="Nombre de quien asume el rol" value="'+esc(state.who[i]||"")+'">'
  +'<p style="margin:16px 0 4px;font-weight:800">Herramientas</p><span class="tag">'+esc(r.w)+'</span>'
  +'<p style="margin:12px 0 4px;font-weight:800">Entregable</p><p style="margin:0;font-weight:700">'+esc(r.out)+'</p></div>'
  +'<div><p style="margin:0;font-weight:800">Tareas</p><ul class="tasks">'+r.t.map(function(t,k){var key=i+"-"+k;return '<li><label><input type="checkbox" data-k="'+key+'"'+(state.done[key]?" checked":"")+'><span>'+esc(t)+'</span></label></li>'}).join("")+'</ul><div class="handoff">'+esc(r.h)+'</div></div>';
}
function progress(){
  var n=0,tot=ROLES.length*3;for(var k in state.done)if(state.done[k])n++;
  $("#pTxt").textContent=n+" de "+tot+" tareas";$("#pBar").style.width=(n/tot*100)+"%";
}
$("#tabs").addEventListener("click",function(e){var b=e.target.closest(".tab");if(!b)return;state.tab=+b.dataset.i;renderTabs();renderPanel();$("#t"+state.tab).focus()});
$("#tabs").addEventListener("keydown",function(e){
  var d=e.key==="ArrowRight"?1:e.key==="ArrowLeft"?-1:0;if(!d)return;
  state.tab=(state.tab+d+ROLES.length)%ROLES.length;renderTabs();renderPanel();$("#t"+state.tab).focus();e.preventDefault();
});
$("#panel").addEventListener("change",function(e){if(e.target.dataset.k){state.done[e.target.dataset.k]=e.target.checked;save();progress()}});
$("#panel").addEventListener("input",function(e){if(e.target.id==="who"){state.who[state.tab]=e.target.value;save()}});

/* Juego */
var ans,score;
function renderQuiz(){
  ans=QS.map(function(){return null});score=0;
  $("#quiz").innerHTML=QS.map(function(q,i){return '<div class="sticker q"><h3>'+(i+1)+". "+esc(q.q)+'</h3><div class="opts">'+q.o.map(function(o,j){return '<button class="opt" data-q="'+i+'" data-o="'+j+'">'+esc(o)+"</button>"}).join("")+'</div><p class="fb" aria-live="polite"></p></div>'}).join("");
  $("#score").textContent="Puntos: 0";
}
$("#quiz").addEventListener("click",function(e){
  var b=e.target.closest(".opt");if(!b||b.disabled)return;
  var qi=+b.dataset.q,oi=+b.dataset.o,card=b.closest(".q"),good=oi===QS[qi].c;
  ans[qi]=oi;
  card.querySelectorAll(".opt").forEach(function(x,j){x.disabled=true;if(j===QS[qi].c)x.classList.add("good");else if(x===b)x.classList.add("bad")});
  card.querySelector(".fb").textContent=good?"¡Correcto! +100 puntos":"Casi. La respuesta correcta es: "+QS[qi].o[QS[qi].c]+".";
  if(good)score+=100;
  $("#score").textContent="Puntos: "+score;
  if(ans.every(function(a){return a!==null}))renderRank();
});
$("#again").addEventListener("click",function(){renderQuiz();renderRank()});

/* Ranking */
function renderRank(){
  var list=RANK.map(function(r){return{n:r[0],p:r[1],e:r[2]}});
  if(ans&&ans.every(function(a){return a!==null}))list.push({n:"Tú",p:score,e:"⭐",me:true});
  list.sort(function(a,b){return b.p-a.p});
  $("#rank").innerHTML=list.map(function(r,i){return '<li class="sticker'+(r.me?" me":"")+'"><span class="pos">'+(i+1)+'</span><span>'+r.e+" "+esc(r.n)+'</span><span class="pts">'+r.p+" pts</span></li>"}).join("");
}

renderTabs();renderPanel();progress();renderQuiz();renderRank();
})();
