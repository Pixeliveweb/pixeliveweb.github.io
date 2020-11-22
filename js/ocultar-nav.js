$(".menu-bar").on("click",function(){
    $(".contain").toggleClass("mostrar-nav");
    $(".logos2").toggleClass("mostrar-bar");
    $(".header").toggleClass("menu-t");
    $(".seccion").removeClass("nav-sec");
    $(".abrirSec .we").removeClass("black");
})

var mediaqueryList = window.matchMedia("(max-width: 900px)");

$(".main").on("mouseover",function(){
    if(mediaqueryList.matches){
        $(".contain").removeClass("mostrar-nav");
        $(".logos2").removeClass("mostrar-bar");
        $(".header").removeClass("menu-t");
        $(".seccion").removeClass("nav-sec");
        $(".abrirSec .we").removeClass("black");
    }
})

$(".abrirSec").on("click",function(){
    $(".seccion").toggleClass("nav-sec");
    $(".abrirSec .we").toggleClass("black");
})

$(".text_secf").on("click",function(){
    $(".text_secf").removeClass("text_secf2");
})
