
document.getElementById('imagenProducto').onchange = function(e){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function(){
        let preview = document.getElementById('preview');
        imagen = document.createElement('img');
        imagen.src = reader.result;
        imagen.style.width = 300;
        preview.append(imagen);
    }
}

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