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


// RESUMEN del PEDIDO y cálculo del TOTAL.
let resumen = document.querySelector(".resumen");
let arrayJSON = JSON.parse(localStorage.getItem("productos"));
let total = 0;

for (det of arrayJSON) {
    detalle = document.createElement("div");
    detalle.innerHTML = `<div class="row detalle">
                            <div class="col-4">
                                <img src="${det.img}" alt="">
                            </div>
                            <div class="col-4">
                                <p>${det.nombre}</p>
                            </div>
                            <div class="col-4">
                                <p>$${det.precio}</p>
                            </div>
                        </div>`;

    total += parseInt(det.precio);
    resumen.append(detalle);
}

let total_pago = document.querySelector("#total-pago");
total_pago.innerHTML = "$" + total;


//Ocultar y mostrar recibimiento ANTES POSIBLE o FECHA Y HORA
cboRecibimiento.addEventListener("change", () => {
    if (cboRecibimiento.value === "antes-posible") {
        divFechaHora.style.visibility = "hidden";
    }
    if (cboRecibimiento.value === "fecha-hora") {
        divFechaHora.style.visibility = "visible";
    }
})


//Ocultar y mostrar forma de pago EFECTIVO o TARJETA
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


// Boton HACER PEDIDO

let btn_pedido = document.getElementById("pedido");
btn_pedido.addEventListener("click", Pedido);

function Pedido() {
    console.log("Validaciones:", validaciones());
    if (validaciones()) {
        redireccionar(); // hacer
    };
}

function redireccionar() {
    
    let pedido = {
        productos: arrayJSON,
        calle: document.getElementById("calle").value,
        nrocalle: document.getElementById("numeroCalle").value,
        ciudad: document.getElementById("cboCiudad").value,
        // referencia
        recibimiento: document.getElementById("cboRecibimiento").value,
        // que guardo si es antes posible
        // que guardo si es fecha y hora
        total: total,
        formapago: document.getElementById("cboFormaPago").value
        // que guardo si es efectivo
        // que guardo si es tarjeta
    }

    console.log(pedido);

    let pedidoJSON = JSON.stringify(pedido);
    localStorage.setItem("pedido", pedidoJSON);

    location.href = "indexPantallaCarga.html"
}

//---------------------------------------------------------

