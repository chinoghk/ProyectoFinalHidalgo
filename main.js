
document.getElementById("IconoPJ").addEventListener("click", ()=>{
    document.getElementById("pjSeleccion")
})

let PJ = JSON.parse(localStorage.getItem("PJ")) || []
const pjElegido = document.getElementById("pjElegido")
const pjAElegir = document.getElementById("pjAElegir")
const IconoPJ = document.getElementById("IconoPJ")
const botonFinal = document.getElementById("boton-final")

const funcionQueActualiza = () =>{
    pjAElegir.innerHTML = ""

    localStorage.setItem("PJ", JSON.stringify(PJ))

    PJ.map(el => {
        const container = document.createElement("div")
        container.classList.add("personaje")

        const info = document.createElement("div")
        const boton = document.createElement("div")
        const cambiar = document.createElement("button")

        info.classList.add("informacion")
        cambiar.classList.add("button")

        container.append(info, boton)

        const h3 = document.createElement("h3")

        h3.innerText = el.nombre
        cambiar.innerText = "Cambiar Personaje"

        info.append(h3)

        boton.append(cambiar)

        cambiar.addEventListener("click", () =>{
            let index = PJ.findIndex(pers => pers.nombre == el.nombre)

            if(PJ[index].cantidad == 1){
                PJ.splice(index, 1)
            }else{
                PJ[index].cantidad -= 1
            }

            funcionQueActualiza()
        })

        pjAElegir.append(container)
    })
}

const creaPersonaje = (nombre, src, descPJ, puntosPJ, catPJ, id) => {
    const secciones = document.createElement("div")
    secciones.classList.add("personaje")

    const h3 = document.createElement("h3")
    const img = document.createElement("img")
    const desc = document.createElement("div")
    const puntos = document.createElement("p")
    const cat = document.createElement("p")
    const boton = document.createElement("button")
 
    secciones.append(h3, img, desc, puntos, cat, boton)

    h3.innerText = nombre
    img.src = src
    desc.innerText = descPJ
    puntos.innerText = puntosPJ
    cat.innerText = catPJ
    
    boton.innerText = "Seleccionar"

    boton.addEventListener("click", () => {
        let index = PJ.findIndex(el => el.id == id)

        if(pjAElegir.innerHTML == ""){
            if(index == -1){
                PJ.push({
                    nombre,
                    img,
                    cantidad: 1
                })
            }else{
                index.cantidad == 1
            }

            funcionQueActualiza()

            Swal.fire({
                title: "Personaje elegido",
                text: nombre,
                icon: "success",
                timer: 1600,
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    })

    pjElegido.append(secciones)
}

document.addEventListener("DOMContentLoaded", async () =>{
    const respuesta = await fetch("./data.json")
    const data = await respuesta.json()

    data.map(el => {
        creaPersonaje(el.nombre, el.img, el.descripcion, el.puntos, el.categoria, el.id)
    })
    
    funcionQueActualiza()
})

botonFinal.addEventListener("click", () => {
    let pjFinal = PJ.reduce((acc, el) => {
        return acc + el.cantidad
    }, 0)

    if(pjFinal == 0){
        return
    }

    Swal.fire({
        title: "Has elegido tu personaje",
        showCancelButton: true,
        denyButtonText: `Don't save`
    }).then((result) => {
        if(result.isConfirmed){
            Swal.fire({
                title: "Ingresar nombre de jugador:",
                input: "text",
            }).then((result) => {
                if(result !== ""){
                    console.log("Jugador: " + result.value)
                    PJ = []
                    funcionQueActualiza()
                }
            })
        }else{
            Swal.fire({
                icon: "error",
                title: "No se ha elegido personaje correctamente",
            })
        }
    })

})
