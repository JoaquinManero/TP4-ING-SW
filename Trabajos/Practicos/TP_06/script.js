const cboFormaPago = document.querySelector("#cboFormaPago");
const monto = document.querySelector("[name=monto]");
const nroTarjeta = document.querySelector("[name=nroTarjeta]");
const nomApellidoTitular = document.querySelector("[name=nombre_apellido_titular]");
const fechaVto = document.querySelector("[name=fechaVto]");
const codigo = document.querySelector("[name=CVC]");
const divEfectivo = document.querySelector("[class=divEfectivo]");
const divNroTarjeta = document.querySelector("[class=divNroTarjeta]")
const divNomApeTitular = document.querySelector("[class=divNomApeTitular]")
const divFechaVto = document.querySelector("[class=divFechaVto]")
const divCVC = document.querySelector("[class=divCVC]")

cboFormaPago.addEventListener("change", () => {
    if (cboFormaPago.value === "Efectivo") {
      divNroTarjeta.style.display = 'none'
      divNomApeTitular.style.display = 'none'
      divFechaVto.style.display = 'none'
      divCVC.style.display = 'none'
      divEfectivo.style.display = 'block'
    } 
    if (cboFormaPago.value === "Credito/Debito") {
        divEfectivo.style.display = 'none';
        divNroTarjeta.style.display = 'block';
        divNomApeTitular.style.display = 'block'
        divFechaVto.style.display = 'block'
        divCVC.style.display = 'block'
    }
});

// Calle no vacía y texto
// Numero no vacío y texto
// Ciudad seleccionada

let btn_pedido = document.getElementById("pedido");
btn_pedido.addEventListener("click", validar_recibimiento);

function hacer_pedido () {
    if (validar_domicilio() ){
        console.log("Correcto domicilio");
    }
}

function validar_domicilio(){
    let calle = document.getElementById("calle");
    let nro_calle = document.getElementById("numeroCalle");
    let ciudad = document.getElementById("cboCiudad");

    // Error Calle
    let error_calle = document.getElementById("error-calle");
    if (calle.value == "" ||  !isNaN(calle.value)) {
        error_calle.style.display = "block";
        return false;
    }
    else {
        error_calle.style.display = "none";
    }

    // Error Nro Calle
    let error_nro_calle = document.getElementById("error-nro-calle");
    if (nro_calle.value == ""){
        error_nro_calle.style.display = "block";
        return false;
    }
    else {
        error_nro_calle.style.display = "none";
    }

    // Error Ciudad
    let error_ciudad = document.getElementById("error-ciudad");
    if (ciudad.value == ""){
        error_ciudad.style.display = "block";
        return false;
    }
    else {
        error_ciudad.style.display = "none";
    }

    return true;

}

function validar_recibimiento(){
    let recib = document.getElementById("cboRecibimiento");
    let fecha_hora = document.getElementById("fecha-hora");

    // Error Recibimiento
    let error_recib = document.getElementById("error-recib");
    if (recib.value == ""){
        error_recib.style.display = "block";
        return false;
    }
    else {
        error_recib.style.display = "none";
    }
    
    
}