function validaciones() {

    // INPUTS
    let calle = document.getElementById("calle");
    let nro_calle = document.getElementById("numeroCalle");
    let ciudad = document.getElementById("cboCiudad");
    let recib = document.getElementById("cboRecibimiento");
    let fecha_hora = document.getElementById("fecha-hora");
    let cboFormaDePagos = document.getElementById("cboFormaPago");
    let monto = document.getElementById("monto");
    let numero_tarjeta = document.getElementById("nroTarjeta");
    let nomApeTitular = document.getElementById("nombre_apellido_titular");
    let fechaVto = document.getElementById("fechaVto");
    let codigo = document.getElementById("CVC");

    // ERRORES
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
    let error_efectivo = document.getElementById("error-efectivo");

    //Validacion de Domicilio

    // Nombre Calle
    if (calle.value == "" || !isNaN(calle.value)) {
        error_calle.style.display = "block";
        return false;
    }
    else {
        error_calle.style.display = "none";
    }

    // Nro Calle
    if (nro_calle.value == "" || nro_calle.value <= 0) {
        error_nro_calle.style.display = "block";
        return false;
    }
    else {
        error_nro_calle.style.display = "none";
    }

    // Ciudad
    if (ciudad.value == "") {
        error_ciudad.style.display = "block";
        return false;
    }
    else {
        error_ciudad.style.display = "none";
    }


    // Validacion Recibimiento
    if (recib.value == "") {
        error_recib.style.display = "block";
        return false;
    }
    else {
        error_recib.style.display = "none";
    }

    if (recib.value == "antes-posible") {

    }
    else if (recib.value == "fecha-hora" &&
        (fecha_hora.value == "" || !validar_fechahora(fecha_hora.value))) {
        error_fechaHora.style.display = "block";
        return false;
    }
    else {
        error_fechaHora.style.display = "none"; // CON FECHA Y HORA
    }


    // Validaciones Forma de pago
    if (cboFormaDePagos.value == "") {
        error_formaPago.style.display = "block";
        return false;
    }
    else {
        error_formaPago.style.display = "none";
    }

    //Efectivo
    if ((cboFormaDePagos.value == "Efectivo") && (monto.value == "" || monto.value < total)) {
        error_efectivo.style.display = "block";
        return false;
    }
    else {
        error_efectivo.style.display = "none";
    }

    //Tarjeta de Credito
    if ((cboFormaDePagos.value == "Credito/Debito") && (!validar_tarjeta(numero_tarjeta.value))) {
        error_nroTarjeta.style.display = "block";
        return false;
    }
    else {
        error_nroTarjeta.style.display = "none";
    }

    if ((cboFormaDePagos.value == "Credito/Debito") && (nomApeTitular.value == "" || !isNaN(nomApeTitular.value))) {
        error_nomApeTit.style.display = "block";
        return false;
    }
    else {
        error_nomApeTit.style.display = "none";
    }

    if ((cboFormaDePagos.value == "Credito/Debito") && (fechaVto.value == "" || !validar_fechavto(fechaVto.value))) {
        error_fechaVto.style.display = "block";
        return false;
    }
    else {
        error_fechaVto.style.display = "none";
    }

    if ((cboFormaDePagos.value == "Credito/Debito") && (codigo.value == "" || codigo.value <= 0 || codigo.value.toString().length != 3)){
        error_codigo.style.display = "block";
        return false;
    }
    else{
        error_codigo.style.display = "none";
    }

    return true;

}

function validar_fechahora(fh) {
    if (new Date(fh) <= new Date()) {
        return false;
    }
    else {
        return true;
    }
}

function validar_tarjeta(nro) {
    if (nro.length != 16 || nro[0] != 5) {
        return false;
    }
    else {
        return true;
    }
}

function validar_fechavto(fechavto){

    console.log(new Date(fechavto));
    console.log(new Date());

    if(new Date(fechavto) <= new Date()){
        return false;
    }
    else{
        return true;
    }

    
}


// CODIGO ANTERIOR (nose si borrarlo o no)

//     //Validacion de recibimiento
//     if (recib.value == "") {
//         error_recib.style.display = "block";
//         return false;
//     }
//     else {
//         error_recib.style.display = "none";

//         if (recib.value == "fecha-hora") {
//             if (fecha_hora.value == "" ) { //HACER VALIDAR HORA || validar_hora()
//                 error_fechaHora.style.display = "block";
//                 return false;
//             } else {
//                 error_fechaHora.style.display = "none";
//             }
//         }

//         if (recib.value == "antes-posible") {
//             error_recib.style.display = "none";

//             if (cboFormaDePagos.value == "") {
//                 error_formaPago.style.display = "block";
//                 if (nroTarjeta.value == "") {
//                     error_nroTarjeta.style.display = "block";
//                     if ((nroTarjeta.value == "") && (nomApeTitular.value == "")) {
//                         error_nroTarjeta.style.display = "block";
//                         error_nomApeTit.style.display = "block";
//                         if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "")) {
//                             error_nroTarjeta.style.display = "block";
//                             error_nomApeTit.style.display = "block";
//                             error_fechaVto.style.display = "block";
//                             if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "") && (codigo.value == "")) {
//                                 error_nroTarjeta.style.display = "block";
//                                 error_nomApeTit.style.display = "block";
//                                 error_fechaVto.style.display = "block";
//                                 error_codigo.style.display = "block";
//                                 return false
//                             }
//                             return false;
//                         }
//                         return false;
//                     }
//                 }
//                 return false;
//             }
//             else {
//                 error_formaPago.style.display = "none";
//                 if (nroTarjeta.value != "") {
//                     error_nroTarjeta.style.display = "none";
//                     if ((nroTarjeta.value != "") && (nomApeTitular.value != "")) {
//                         error_nroTarjeta.style.display = "none";
//                         error_nomApeTit.style.display = "none";
//                         if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "")) {
//                             error_nroTarjeta.style.display = "none";
//                             error_nomApeTit.style.display = "none";
//                             error_fechaVto.style.display = "none";
//                             if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "") && (codigo.value != "")) {
//                                 error_nroTarjeta.style.display = "none";
//                                 error_nomApeTit.style.display = "none";
//                                 error_fechaVto.style.display = "none";
//                                 error_codigo.style.display = "none";
//                                 redireccionar();
//                             }
//                         }
//                     }
//                 }

