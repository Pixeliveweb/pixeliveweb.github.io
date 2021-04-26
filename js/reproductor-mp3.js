const TmBtn = document.querySelector("#TmBtn");
const descrip = document.querySelector(".descripcion");
const body = document.querySelector("body");
const repro = document.querySelector(".auproms");
const items = document.querySelector(".items");
const barras = document.querySelector(".barras");
const img = document.querySelector(".semanal");
const reproAu = document.querySelector(".audio");
const ultimoProm = document.querySelector(".content-programs").childNodes[1];
const listado = document.querySelector(".content-programs");
const titulo = document.querySelector(".auproms h2");
const estadoAudio = document.querySelector("#estadoAudio");
const anterior = document.querySelector("#anteriorAudio");
const siguiente = document.querySelector("#siguienteAudio");
const reproductor = document.createElement("audio");
const progress = document.querySelector("#bar");
const current = document.querySelector("#current");
const duracion = document.querySelector("#duration");
const fill = document.querySelector(".ctrls .fill");
const barVolumen = document.querySelector("#volumen");
const fillVolumen = document.querySelector(".ranHover .fill");
const btnVol = document.querySelector("#btn-Vol");
const vol2 = document.querySelector(".vol2");

var posAu = 0;
var nivelVol = 1;

function cambioTm(caso){
    items.classList.toggle("btn-top");
    TmBtn.classList.toggle("reflejo");
    descrip.classList.toggle("abajo-desp");
    body.classList.toggle("ventana");
    repro.classList.toggle("auproms-bot");
    barras.classList.toggle("opacity-0");
    img.classList.toggle("new-repro");
    titulo.classList.toggle("opacity-0");
    reproAu.classList.toggle("new-repro");
    if(repro.className === "auproms auproms-bot"){
        img.addEventListener('click', cambioTm);
    }else{
        img.removeEventListener('click', cambioTm);
    }
}

function sources(ubicacion){
    if(ubicacion <= -1){
        if(ubicacion === -1){
            sources(listado.children[ubicacion]);
        }else{
            reproductor.src = "programas/"+ultimoProm.childNodes[3].innerHTML;
            img.src = ultimoProm.childNodes[1].childNodes[1].src;
            titulo.innerHTML = ultimoProm.childNodes[1].childNodes[5].innerHTML; 
            descrip.childNodes[1].innerHTML = ultimoProm.childNodes[5].innerHTML;
            ultimoProm.id ="activo";
        }
        anterior.classList.add("oculto");
    }
    else{
        if(ubicacion >= 0){
            if(ubicacion > 0){
                anterior.classList.remove("oculto");
            }else{ 
                anterior.classList.add("oculto");
            }
            if(ubicacion === (listado.children.length - 2)){
                siguiente.classList.add("oculto");
            }else{
                siguiente.classList.remove("oculto");
            }
            sources(listado.children[ubicacion]);
        }
        else{
            document.getElementById("activo").id= "";
            ubicacion.id = "activo";
            posAu = posicion();
            if(posAu > 0){
                anterior.classList.remove("oculto");
            }else{ 
                anterior.classList.add("oculto");
            }
            if(posAu === (listado.children.length - 2)){
                siguiente.classList.add("oculto");
            }else{
                siguiente.classList.remove("oculto");
            }
            reproductor.src = 'programas/'+ubicacion.childNodes[3].innerHTML;
            reproductor.autoplay = true;
            img.src = ubicacion.childNodes[1].childNodes[1].src; 
            titulo.innerHTML = ubicacion.childNodes[1].childNodes[5].innerHTML; 
            descrip.childNodes[1].innerHTML = ubicacion.childNodes[5].innerHTML;
            estadoAudio.className = "far fa-pause-circle"   
        }
    }
}

