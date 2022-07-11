let servicios = [];
let clasesDeServicios = document.getElementsByClassName("animate__animated animate__fadeInUp")
let simuladorPresupuesto = document.getElementById("simuladorPresupuesto")
let servicio;
let carrito = [];

class Servicios {
   constructor(numero, nombre, precio) {
      this.numero = numero
      this.nombre = nombre
      this.precio = precio
   }
}

servicios.push(new Servicios(1, clasesDeServicios[0].innerHTML, 30000));
servicios.push(new Servicios(2, clasesDeServicios[1].innerHTML, 10000));
servicios.push(new Servicios(3, clasesDeServicios[2].innerHTML, 6000));
servicios.push(new Servicios(4, clasesDeServicios[3].innerHTML, 12000));
servicios.push(new Servicios(5, clasesDeServicios[4].innerHTML, 35000));
servicios.push(new Servicios(6, clasesDeServicios[5].innerHTML, 25000));

let selected = document.createElement("select");
selected.setAttribute("id", "desplegableServicios")

for (const producto of servicios) {
   selected.innerHTML += `<option value='${producto.numero}'>${producto.nombre}</option>`;
}
simuladorPresupuesto.append(selected);

// Agregar servicio a carrito, mostrar en borradorUsuario lo que agrego
const agregarServicio = () => {
   let optionValue = document.getElementById("desplegableServicios").value;
   let foundServicio = servicios.find(servicio => servicio.numero === parseInt(optionValue));
   carrito.push(foundServicio)
   actualizarCarrito();
   estado.innerHTML = "Agrego correctamente"
}
let agregar = document.getElementById("agregar")
agregar.addEventListener("click", agregarServicio)

// Funcion para eliminar productos, refrescando el carrito por cada eliminacion que se realice.
const eliminarServicio = () => {
   let borradorUsuario = document.getElementById("borradorUsuario")
   let optionValue = document.getElementById("desplegableServicios").value;
   let foundServicio = carrito.find(carrito => carrito.numero === parseInt(optionValue));
   let indice = carrito.indexOf(foundServicio)
   let estado = document.getElementById("estado")

   // Condicional para tomar elemento a eliminar, agarrando indice de array.   
   if (indice >= 0) {
      carrito.splice(indice, 1);
      console.log(carrito);
      console.log(indice);
      estado.innerHTML = "El elemento se eliminó de su presupuesto"
   } if (indice == -1) {
      console.log(indice + "seria no se encuentra");
      estado.innerHTML = "El elemento que desea eliminar no se encuentra en su presupuesto"
   } if (carrito == "") {
      borradorUsuario.innerHTML = ""
   }
   actualizarCarrito();
}

// Funcion para actualizar total de servicios a comprar, agregando (o eliminando) un html por cada interacccion que se agrega o elimina.
function actualizarCarrito() {
   borradorUsuario.innerHTML = ``
   carrito.forEach((element) => {
      const div = document.createElement('div')
      div.classList.add('serviciosEnCarrito')
      div.innerHTML = `<p>${element.nombre} $Precio: ${element.precio} </p>`
      borradorUsuario.appendChild(div)
   })
};

let eliminar = document.getElementById("eliminar")
eliminar.addEventListener("click", eliminarServicio)

//limpias todo
const limpiarServicio = () => {
   borradorUsuario.innerHTML = " ";
   carrito = []
   localStorage.setItem("presupuesto", JSON.stringify(carrito))
   let mostrarLoSimulado = document.getElementById("mostrarLoSimulado")
   mostrarLoSimulado.innerHTML = ""
   console.log(carrito)
   estado.innerHTML = "Limpió TODO con exito"
   presupuesto = 0
}

let limpiar = document.getElementById("limpiar")
limpiar.addEventListener("click", limpiarServicio)

//Mostrar lo finalizado--
function presupuestoTerminado() {
   let carritoStorage = JSON.parse(localStorage.getItem(`presupuesto`))
   carritoStorage.forEach(element => {
      let mostrarLoSimulado = document.getElementById("mostrarLoSimulado")
      const div = document.createElement('div')
      div.classList.add('modal-body')
      div.innerHTML = `
                        <p>${element.nombre} $Precio: ${element.precio} </p>`

      mostrarLoSimulado.appendChild(div)
   })
   let presupuesto = 0;
   carritoStorage.forEach(element => {
      presupuesto += element.precio //operador +=
   })

   presupuesto !== 0 && mostrarLoSimulado.append(` El total es de $${presupuesto}`) //operador logico "AND
}

//local storage y terminar
const terminarServicio = () => {
   mostrarLoSimulado.innerHTML = ``
   console.log(terminarServicio);
   localStorage.setItem("presupuesto", JSON.stringify(carrito))
   mostrarLoSimulado.innerHTML = `Procesando cotización. Por favor aguarde...`
   setTimeout(() => { //SET TIME OUT
      mostrarLoSimulado.innerHTML = ``
      presupuestoTerminado();
   }, 5000);
   if(carrito ==""){
      setTimeout(() => {Toastify({  //NOTIFICACIONES
         text: "cotizacion vacia",
         duration: 3000,
         //destination: "https://github.com/apvarun/toastify-js",
         newWindow: true,
         close: true,
         gravity: "top", // `top` or `bottom`
         position: "right", // `left`, `center` or `right`
         stopOnFocus: true, // Prevents dismissing of toast on hover
         style: {
           background: "linear-gradient(to right, #ed2711, #ed6211)",
         },
         onClick: function(){} // Callback after click
         }).showToast()},5000)
      
   }else{ 
      setTimeout(() => {Toastify({
      text: "Terminado Correctamente",
      duration: 3000,
      //destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      //close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function(){} // Callback after click
   }).showToast()},5000);
   }
   
}

//RECUPERA LOS DATOS!!!
if (localStorage.getItem(`presupuesto`)) {
   presupuestoTerminado();
}

let terminar = document.getElementById("terminar")
terminar.addEventListener("click", terminarServicio)

/*<div class="modal-body">
  <div id="contenedor modal" class="container-fluid">
    <div class="row">
      <div class="col-md-4">.col-md-4</div>
      <div class="col-md-4 ms-auto">.col-md-4 .ms-auto</div>
    </div>
    <div class="row">
      <div class="col-md-3 ms-auto">.col-md-3 .ms-auto</div>
      <div class="col-md-2 ms-auto">.col-md-2 .ms-auto</div>
    </div>
    <div class="row">
      <div class="col-md-6 ms-auto">.col-md-6 .ms-auto</div>
    </div>
    <div class="row">
      <div class="col-sm-9">
        Level 1: .col-sm-9
        <div class="row">
          <div class="col-8 col-sm-6">
            Level 2: .col-8 .col-sm-6
          </div>
          <div class="col-4 col-sm-6">
            Level 2: .col-4 .col-sm-6
          </div>
        </div>
      </div>
    </div>
  </div>
</div>*/