//             }

//             if (cboFormaDePagos.value == "Credito/Debito") {
//                 error_formaPago.style.display = "none";
//                 if (nroTarjeta.value == "") {
//                     error_nroTarjeta.style.display = "block";
//                     if ((nroTarjeta.value == "") && (nomApeTitular.value == "")) {
//                         error_nroTarjeta.style.display = "block";
//                         error_nomApeTit.style.display = "block";
//                         if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "")) {
//                             error_nroTarjeta.style.display = "block";
//                             error_nomApeTit.style.display = "block";
//                             error_fechaVto.style.display = "block";
//                             if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "") && (codigo.value == "")) {
//                                 error_nroTarjeta.style.display = "block";
//                                 error_nomApeTit.style.display = "block";
//                                 error_fechaVto.style.display = "block";
//                                 error_codigo.style.display = "block";
//                                 return false
//                             }
//                             return false;
//                         }
//                         return false;
//                     }
//                 }
//                 return false;
//             }
//             else {
//                 error_formaPago.style.display = "none";
//                 if (nroTarjeta.value != "") {
//                     error_nroTarjeta.style.display = "none";
//                     if ((nroTarjeta.value != "") && (nomApeTitular.value != "")) {
//                         error_nroTarjeta.style.display = "none";
//                         error_nomApeTit.style.display = "none";
//                         if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "")) {
//                             error_nroTarjeta.style.display = "none";
//                             error_nomApeTit.style.display = "none";
//                             error_fechaVto.style.display = "none";
//                             if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "") && (codigo.value != "")) {
//                                 error_nroTarjeta.style.display = "none";
//                                 error_nomApeTit.style.display = "none";
//                                 error_fechaVto.style.display = "none";
//                                 error_codigo.style.display = "none";
//                                 redireccionar();
//                             }
//                         }
//                     }
//                 }
//             }

//             //Error monto
//             if (monto.value == "" || monto.value <= 0) {
//                 error_efectivos.style.display = "block";
//                 return false;
//             }
//             else {
//                 error_efectivos.style.display = "none"
//                 redireccionar();
//             }
//         }
//     }

//     //Validacion forma de pago
//     if (cboFormaDePagos.value == "") {
//         error_formaPago.style.display = "block";
//         if (nroTarjeta.value == "") {
//             error_nroTarjeta.style.display = "block";
//             if ((nroTarjeta.value == "") && (nomApeTitular.value == "")) {
//                 error_nroTarjeta.style.display = "block";
//                 error_nomApeTit.style.display = "block";
//                 if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "")) {
//                     error_nroTarjeta.style.display = "block";
//                     error_nomApeTit.style.display = "block";
//                     error_fechaVto.style.display = "block";
//                     if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "") && (codigo.value == "")) {
//                         error_nroTarjeta.style.display = "block";
//                         error_nomApeTit.style.display = "block";
//                         error_fechaVto.style.display = "block";
//                         error_codigo.style.display = "block";
//                         return false
//                     }
//                     return false;
//                 }
//                 return false;
//             }
//         }
//         return false;
//     }
//     else {
//         error_formaPago.style.display = "none";
//         if (nroTarjeta.value != "") {
//             error_nroTarjeta.style.display = "none";
//             if ((nroTarjeta.value != "") && (nomApeTitular.value != "")) {
//                 error_nroTarjeta.style.display = "none";
//                 error_nomApeTit.style.display = "none";
//                 if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "")) {
//                     error_nroTarjeta.style.display = "none";
//                     error_nomApeTit.style.display = "none";
//                     error_fechaVto.style.display = "none";
//                     if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "") && (codigo.value != "")) {
//                         error_nroTarjeta.style.display = "none";
//                         error_nomApeTit.style.display = "none";
//                         error_fechaVto.style.display = "none";
//                         error_codigo.style.display = "none";
//                         redireccionar();
//                     }
//                 }
//             }
//         }
//     }

