         
    const carrito = []
    
    const formas = ["perita", "cilindro","piramide", "gota"]
    
    const tipos = ["frase", "cactus", "flores", "personalizado"]
    
    const precioTotal = document.getElementById("precioTotal")


function getData(url, cb) {
    fetch(url)
    .then(response => response.json())
    .then(result => cb(result));
    }
  let url = "https://raw.githubusercontent.com/MaxiMoretta/Coderhouse_Javascript/main/js/mates.json"    
getData(url, render)

function render(data){

    const listaMates = data.listaMates
    const listaTipos = data.listaTipos
    
    console.log(listaMates)
    console.log(listaTipos)
    console.log(data)
    

    
    const listaformas = document.getElementById("listaformas")
    
       
    listaMates.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add("col-sm-3")
        div.innerHTML = `<h4 class="tituloFormas">${producto.nombre}</h4>
                        <img src="img/${producto.img}" class="col-formas" value="${producto.nombre}"/>
                        <p>Precio: $ ${producto.precio}</p>
                        <hr>
                        `   
        listaformas.append(div)
    })
    
    btnsFormas= document.getElementsByClassName("col-formas") 
    
    for (let index = 0; index < btnsFormas.length; index++) {
        const btn = btnsFormas[index]
    
        btn.addEventListener('click', (event) => {
            const value = event.target.getAttribute("value")
            for (let index = 0; index < btnsFormas.length; index++) {
                const btn = btnsFormas[index]
                btn.classList.remove("selectOption")
            }
            event.target.classList.add("selectOption")
            console.log(value)
            const campoforma = document.getElementById("formForma")
            campoforma.setAttribute("value", value)

            console.log(event.target)
        })  
    }
    
    const listatiposcontainer = document.getElementById("listatipos")
    
    listaTipos.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add("col-sm-3")
        div.innerHTML = `<h4 class="tituloTipos">${producto.nombre}</h4>
                        <img src="img/${producto.img}" class="col-tipos" value="${producto.nombre}"/>
                        <p>Precio: $ ${producto.precio}</p>
                        <hr>
                        `   
        listatiposcontainer.append(div)
    })
    
    btnsTipos= document.getElementsByClassName("col-tipos") 
    
    for (let index = 0; index < btnsTipos.length; index++) {
        const btn = btnsTipos[index]
    
        btn.addEventListener('click', (event) => {
            const value = event.target.getAttribute("value")
            for (let index = 0; index < btnsTipos.length; index++) {
                const btn = btnsTipos[index]
                btn.classList.remove("selectOption")
            }
            event.target.classList.add("selectOption")
            console.log(value)
            const campoforma = document.getElementById("formTipo")
            campoforma.setAttribute("value", value)
        })  
    }
    
}

const precios = {
   formas: {
        perita: 1000,
        cilindro: 2000,
        piramide: 2500,
        gota: 3000,
    },
   
    tipos: {
        frase: 1500,
        cactus: 1800,
        flores: 2000,
        personalizado: 3000
    },

    id: {
        perita: 1,
        cilindro: 2,
        piramide: 3,
        gota: 4,

    }
}
class Mate { 
    constructor( a, b, c, d){
        this.forma = a
        this.tipo = b
        this.cantidad = c
        this.id = d
        this.precio = 0
    }
    información(){
        alert("Tu mate elgido fue un: " + this.forma + " con " + this.tipo + " , y te llevas " + this.cantidad + " unidades")
    }
    calcularPrecio(){
        this.precio = (precios.formas[this.forma] + precios.tipos[this.tipo]) * this.cantidad
    }
    Identificador(){
        this.id = (precios.id[this.id])
    }
}


const añadirCarrito = document.getElementById("agregarCarrito")

añadirCarrito.addEventListener('click', (event) => {
    const mate = new Mate(document.getElementById("formForma").value,
     document.getElementById("formTipo").value, 
     parseInt(document.getElementById("formCantidad").value))

     mate.calcularPrecio()
     carrito.push(mate)
     console.log(carrito)


    const cardCarrito = document.getElementById("carrito")
    let li = document.createElement("li")
    li.classList.add("list-group-item","d-flex", "justify-content-between", "align-items-center")
    li.appendChild(document.createTextNode( "Mate " + mate.forma + " tipo " + mate.tipo ))
    
    
    let span = document.createElement("span")
    span.classList.add("badge", "bg-light", "rounded-pill")
    span.appendChild(document.createTextNode(mate.cantidad + " Unidades"))
    li.appendChild(span)

    cardCarrito.appendChild(li)

    let button= document.createElement("button")
    button.classList.add("bi", "bi-trash3-fill", "btn", "btn-link", "pull-right","btnRemover")
    button.appendChild(document.createTextNode(""))
    li.appendChild(button)

    cardCarrito.appendChild(li)
    

    const renderTotal = () => {
        let total = 0
        carrito.forEach((mate) => {
            total += mate.precio
        })
    precioTotal.innerText = total
        console.log(total)
    }
    renderTotal()

  
    button.addEventListener('click', (event) => {
            console.log(event.target)
            cardCarrito.removeChild(li)
            renderTotal()   
            
            Swal.fire({
                position: 'top-end',
                icon: 'Listo',
                title: 'Tu mate ha sido borrado.',
                showConfirmButton: false,
                timer: 1500
              })

    })

    const btnComprar = document.getElementById("compraExitosa")

    btnComprar.addEventListener('click', () => {
        Swal.fire({
            title: 'Felicitaciones!',
            text: 'Tu pedido a sido ingresado correctamente.',
            /* imageUrl: , */
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
}) 

const vaciarCarrito = () => {
    carrito.length = 0
    const cardCarrito = document.getElementById("carrito")
    cardCarrito.innerHTML = ''
    renderTotal()
 
    /* localStorage.setItem('carrito', JSON.stringify(carrito)) */
}


const btnAnular = document.getElementById("compraAnulada")

btnAnular.addEventListener('click', () => {
Swal.fire({
    title: 'Estás segur@?',
    text: "Si cancelas deberas comenzar de nuevo!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, deseo cancelar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        'Tu pedido ha sido eliminado.',
        'exitosamente'
      )
        vaciarCarrito()
    }
  })
})


})

