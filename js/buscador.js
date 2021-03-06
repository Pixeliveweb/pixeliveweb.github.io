const buscador = document.querySelector('#buscador');
const limpiar = document.querySelector('#limpiar');
const buscadorBtn = document.querySelector('#buscadorBtn');
const offSearch = document.getElementById("off-search");

const filtrar = ()=>{
    btns();
    const busqueda = buscador.value.toLowerCase();
    programas = document.querySelectorAll("h3[class = 'text-program']") ;
    var visibles = programas.length;
    for(let programa of programas){
        let nombre  = programa.innerHTML.toLowerCase();
        var prom = programa.parentNode.parentNode;
        if(nombre.indexOf(busqueda) !== -1){
            prom.classList.remove('oculto');
            visibles += 1;
        }
        else{
            prom.classList.add('oculto');
            visibles -= 1;
        }
        if(visibles === 0){
            offSearch.classList.remove('oculto');
        }
        else{
            offSearch.classList.add('oculto');
        }
    }
    $("#buscador").keypress(function(e){
        if(e.which == 13){
            buscador.blur();
        }
    })
}

function borrarSearch(){
    buscador.value="";
    filtrar();
}

function btns(){
    if(buscador.value !==""){
        buscadorBtn.classList.add("oculto");
        limpiar.classList.remove("oculto");
    }
    else{
        buscadorBtn.classList.remove("oculto");
        limpiar.classList.add("oculto");
    }
}

limpiar.addEventListener('click', borrarSearch); 
buscador.addEventListener('keyup', filtrar);

filtrar();
