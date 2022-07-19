//FORMULARIO
let emailUsuario = document.getElementById("emailUsuario")
let mensajeUsuario = document.getElementById("mensajeUsuario")
let emailContacto = document.getElementById("emailContacto")
let formularioContenedor = document.getElementById("formularioContenedor")
let estadoFormulario = document.createElement("h3")

emailContacto.addEventListener('click', () => {
    //     fetch("contacto.json") 
    //         .then(respuesta => respuesta.json())
    //         .then(respuesta => console.log(respuesta))

    // })
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

        })
    
    estadoFormulario.innerHTML = "Enviando mensaje..."
    if (emailUsuario.value == "") {
        setTimeout(() => {
            estadoFormulario.innerHTML = "Complete correctamente los casilleros"
            Toastify({  //NOTIFICACIONES
                text: "Cancelado",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #ed2711, #ed6211)",
                },
                onClick: function () { } // Callback after click
            }).showToast()
        }, 5000)
    } else {
        setTimeout(() => {
            estadoFormulario.innerHTML = "Mensaje enviado con exito. En breves nos contactaremos para darle respuesta."
            Toastify({
                text: "Enviado",
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
        }, 5000);
    }
    formularioContenedor.append(estadoFormulario)
    emailContacto.innerText.value = ""
    mensajeUsuario.innerText.value = ""
})
