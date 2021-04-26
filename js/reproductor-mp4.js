const videos = document.querySelector(".p-video");

function abrirRepro(){
    var location;
    var url = document.querySelector(".video.activo .link");
    if(url.id === "local"){
        location =  '<video class = "video-repro-local" src="videos/' + url.innerHTML + '"controls controlslist="nodownload" autoplay></video>';
    }else{
        location = '<iframe class = "video-repro-online" width="100%" height="400px" src="https://www.youtube.com/embed/' + url.innerHTML + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }
    Swal.fire({ 
        html: location, 
        customClass: 'swal-video',
        background : 'rgb(35 35 35)',
        padding: '1rem',
        showConfirmButton: false
    })
}


videos.addEventListener('click', event => {
    var objetivo = event.target;
    if(objetivo.className === "img-video" || objetivo.className === "fab fa-youtube"){
        if(document.querySelector(".video.activo")){
            document.querySelector(".video.activo").classList.remove("activo");
        }
        objetivo= objetivo.parentNode;
        objetivo.classList.add("activo");
        abrirRepro();
        estadoAudio.className = "far fa-play-circle";
        reproductor.pause();
        document.querySelector(".p-audio .icon-title-part").classList.remove("activo");
        document.querySelector(".p-video .icon-title-part").classList.add("activo");
    }
})