//     if (cboFormaDePagos.value == "Credito/Debito") {
//         error_formaPago.style.display = "none";
//         if (nroTarjeta.value == "") {
//             error_nroTarjeta.style.display = "block";
//             if ((nroTarjeta.value == "") && (nomApeTitular.value == "")) {
//                 error_nroTarjeta.style.display = "block";
//                 error_nomApeTit.style.display = "block";
//                 if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "")) {
//                     error_nroTarjeta.style.display = "block";
//                     error_nomApeTit.style.display = "block";
//                     error_fechaVto.style.display = "block";
//                     if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "") && (codigo.value == "")) {
//                         error_nroTarjeta.style.display = "block";
//                         error_nomApeTit.style.display = "block";
//                         error_fechaVto.style.display = "block";
//                         error_codigo.style.display = "block";
//                         return false
//                     }
//                     return false;
//                 }
//                 return false;
//             }
//         }
//         return false;
//     }
//     else {
//         error_formaPago.style.display = "none";
//         if (nroTarjeta.value != "") {
//             error_nroTarjeta.style.display = "none";
//             if ((nroTarjeta.value != "") && (nomApeTitular.value != "")) {
//                 error_nroTarjeta.style.display = "none";
//                 error_nomApeTit.style.display = "none";
//                 if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "")) {
//                     error_nroTarjeta.style.display = "none";
//                     error_nomApeTit.style.display = "none";
//                     error_fechaVto.style.display = "none";
//                     if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "") && (codigo.value != "")) {
//                         error_nroTarjeta.style.display = "none";
//                         error_nomApeTit.style.display = "none";
//                         error_fechaVto.style.display = "none";
//                         error_codigo.style.display = "none";
//                         redireccionar();
//                     }
//                 }
//             }
//         }
//     }

//     //Error monto
//     if (monto.value == "" || monto.value <= 0) {
//         error_efectivos.style.display = "block";
//         return false;
//     }
//     else {
//         error_efectivos.style.display = "none";
//         redireccionar();
//     }
// }


// function validar_formaDePago() {
//     let cboFormaDePagos = document.getElementById("cboFormaPago");
//     let monto = document.getElementById("monto");
//     let numTarjeta = document.getElementById("nroTarjeta");
//     let nomApeTitular = document.getElementById("nombre_apellido_titular");
//     let fechaVto = document.getElementById("fechaVto");
//     let codigo = document.getElementById("CVC");

//     // Error formaPago
//     let error_formaPago = document.getElementById("error-formaPago");
//     let error_nroTarjeta = document.getElementById("error-numeroTarjeta");
//     let error_nomApeTit = document.getElementById("error-nomApeTit");
//     let error_fechaVto = document.getElementById("error-fechaVto");
//     let error_codigo = document.getElementById("error-CVC");

