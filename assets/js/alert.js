

function crearAlerta({ mensaje = 'campo nombre de jugador requerido', tipo = 'error'}) {

    const alert = document.createElement("div");
    alert.classList.add("alert");

    if(tipo == 'error') {
        alert.classList.add("alert--error");
    }else {
        alert.classList.add("alert--info");
    }

    

}
