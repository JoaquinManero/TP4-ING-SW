const cboFormaPago = document.querySelector("#cboFormaPago");
const cboRecibimiento = document.querySelector("#cboRecibimiento");
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
const divFechaHora = document.querySelector("[class=divFechaHora]")
const elemento = document.getElementById('hola');

//---------------------------------------------------------
//Ocultar y mostrar directorio.
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

//---------------------------------------------------------
//Ocultar y mostrar directorio.
cboRecibimiento.addEventListener("change", () => {
    if (cboRecibimiento.value === "antes-posible"){
        divFechaHora.style.display = "none";
    }
    if (cboRecibimiento.value === "fecha-hora"){
        divFechaHora.style.display = "block";
    }
})
//---------------------------------------------------------
//Funcionalidad de boton pedido.

let btn_pedido = document.getElementById("pedido");
btn_pedido.addEventListener("click", Pedido);

function Pedido () {
    if (validarTodo()){
        console.log("hola");
    }
}
//---------------------------------------------------------
//function hacer_pedido () {
    //if (validar_domicilio()){
      //  console.log("hola")
    //}
    //if (validar_recibimiento()){
      //  console.log("hola")
    //}
    //if (validar_formaDePago()){
      //  console.log("hola")
        
    //}}
//}

function redireccionar(){
    location.href = "indexPantallaCarga.html"
}

//---------------------------------------------------------
//Validaciones.