//     if (cboFormaDePagos.value == "") {
//         error_formaPago.style.display = "block";
//         if (nroTarjeta.value == "") {
//             error_nroTarjeta.style.display = "block";
//             if ((nroTarjeta.value == "") && (nomApeTitular.value == "")) {
//                 error_nroTarjeta.style.display = "block";
//                 error_nomApeTit.style.display = "block";
//                 if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "")) {
//                     error_nroTarjeta.style.display = "block";
//                     error_nomApeTit.style.display = "block";
//                     error_fechaVto.style.display = "block";
//                     if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "") && (codigo.value == "")) {
//                         error_nroTarjeta.style.display = "block";
//                         error_nomApeTit.style.display = "block";
//                         error_fechaVto.style.display = "block";
//                         error_codigo.style.display = "block";
//                         return false
//                     }
//                     return false;
//                 }
//                 return false;
//             }
//         }
//         return false;
//     }
//     else {
//         error_formaPago.style.display = "none";
//         if (nroTarjeta.value != "") {
//             error_nroTarjeta.style.display = "none";
//             if ((nroTarjeta.value != "") && (nomApeTitular.value != "")) {
//                 error_nroTarjeta.style.display = "none";
//                 error_nomApeTit.style.display = "none";
//                 if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "")) {
//                     error_nroTarjeta.style.display = "none";
//                     error_nomApeTit.style.display = "none";
//                     error_fechaVto.style.display = "none";
//                     if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "") && (codigo.value != "")) {
//                         error_nroTarjeta.style.display = "none";
//                         error_nomApeTit.style.display = "none";
//                         error_fechaVto.style.display = "none";
//                         error_codigo.style.display = "none";
//                     }
//                 }
//             }
//         }

//     }

//     if (cboFormaDePagos.value == "Credito/Debito") {
//         error_formaPago.style.display = "none";
//         if (nroTarjeta.value == "") {
//             error_nroTarjeta.style.display = "block";
//             if ((nroTarjeta.value == "") && (nomApeTitular.value == "")) {
//                 error_nroTarjeta.style.display = "block";
//                 error_nomApeTit.style.display = "block";
//                 if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "")) {
//                     error_nroTarjeta.style.display = "block";
//                     error_nomApeTit.style.display = "block";
//                     error_fechaVto.style.display = "block";
//                     if ((nroTarjeta.value == "") && (nomApeTitular.value == "") && (fechaVto.value == "") && (codigo.value == "")) {
//                         error_nroTarjeta.style.display = "block";
//                         error_nomApeTit.style.display = "block";
//                         error_fechaVto.style.display = "block";
//                         error_codigo.style.display = "block";
//                         return false
//                     }
//                     return false;
//                 }
//                 return false;
//             }
//         }
//         return false;
//     }
//     else {
//         error_formaPago.style.display = "none";
//         if (nroTarjeta.value != "") {
//             error_nroTarjeta.style.display = "none";
//             if ((nroTarjeta.value != "") && (nomApeTitular.value != "")) {
//                 error_nroTarjeta.style.display = "none";
//                 error_nomApeTit.style.display = "none";
//                 if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "")) {
//                     error_nroTarjeta.style.display = "none";
//                     error_nomApeTit.style.display = "none";
//                     error_fechaVto.style.display = "none";
//                     if ((nroTarjeta.value != "") && (nomApeTitular.value != "") && (fechaVto.value != "") && (codigo.value != "")) {
//                         error_nroTarjeta.style.display = "none";
//                         error_nomApeTit.style.display = "none";
//                         error_fechaVto.style.display = "none";
//                         error_codigo.style.display = "none";
//                     }
//                 }
//             }
//         }
//     }

//     //Error monto
//     let error_efectivos = document.getElementById("error-efectivo");
//     if (monto.value == "") {
//         error_efectivos.style.display = "block";
//         return false;
//     }
//     else {
//         error_efectivos.style.display = "none"
//     }

// }

// function validar_Tarjeta() {
//     let txtTarjeta = document.getElementById("nroTarjeta").value;
//     let cantCaracteres = txtTarjeta.length;
//     let error_nroTarjetaInvalido = document.getElementById("error-numeroTarjetaInvalido");

//     if (cantCaracteres < 16) {
//         error_nroTarjetaInvalido.style.display = "block"
//         document.getElementById("nroTarjeta").value = "";
//     }
// }





