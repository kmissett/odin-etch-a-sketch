const etchASketch = document.querySelector(".etch-a-sketch")
const screen = document.querySelector(".screen")
const screenHeight = 24
const aspectRatio = 1.5
const screenWidth = screenHeight * aspectRatio

screen.style.height = screenHeight + "rem"      // 24rem = 384px
screen.style.width = screenWidth + "rem"        // 36rem = 576px

let pixels = []


const drawPixels = (resolutionValue) => {

    const rows = (resolutionValue) ? resolutionValue : 16       // default 16
    const columns = aspectRatio * rows                          // default 24
    const pixelSize = screenHeight / rows                       // 24rem / 16 = 1.5rem
    
    for(let i=0; i < rows; i++) {
        for (let j=0; j < columns; j++) {
            const pixel = document.createElement("div")
            pixel.setAttribute("data-row", i)
            pixel.setAttribute("data-column", j)
            pixel.style.width = pixelSize + "rem"
            pixel.style.height = pixelSize + "rem"
            pixel.style.backgroundColor = "black"
            pixel.classList.add("pixel")
            screen.appendChild(pixel)
        }
    }
    pixels = document.querySelectorAll(".pixel")
    pixels.forEach(pixel => pixel.addEventListener("mouseenter", darkenPixel))
}

const removePixels = () => {
    while (screen.hasChildNodes()) screen.removeChild(screen.childNodes[0])
}

const darkenPixel = (e) => {
    const opacity = parseFloat(getComputedStyle(e.target).getPropertyValue("--opacity"))
    e.target.style.setProperty("--opacity", opacity + 0.25)
}

const resolutionForm = document.getElementById("resolution-form")
resolutionForm.addEventListener("submit", (e) => {
    e.preventDefault()
    removePixels()
    const newResolutionValue = parseInt(resolution.value)
    drawPixels(newResolutionValue)
    resolution.value = newResolutionValue
})


const clearButton = document.querySelector(".clear")
clearButton.addEventListener("click", (e) => {
    e.preventDefault()
    etchASketch.classList.add("shake")
    pixels.forEach(pixel => pixel.style.setProperty("--opacity", 0))
    e.target.blur()
})

etchASketch.addEventListener("animationend", () => {
    etchASketch.classList.remove("shake")
})





drawPixels()

