let minmax = document.getElementById("minmax-carrito");
console.log(minmax);


minmax.addEventListener("click", () => {
    let visual = document.querySelector(".visual-carrito");
    

    if (visual.style.display == "none" || visual.style.display == "" ){
        visual.style.display = "block";
    }
    else{
        visual.style.display = "none";
    }
})

let botones_agregar = document.querySelectorAll(".agregar-producto");

for (btn of botones_agregar){
    btn.addEventListener("click", add);
}

function add(e){
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let nombre = abuelo.querySelector(".card-header").querySelector("h4").textContent;
    let precio = padre.querySelector(".card-title").querySelector("em").textContent;
    let img = padre.querySelector(".img-carrito").querySelector("img").src;

    let visual = document.querySelector(".visual-carrito");

    let div = document.createElement("div");
    div.innerHTML = `<div class="fila">
               <div><img src="${img}" alt=""></div>
               <div><p class="nombreprod">${nombre}</p></div>
               <div><p class="precioprod">${precio}</p></div>
               </div>`;

    visual.append(div);
}

let btn_comprar = document.querySelector(".comprar");
btn_comprar.addEventListener("click", comprar);

function comprar(){
    let productos = document.querySelectorAll(".fila");
    let array_productos = [];

    for (p of productos){

        let prod = {img: p.querySelector("img").src, 
                    nombre: p.querySelector(".nombreprod").textContent,
                    precio: p.querySelector(".precioprod").textContent }

        array_productos.push(prod);
    }

    if (array_productos.length == 0){
        alert("Agregue productos al carrito!")
    }
    else{
        let arrayprodJSON = JSON.stringify(array_productos);
        localStorage.setItem("productos", arrayprodJSON);
        window.location.href = "index.html";
    }
    

}






    

