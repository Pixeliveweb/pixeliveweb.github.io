$(".text_secf").on("click",function(){
    document.getElementById("img_secf").src="img/relojS.png";
    Swal.fire({
        icon: 'info', 
        html: '<h3 class="text_color">¡No olvides escucharnos todos los domingos a las 10 AM por la radio Universidad de Pamplona 94.9 Fm! ;)</h3>', 
        background : 'rgb(35 35 35)',
        padding: '2rem',
        timer: 6000,
        timerProgressBar: true,
        showConfirmButton: false,
        customClass: {
            timerProgressBar: 'timer-bar'
        }   
     })
})

$(".registro").on("click",function(){
    Swal.fire({
        icon: 'error',
        html: '<h3 class="text_color">¡Upss! Resgistro no disponible por el momento :(</h3>', 
        background : 'rgb(35 35 35)',
        padding: '2rem',
        timer: 5000,
        showConfirmButton: false,
        timerProgressBar: true,
        customClass: {
            timerProgressBar: 'timer-bar'
        }
     })
})

$(".sesion").on("click",function(){
    Swal.fire({
        icon: 'error',
        html: '<h3 class="text_color">¡Upss! Inicio de session no disponible por el momento :(</h3>', 
        background : 'rgb(35 35 35)',
        padding: '2rem',
        timer: 5000,
        showConfirmButton: false,
        timerProgressBar: true,
        customClass: {
            timerProgressBar: 'timer-bar'
        }
     })
})