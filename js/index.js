let presupuesto = 0;
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
   console.log(presupuesto)
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
   console.log(presupuesto)

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
      div.classList.add('serviciosEnCarrito')
      div.innerHTML = `
                        <p>${element.nombre} $Precio: ${element.precio} </p>`

      mostrarLoSimulado.appendChild(div)
   })
   carritoStorage.forEach(element => {
      presupuesto += element.precio //operador +=
      console.log(element?.detalle || "no existe esta propiedad de carrito") // optimizacion y operador logico "OR"
   })

   presupuesto !== 0 && mostrarLoSimulado.append(` El total es de $${presupuesto}`) //operador logico "AND
}

//local storage y terminar
const terminarServicio = () => {
   mostrarLoSimulado.innerHTML = ``
   console.log(terminarServicio);
   localStorage.setItem("presupuesto", JSON.stringify(carrito))
   presupuestoTerminado();
}

//RECUPERA LOS DATOS!!!
if (localStorage.getItem(`presupuesto`)) {
   presupuestoTerminado();
}

let terminar = document.getElementById("terminar")
terminar.addEventListener("click", terminarServicio)