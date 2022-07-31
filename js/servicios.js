let clasesDeServicios = document.getElementsByClassName("animate__animated animate__fadeInUp")
let simuladorPresupuesto = document.getElementById("simuladorPresupuesto")
let mostrarLoSimulado = document.getElementById("mostrarLoSimulado")
let seleccionador = document.getElementById("seleccionador")
let carrito = [];
let servicios = [];

class Servicios {
   constructor(numero, nombre, precio, cantidad) {
      this.numero = numero
      this.nombre = nombre
      this.precio = precio
      this.cantidad = cantidad
   }
}

servicios.push(new Servicios(1, clasesDeServicios[1].innerHTML, 30000, 1));
servicios.push(new Servicios(2, clasesDeServicios[2].innerHTML, 10000, 1));
servicios.push(new Servicios(3, clasesDeServicios[3].innerHTML, 6000, 1));
servicios.push(new Servicios(4, clasesDeServicios[4].innerHTML, 12000, 1));
servicios.push(new Servicios(5, clasesDeServicios[5].innerHTML, 35000, 1));
servicios.push(new Servicios(6, clasesDeServicios[6].innerHTML, 25000, 1));

let selected = document.createElement("select");
selected.setAttribute("id", "desplegableServicios")

for (const producto of servicios) {
   selected.innerHTML += `<option value='${producto.numero}'>${producto.nombre}</option>`;
}
seleccionador.append(selected);

// Agregar servicio a carrito, mostrar en borradorUsuario lo que agrego
const agregarServicio = () => {
   let optionValue = document.getElementById("desplegableServicios").value;
   let foundServicio = servicios.find(servicio => servicio.numero === parseInt(optionValue));
   let cantidadServicio = carrito.find(carrito => carrito.numero === parseInt(optionValue)) //contador
   console.log(cantidadServicio)
   if (cantidadServicio) {
      cantidadServicio.cantidad++
   } else {
      carrito.push(foundServicio)
   }
   estado.innerHTML = "Agrego correctamente"
   actualizarCarrito();
   localStorage.setItem("presupuesto", JSON.stringify(carrito))
}
let agregar = document.getElementById("agregar")
agregar.addEventListener("click", agregarServicio)

// Funcion para eliminar productos, refrescando el carrito por cada eliminacion que se realice.
const eliminarServicio = () => {
   let optionValue = document.getElementById("desplegableServicios").value;
   let cantidadServicio = carrito.find(carrito => carrito.numero === parseInt(optionValue));
   let indice = carrito.indexOf(cantidadServicio)
   let estado = document.getElementById("estado")
   console.log(cantidadServicio)
   console.log(carrito)
   // Condicional para tomar elemento a eliminar, agarrando indice de array.   
   if (indice >= 0) {
      console.log(indice);
      estado.innerHTML = "El elemento se eliminó de su cotización"
      if (cantidadServicio.cantidad <= 1) {
         carrito.splice(indice, 1)
      } else {
         cantidadServicio.cantidad -= 1
      }
   }
   if (indice == -1) {
      console.log(indice + "seria no se encuentra");
      estado.innerHTML = "El elemento que desea eliminar no se encuentra en su cotización"
   }
   actualizarCarrito();
   localStorage.setItem("presupuesto", JSON.stringify(carrito))
}
// Funcion para refrescar el carrito al usuario
function actualizarCarrito() {
   let totalPrecio = 0
   console.log(carrito)
   borradorUsuario.innerHTML = ``
   carrito.forEach((element) => {
      const subTotalServicio = element.precio * element.cantidad
      const tr = document.createElement('tr')
      tr.innerHTML = `
           <tr>
             <td scope="row">${element.numero}</td>
             <td>${element.nombre}</td>
             <td>${element.cantidad}</td>
             <td>${subTotalServicio}</td>
           </tr>`
      borradorUsuario.appendChild(tr)

      totalPrecio += subTotalServicio;
   })
   const tr2 = document.createElement('tr')
   tr2.innerHTML = `
           <tr>
             <td scope="row"></td>
             <td></td>
             <td></td>
             <td>Total ${totalPrecio}</td>
           </tr>`
   borradorUsuario.appendChild(tr2)
};

let eliminar = document.getElementById("eliminar")
eliminar.addEventListener("click", eliminarServicio)

//limpias TODO (carrito y Localstorage)
const limpiarServicio = () => {
   borradorUsuario.innerHTML = " ";
   carrito.forEach((element) => {
      console.log(element)
      element.cantidad = 1
   })
   carrito.splice(0, carrito.length)
   localStorage.clear()
   if (carrito == "") {
      Toastify({
         text: "Vaciado correctamente",
         duration: 3000,
         newWindow: true,
         gravity: "top", // `top` or `bottom`
         position: "right", // `left`, `center` or `right`
         stopOnFocus: true, // Prevents dismissing of toast on hover
         style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
         },
         onClick: function () { } // Callback after click
      }).showToast()
   }
   actualizarCarrito()
}

let limpiar = document.getElementById("limpiar")
limpiar.addEventListener("click", limpiarServicio)


// enviar
async function sendCotizacion() {
   const { value: email } = await Swal.fire({
      title: 'Ingrese su email para enviar la cotización',
      input: 'email',
      inputLabel: 'Email de contacto',
      inputPlaceholder: 'ingrese su Email'
   })
   if (email) {
      Swal.fire({
         title: 'Enviando...',
         timer: 2000,
         didOpen: () => {
            Swal.showLoading()
         },
      })
         .then((result) => {
            Swal.fire(
               `La cotizacion  de <p class="resaltar"> ${email} </p> fue enviada con exito. A la brevedad nos contactaremos`
            )
         })
      //recorrer carrito
      let serviciosUsuario = ""
      function recorrerCarrito() {
         carrito.forEach(element => {
             serviciosUsuario +=  `Servicio: ${element.nombre} Cantidad: ${element.cantidad}`
         })  
      }
      recorrerCarrito(serviciosUsuario)
      const usuarioCotizacion = {
         title: email,
         body: serviciosUsuario,
      }
      //enviarme cotizacion a url
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(usuarioCotizacion),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
   }

}
let enviarCotizacion = document.getElementById("enviarCotizacion")
enviarCotizacion.addEventListener("click", sendCotizacion);

//RECUPERA LOS DATOS 
let carritoEnLS = JSON.parse(localStorage.getItem("presupuesto"))
if (localStorage.getItem(`presupuesto`)) {
   carrito = carritoEnLS
   actualizarCarrito()
}

