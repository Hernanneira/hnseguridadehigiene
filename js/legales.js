fetch("legales.json") 
    .then(respuesta => respuesta.json())
    .then(legales => {
        legales.forEach(element => {
            let cardsLegales = document.getElementById("cardsLegales")
            const card = document.createElement("article")
            card.className ="col-sm-5 cl-xs-12 resumen"
            card.innerHTML =`<h3 class="animate__animated animate__fadeInUp"><a class="enlaces"
            href="${element.url}">${element.title}</a> </h3>
            `
            cardsLegales.append(card)
        });
    })
