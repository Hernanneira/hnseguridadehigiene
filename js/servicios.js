let servicios = [];
let clasesDeServicios = document.getElementsByClassName("animate__animated animate__fadeInUp")
let simuladorPresupuesto = document.getElementById("simuladorPresupuesto")
let mostrarLoSimulado = document.getElementById("mostrarLoSimulado")
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
   estado.innerHTML = "Agrego correctamente"
   localStorage.setItem("presupuesto", JSON.stringify(carrito))
   actualizarCarrito();
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
   localStorage.setItem("presupuesto", JSON.stringify(carrito))
   actualizarCarrito();
}

// Funcion para actualizar total de servicios a comprar, agregando (o eliminando) un html por cada interacccion que se agrega o elimina.
function actualizarCarrito() {
   borradorUsuario.innerHTML = ``
   let carritoStorage = JSON.parse(localStorage.getItem(`presupuesto`))
   carritoStorage.forEach((element) => {
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
   // carrito = []
   // localStorage.setItem("presupuesto", JSON.stringify(carrito))
   localStorage.clear()
   // let mostrarLoSimulado = document.getElementById("mostrarLoSimulado")
   // mostrarLoSimulado.innerHTML = ""
   console.log(localStorage)
   estado.innerHTML = "Limpió TODO con exito"
   presupuesto = 0
}

let limpiar = document.getElementById("limpiar")
limpiar.addEventListener("click", limpiarServicio)


//local storage y terminar
// const terminarServicio = () => {
//    mostrarLoSimulado.innerHTML = ``;
//    localStorage.setItem("presupuesto", JSON.stringify(carrito))
//    mostrarLoSimulado.innerHTML = `Procesando cotización. Por favor aguarde...`
//    setTimeout(() => { //SET TIME OUT
//       mostrarLoSimulado.innerHTML = ``
//       presupuestoTerminado();
//    }, 5000);
//    if(carrito ==""){
//       setTimeout(() => {Toastify({  //NOTIFICACIONES
//          text: "cotizacion vacia",
//          duration: 3000,
//          //destination: "https://github.com/apvarun/toastify-js",
//          newWindow: true,
//          close: true,
//          gravity: "top", // `top` or `bottom`
//          position: "right", // `left`, `center` or `right`
//          stopOnFocus: true, // Prevents dismissing of toast on hover
//          style: {
//            background: "linear-gradient(to right, #ed2711, #ed6211)",
//          },
//          onClick: function(){} // Callback after click
//          }).showToast()},5000)

// }else{ 
//    setTimeout(() => {Toastify({
//    text: "Terminado Correctamente",
//    duration: 3000,
//    //destination: "https://github.com/apvarun/toastify-js",
//    newWindow: true,
//    //close: true,
//    gravity: "top", // `top` or `bottom`
//    position: "right", // `left`, `center` or `right`
//    stopOnFocus: true, // Prevents dismissing of toast on hover
//    style: {
//      background: "linear-gradient(to right, #00b09b, #96c93d)",
//    },
//    onClick: function(){} // Callback after click
// }).showToast()},5000);
// }

// }

//RECUPERA LOS DATOS!!! 

//Realizar una pregunta si quiere continuar con el presupuesto utilizado sino limpiar.

//   presupuestoTerminado();
//}

// let terminar = document.getElementById("terminar")
// terminar.addEventListener("click", terminarServicio)


// NUEVO

const modalServicios = () => {
   let carritoStorage = JSON.parse(localStorage.getItem(`presupuesto`))
         let mostrar = document.getElementById("mostrar")
         mostrar.innerHTML = `
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
                  <h5 class="modal-title tituloPresupuesto">Cotizacion del servicio</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div id="modalServicios" class="modal-body">
               </div>
               <div id="precioTotal" class="modal-body pServicios">
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
               </div>
            </div>
         </div>`
         let modalServicios = document.getElementById("modalServicios")
         carritoStorage.forEach(servicio => {
            const lineaServicio = document.createElement("p")
            lineaServicio.className = "pServicios"
            lineaServicio.innerHTML = `${servicio.nombre} $${servicio.precio}`
            modalServicios.append(lineaServicio)
         })
         let presupuesto = 0;
         carritoStorage.forEach(element => {
            presupuesto += element.precio //operador +=
         })
         let precioTotal = document.getElementById("precioTotal")
         presupuesto !== 0 && precioTotal.append(` El total es de $${presupuesto}`) //operador logico "AND
}

// Probando MODAL
const terminarServicio = () => {
   if (localStorage.getItem(`presupuesto`)) {
      modalServicios()
   }
   else {
      let mostrar = document.getElementById("mostrar")
         mostrar.innerHTML = `
            <div class="modal-dialog">
               <div class="modal-dialog">
                  <div class="modal-content">
                     <div class="modal-header">
                        <h5 class="modal-title tituloPresupuesto">Cotizacion vacia</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div id="modalServicios" class="modal-body"> 
                     </div>
                     <div id="precioTotal" class="modal-body pServicios">Recordá apretar el botón "agregar" para añadir servicios
                     </div>
                     <div class="modal-footer">
                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     </div>
                  </div>
                </div>
            /div>`
   }
}

//RECUPERA LOS DATOS!!! 
if (localStorage.getItem(`presupuesto`)) {
   console.log(localStorage)
   Swal.fire({
      title: 'Se encontró una cotizacion ya realizada',
      text: "¿Desea continar con ella?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
   }).then((result) => {
      if (result.isConfirmed) {
         actualizarCarrito()
      }
      else {
         limpiarServicio()
      }
   })
}
let terminar = document.getElementById("terminar")
terminar.addEventListener("click", terminarServicio);
