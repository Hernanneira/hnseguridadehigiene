let nombreUsuario;
let servicios_suma;
let presupuesto = 0;
let servicios = [];
let cantidadDeServicios;

class Servicios {
   constructor(numero, nombre, precio) {
      this.numero = numero
      this.nombre = nombre
      this.precio = precio
   }
}

servicios.push(new Servicios(1, "Sistema de Autoproteccion", 30000));
servicios.push(new Servicios(2, "Certificado de Ignifugado", 10000));
servicios.push(new Servicios(3, "Asesoramiento Legal", 6000));
servicios.push(new Servicios(4, "Presentacion ART", 12000));
servicios.push(new Servicios(5, "Estudios Higienicos", 35000));
servicios.push(new Servicios(6, "Programas de Seguridad", 25000));

function mostrarServicios(valor) {
   let lista = '';
   for (const servicios of valor) {
      lista += 'Servicio ' + servicios.numero + " :" + servicios.nombre + '\n'
   }
   return lista;
}

do { nombreUsuario = prompt("BIENVENDIOS! \n Por favor ingrese su nombre");
console.log(nombreUsuario);
} while (nombreUsuario == "");

alert("Hola, " + nombreUsuario + "\nA continuación realizaremos la solicitud con el presupuesto estimado para el servicio de tu empresa.")

do {
   cantidadDeServicios = +(prompt("Ingrese la CANTIDAD(1 o 2 o 3 o ...) de Servicios que desea cotizar, Ej: quiero un sistema de autoproteccion y una capacitacion coloque = 2\n" + mostrarServicios(servicios)));
} while ( (isNaN(cantidadDeServicios)) || (cantidadDeServicios < 1 ));

function suma(precio) {
   return presupuesto = presupuesto + precio
}

for (i = 1; i <= cantidadDeServicios; i++) {
   do { servicios_suma = +(prompt("Ingrese el numero de servicio que quisiera cotizar." + '\n' + mostrarServicios(servicios)))
   } while ((isNaN(servicios_suma)) || ((servicios_suma > servicios.length) || (servicios_suma < 1)));
   const servicio = servicios.find(item => item.numero === parseInt(servicios_suma));
   suma(servicio.precio);
}

alert("La cotización para " + nombreUsuario + " es de " + presupuesto + " Pesos")

