//FORMULARIO

let mensajeUsuario = document.getElementById("mensajeUsuario")
let emailContacto = document.getElementById("emailContacto")
let formularioContenedor = document.getElementById("formularioContenedor")
let estadoFormulario = document.createElement("h3")

//verificacion de Correo y envio por fetch "post" del contenido.
    const validarCorreo = () => {
    let emailUsuario = document.getElementById("emailUsuario")
    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let esValido = expReg.test(emailUsuario.value)

    if(esValido == true) {
        Swal.fire({
        title: 'Enviando...',
        timer: 2000,
        didOpen: () => {
           Swal.showLoading()
        },
     })
        .then((result) => {
           Swal.fire(
              `el mensaje de <p class="resaltar"> ${emailUsuario.value} </p> fue enviada con exito. A la brevedad nos contactaremos`
           )
        })
    }else{
        Swal.fire({
            title: 'Enviando...',
            timer: 2000,
            didOpen: () => {
               Swal.showLoading()
            },
         })
            .then((result) => {
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: 'Something went wrong!',
                //     footer: '<a href="">Why do I have this issue?</a>'
                //   })
                Swal.fire(
                    `El email: <p class="resaltar"> ${emailUsuario.value} </p> es Incorrecto.`,
                    `Intentelo nuevamente,`,
                    'error'
                  )
            })
    }
    const data = {
        title: emailUsuario.value,
        body: mensajeUsuario.value,
    }
    fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            console.log(data.title)
        })
    }
emailContacto.addEventListener('click', validarCorreo)
