const boardWidth = 10 // constante de columnas del tablero
const boardHeight = 20 // constante de filas del tablero


const main = document.createElement('main'); // contenedor main
document.body.appendChild(main)
main.classList.add('main')

const boardContainer = document.createElement('div') // constante contenedora de
main.appendChild(boardContainer)
boardContainer.classList.add('boardContainer')


const displayContainer = document.createElement('div') //
main.appendChild(displayContainer)
displayContainer.classList.add('displayContainer')

function createGrid(n){
    for (let i = 0; i < n; i++){
        const divGrid = document.createElement('div')
        divGrid.classList.add('divGrid')
        boardContainer.appendChild(divGrid)
        const divGridSon = document.createElement('div')
        divGridSon.classList.add('divGridSon')
        divGrid.appendChild(divGridSon)
    }
}

createGrid(200)