function durationAU(segundos){
    var hour = Math.floor(segundos / 3600);
    hour = (hour < 10)? '0' + hour : hour;
    var minute = Math.floor((segundos / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;
    var second = segundos % 60;
    second = parseInt(second);
    second = (second < 10)? '0' + second : second;
    if(reproductor.duration >= 3600){
        return(hour + ':' + minute + ':' + second);
    }else{
        if(reproductor.duration >=60){
            return( minute + ':' + second);
        }else{
            return(second);
        }
    }
}

function audRed(){
	reproductor.setAttribute("src","");
	reproAu.appendChild(reproductor);
}

function iniciar(){
    audRed();
    sources(-2);
    img.addEventListener('click', cambioTm);
    reproductor.crossorigin="anonymous";
}

listado.addEventListener('click', event => {
    let objetivo = event.target.parentNode.parentNode;
    if(objetivo.className === "program"){
        sources(objetivo);
        active_audio();
    }
})

function active_audio(){
    if(document.querySelector(".p-video")){    
        document.querySelector(".p-audio .icon-title-part").classList.add("activo");
        document.querySelector(".p-video .icon-title-part").classList.remove("activo");
    }
}

function reproduccion(){
    if(estadoAudio.className === "far fa-pause-circle"){
        estadoAudio.className = "far fa-play-circle";
        reproductor.pause();
    }else{
        estadoAudio.className = "far fa-pause-circle";
        reproductor.play();
    }
    active_audio();
}

function reproAnterior(){
    var x = posicion() - 1;
    sources(x);
}

function reproSiguiente(){
    var x = posicion() + 1;
    sources(x);
}

function posicion(){
    var x = listado.children.length;
    for(var j = 0; j < (x-1); j++){
        if(listado.children[j].id === "activo"){
            return j;
        }
    }
}

function progressBar(){
    progress.value = (reproductor.currentTime / reproductor.duration)*10000;
    fill.style.width = (progress.value/100) + "%";
    current.innerHTML = durationAU(reproductor.currentTime);
    duracion.innerHTML = durationAU(reproductor.duration);
}

function actualizarTemp(){
    reproductor.currentTime = (progress.value * reproductor.duration)/10000;
    fill.style.width = (progress.value/100) + "%";
    reproductor.pause();
    estadoAudio.className = "far fa-play-circle";
}

function progressVol(volN){
    if(volN>-1){
        barVolumen.value = volN*100;
    }
    reproductor.volume = (barVolumen.value/100);
    fillVolumen.style.width = barVolumen.value + "%";
    if(barVolumen.value>66){
        btnVol.className = "fas fa-volume-up";
        vol2.children[0].className = "fas fa-volume-up";
    }else{
        if(barVolumen.value>33){
            btnVol.className = "fas fa-volume-down";
            vol2.children[0].className = "fas fa-volume-down";
        }else{
            if(barVolumen.value>0){
                btnVol.className = "fas fa-volume-off";
                vol2.children[0].className = "fas fa-volume-off";
            }else{
                btnVol.className = "fas fa-volume-mute";
                vol2.children[0].className = "fas fa-volume-mute";
            }
        }
    }
}

function muteVolume(){
    if( btnVol.className !== "fas fa-volume-mute"){
        nivelVol = reproductor.volume;
        progressVol(0);
    }
    else{
        progressVol(nivelVol);
    }
}

function volumeMobil(){
    if(reproductor.volume > 0){
        progressVol(reproductor.volume - (34/100));
    }else{
        progressVol(1);
    }
}

reproductor.addEventListener('timeupdate', progressBar);
progress.addEventListener('input', actualizarTemp);
progress.addEventListener('change', reproduccion);
barVolumen.addEventListener('input', progressVol);
btnVol.addEventListener('click', muteVolume);
vol2.addEventListener('click', volumeMobil);
TmBtn.addEventListener('click', cambioTm); 
estadoAudio.addEventListener('click', reproduccion);
anterior.addEventListener('click', reproAnterior);
siguiente.addEventListener('click', reproSiguiente);
window.addEventListener('load', iniciar);

reproductor.onended = function() {
    estadoAudio.className = "fas fa-redo-alt";
};

var canvas, canvas2, ctx2, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

window.addEventListener("load", initMp3Player);

window.addEventListener("keydown", function (event) {
    if(event.keyCode === 32 || event.keyCode === 13){
        if(event.keyCode === 32){
            if(repro.className === "auproms"){
                reproduccion();
            }
        }else{
            reproduccion();
        }
    }else{
        if((event.keyCode === 39) && (posAu <= (listado.children.length - 3))){
            reproSiguiente();
        }else{
            if((event.keyCode === 37) && (posAu >0)){
                reproAnterior();
            }else{
                if((event.keyCode === 27)&& (TmBtn.className === "fas fa-chevron-up reflejo")){
                    cambioTm();
                }
            }
        }
    }
},false);

function initMp3Player(){
    context = new AudioContext();
    analyser = context.createAnalyser();
    canvas = document.getElementById('analyzer_render');
    canvas2 = document.getElementById('analyzer_render-2');
    ctx = canvas.getContext('2d');
    ctx2 = canvas2.getContext('2d');
    source = context.createMediaElementSource(reproductor);
    source.connect(analyser);
    analyser.connect(context.destination);
    frameLooper();
}

function frameLooper(){
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var grd = ctx.createLinearGradient(0, 170, 0, 0);
    grd.addColorStop(0.5, "#fa5801");
    grd.addColorStop(0.4, "#e9570d");
    grd.addColorStop(0.3, "#d2551c");
    grd.addColorStop(0.2, "#ba532a");
    grd.addColorStop(0.1, "#8c5049");
    ctx.fillStyle = grd;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    grd = ctx2.createLinearGradient(0, 170, 0, 0);
    grd.addColorStop(0.1, "#8c5049");
    grd.addColorStop(0.2, "#5f4d67");
    grd.addColorStop(0.3, "#474b76");
    grd.addColorStop(0.4, "#314a85");
    grd.addColorStop(0.5, "#194894");
    ctx2.fillStyle = grd;
    bars = 200;
    for(var i = 0; i < bars; i++){
        bar_x = i * 2;
        bar_width = 0.8;
        bar_height = -(fbc_array[i] / 2);
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
        ctx2.fillRect(bar_x, canvas2.height, bar_width, bar_height);
    }
}