function validarTodo(){
    let calle = document.getElementById("calle");
    let nro_calle = document.getElementById("numeroCalle");
    let ciudad = document.getElementById("cboCiudad");
    let recib = document.getElementById("cboRecibimiento");
    let fecha_hora = document.getElementById("fecha-hora");
    let cboFormaDePagos = document.getElementById("cboFormaPago");
    let monto = document.getElementById("monto");
    let nomApeTitular = document.getElementById("nombre_apellido_titular");
    let fechaVto = document.getElementById("fechaVto");
    let codigo = document.getElementById("CVC");
    let error_calle = document.getElementById("error-calle");
    let error_nro_calle = document.getElementById("error-nro-calle");
    let error_ciudad = document.getElementById("error-ciudad");
    let error_recib = document.getElementById("error-recib");
    let error_fechaHora = document.getElementById("error-fechaHora")
    let error_formaPago = document.getElementById("error-formaPago");
    let error_nroTarjeta = document.getElementById("error-numeroTarjeta");
    let error_nomApeTit = document.getElementById("error-nomApeTit");
    let error_fechaVto = document.getElementById("error-fechaVto");
    let error_codigo = document.getElementById("error-CVC");
    let error_efectivos = document.getElementById("error-efectivo");


    if (calle.value != ""){
        error_calle.style.display = "none";
        if (nro_calle.value != ""){
            error_nro_calle.style.display = "none";
            if (ciudad.value != ""){
                error_ciudad.style.display = "none";
                if (recib.value != ""){
                    error_recib.style.display = "none";
                    if (fecha_hora.value != ""){
                        error_fechaHora.style.display = "none";
                        if (cboFormaDePagos.value != ""){
                            error_formaPago.style.display = "none";
                            if (monto.value != ""){
                                error_efectivos.style.display ="none";
                                redireccionar();
                            }
                            if (nroTarjeta.value != ""){
                                error_nroTarjeta.style.display = "none";
                                if (nomApeTitular.value != ""){
                                    error_nomApeTit.style.display = "none";
                                    if (fechaVto.value != ""){
                                        error_fechaVto.style.display = "none";
                                        if (codigo.value != ""){
                                            error_codigo.style.display = "none";
                                            redireccionar();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (calle.value == ""){
        error_calle.style.display = "block";
        if (nro_calle.value == ""){
            error_nro_calle.style.display = "block";
            if (ciudad.value == ""){
                error_ciudad.style.display = "block";
                if (recib.value == ""){
                    error_recib.style.display = "block";
                    if (fecha_hora.style.display == ""){
                        error_fechaHora.style.display = "block";
                        if (validar_formaDePago()){
                            redireccionar();
                        }
                    }
                }
            }
        }
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
    else    {
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

}


function validar_recibimiento(){
    let recib = document.getElementById("cboRecibimiento");
    let fecha_hora = document.getElementById("fecha-hora");
    var hoy = new Date()
    //var fechas = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2) ;
    var fechas = ('0' + hoy.getDate()).slice(-2) + '/' +('0' + (hoy.getMonth() + 1)).slice(-2) + '/' + hoy.getFullYear()
    var hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);

    var fecha_hora_hoy = fechas + ' ' + hora;
    console.log(fecha_hora)
    //document.getElementById('fecha-hora').value = fecha_hora;

    // Error Recibimiento
    let error_recib = document.getElementById("error-recib");
    if (recib.value == ""){
        error_recib.style.display = "block";
        return false;
    }
    else {
        error_recib.style.display = "none";
    }
    //Error fecha y hora

    let error_fechaHora = document.getElementById("error-fechaHora")
    if (fecha_hora_hoy <= fecha_hora){
        error_fechaHora.style.display = "block";
        return false;
    }
    if (fecha_hora_hoy > fecha_hora){
        error_fechaHora.style.display = "none";
    }
}

function validar_formaDePago(){
    let cboFormaDePagos = document.getElementById("cboFormaPago");
    let monto = document.getElementById("monto");
    let numTarjeta = document.getElementById("nroTarjeta");
    let nomApeTitular = document.getElementById("nombre_apellido_titular");
    let fechaVto = document.getElementById("fechaVto");
    let codigo = document.getElementById("CVC");

    // Error formaPago
    let error_formaPago = document.getElementById("error-formaPago");
    let error_nroTarjeta = document.getElementById("error-numeroTarjeta");
    let error_nomApeTit = document.getElementById("error-nomApeTit");
    let error_fechaVto = document.getElementById("error-fechaVto");
    let error_codigo = document.getElementById("error-CVC");

    if (cboFormaDePagos.value == ""){
        error_formaPago.style.display = "block";
        if (nroTarjeta.value == ""){
            error_nroTarjeta.style.display ="block";
            if ((nroTarjeta.value == "") && (nomApeTitular.value == "")){
                error_nroTarjeta.style.display ="block";
                error_nomApeTit.style.display = "block";
                if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "")){
                    error_nroTarjeta.style.display ="block";
                    error_nomApeTit.style.display = "block";
                    error_fechaVto.style.display = "block";
                    if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "") && (codigo.value == "")){
                        error_nroTarjeta.style.display ="block";
                        error_nomApeTit.style.display = "block";
                        error_fechaVto.style.display = "block";
                        error_codigo.style.display = "block";
                        return false
                    }
                    return false;
                }
                return false;
            }
        }
        return false;
    }
    else {
        error_formaPago.style.display = "none";
        if (nroTarjeta.value != ""){
            error_nroTarjeta.style.display = "none";
            if ((nroTarjeta.value != "") && (nomApeTitular.value != "")){
                error_nroTarjeta.style.display ="none";
                error_nomApeTit.style.display = "none";
                if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "")){
                    error_nroTarjeta.style.display ="none";
                    error_nomApeTit.style.display = "none";
                    error_fechaVto.style.display = "none";
                    if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "") && (codigo.value != "")){
                        error_nroTarjeta.style.display ="none";
                        error_nomApeTit.style.display = "none";
                        error_fechaVto.style.display = "none";
                        error_codigo.style.display = "none";
                    }
                }
            }
        }
    
    }

    if (cboFormaDePagos.value == "Credito/Debito"){
        error_formaPago.style.display = "none";
        if (nroTarjeta.value == ""){
            error_nroTarjeta.style.display ="block";
            if ((nroTarjeta.value == "") && (nomApeTitular.value == "")){
                error_nroTarjeta.style.display ="block";
                error_nomApeTit.style.display = "block";
                if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "")){
                    error_nroTarjeta.style.display ="block";
                    error_nomApeTit.style.display = "block";
                    error_fechaVto.style.display = "block";
                    if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "") && (codigo.value == "")){
                        error_nroTarjeta.style.display ="block";
                        error_nomApeTit.style.display = "block";
                        error_fechaVto.style.display = "block";
                        error_codigo.style.display = "block";
                        return false
                    }
                    return false;
                }
                return false;
            }
        }
        return false;
    }
    else {
        error_formaPago.style.display = "none";
        if (nroTarjeta.value != ""){
            error_nroTarjeta.style.display = "none";
            if ((nroTarjeta.value != "") && (nomApeTitular.value != "")){
                error_nroTarjeta.style.display ="none";
                error_nomApeTit.style.display = "none";
                if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "")){
                    error_nroTarjeta.style.display ="none";
                    error_nomApeTit.style.display = "none";
                    error_fechaVto.style.display = "none";
                    if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "") && (codigo.value != "")){
                        error_nroTarjeta.style.display ="none";
                        error_nomApeTit.style.display = "none";
                        error_fechaVto.style.display = "none";
                        error_codigo.style.display = "none";
                    }
                }
            }
        }
    }

    //Error monto
    let error_efectivos = document.getElementById("error-efectivo");
    if (monto.value == ""){
        error_efectivos.style.display = "block";
        return false;
    }
    else {
        error_efectivos.style.display = "none"
    }

}




