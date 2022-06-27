let nombreUsuario;
let servicios_suma;
let presupuesto = 0;
let servicios = [];
let cantidadDeServicios;
let clasesDeServicios = document.getElementsByClassName("animate__animated animate__fadeInUp")
let sectionServicios = document.getElementById("sectionServicios")
let titulo2 = document.getElementById("titulo2")
let simuladorPresupuesto = document.getElementById("simuladorPresupuesto")
let servicio;
let seleccionado = " ";
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

function mostrarServicios(valor) {
   let lista = '';
   for (const servicios of valor) {
      lista += 'Servicio ' + servicios.numero + " :" + servicios.nombre + '\n'
   }
   return lista;
}

/*do { nombreUsuario = prompt("BIENVENDIOS! \n Por favor ingrese su nombre");
console.log(nombreUsuario);
} while (nombreUsuario == "");

alert("Hola, " + nombreUsuario + "\nA continuación realizaremos la solicitud con el presupuesto estimado para el servicio de tu empresa.")

do {
   cantidadDeServicios = +(prompt("Ingrese la CANTIDAD(1 o 2 o 3 o ...) de Servicios que desea cotizar, Ej: quiero un sistema de autoproteccion y una capacitacion coloque = 2\n" + mostrarServicios(servicios)));
} while ( (isNaN(cantidadDeServicios)) || (cantidadDeServicios < 1 ));

function suma(precio) {
   return presupuesto = presupuesto + precio
}
function serviciosSeleccionados (nombre , precio) {
   return seleccionado = seleccionado +" "+ nombre +" "+ precio + "\n"
}

for (i = 1; i <= cantidadDeServicios; i++) {
   do { servicios_suma = +(prompt("Ingrese el numero de servicio que quisiera cotizar." + '\n' + mostrarServicios(servicios)))
   } while ((isNaN(servicios_suma)) || ((servicios_suma > servicios.length) || (servicios_suma < 1)));
   servicio = servicios.find(item => item.numero === parseInt(servicios_suma));
   suma(servicio.precio);
   serviciosSeleccionados(servicio.nombre , servicio.precio)
}
*/
/*
let article = document.createElement("article");
article.className = "resumen"
article.innerHTML = `<h3 id="servicio6" class="animate__animated animate__fadeInUp titulo">Simulador de presupuesto de servicios</h3>`
sectionServicios.append(article);

for (const producto of servicios) {
let mostrarAlUsuario = document.createElement("div");
mostrarAlUsuario.innerHTML = `<h2> N°: ${producto.numero} </h2>
                              <p>  Servicio: ${producto.nombre}</p>
                              <b> $ ${producto.precio}</b>`;
clasesDeServicios[7].appendChild(mostrarAlUsuario);
}

let mostrarPresupuesto = document.createElement("div");
mostrarPresupuesto.innerHTML = `<h2>La cotización para  ${nombreUsuario} </h2>
                              <p>Servicios seleccionados:\n ${seleccionado} </p><b>Total: ${presupuesto} Pesos</b>`;
clasesDeServicios[7].appendChild(mostrarPresupuesto)

titulo2.innerText = "Gracias por simular un presupuesto de servicios con nosotros"

alert("La cotización para " + nombreUsuario +"\n" + "Servicios seleccionados:\n"+ seleccionado +"\nTotal: "+presupuesto+" Pesos")
*/

let selected = document.createElement("select");
selected.setAttribute("id","desplegableServicios")

for (const producto of servicios) {
    selected.innerHTML +=  `<option value='${producto.numero}'>${producto.nombre}</option>`;
}
simuladorPresupuesto.append(selected);


const agregarServicio = () => {
   let borradorUsuario = document.getElementById("borradorUsuario")
   let optionValue = document.getElementById("desplegableServicios").value;
   let nuevoServicio = document.createElement("h2");
   let foundServicio = servicios.find(servicio => servicio.numero === parseInt(optionValue));
   nuevoServicio.innerHTML = `se seleccionó ${foundServicio.nombre}`;
   borradorUsuario.append(nuevoServicio);
   carrito.push(foundServicio)
   console.log(carrito)
}


let agregar = document.getElementById("agregar")
agregar.addEventListener("click", agregarServicio)


const eliminarServicio = () => {
}

let eliminar = document.getElementById("eliminar")
eliminar.addEventListener("click", eliminarServicio)

const limpiarServicio = () => {
   borradorUsuario.innerHTML = " ";
   alert("limpio con exito el simulador")
   borradorUsuario.append(borradorUsuario)
}

let limpiar = document.getElementById("limpiar")
limpiar.addEventListener("click", limpiarServicio)



