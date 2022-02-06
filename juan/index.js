const boardWidth = 10 // constante de columnas del tablero
const boardHeight = 20 // constante de filas del tablero

const main = document.createElement('main'); // contenedor main
// document.body.appendChild(main)
// main.classList.add('main')

const boardContainer = document.createElement('div') // constante contenedora de
main.appendChild(boardContainer)
boardContainer.classList.add('boardContainer')


const displayContainer = document.createElement('div') //
main.appendChild(displayContainer)
displayContainer.classList.add('displayContainer')

// function createGrid(n) {
//     for (let i = 0; i < n; i++) {
//         const divGrid = document.createElement('div')
//         divGrid.classList.add('divGrid')
//         boardContainer.appendChild(divGrid)
//         const divGridSon = document.createElement('div')
//         divGridSon.classList.add('divGridSon')
//         divGrid.appendChild(divGridSon)
//     }
// }

// createGrid(200)

let squares = [];

function generateBoardBlock() {
    const divGrid = document.createElement('div')
    divGrid.classList.add('divGrid')
    boardContainer.appendChild(divGrid)
    const divGridSon = document.createElement('div')
    divGridSon.classList.add('divGridSon')
    divGrid.appendChild(divGridSon)
}

function drawBoard(containerClass,width,height){
    document.body.appendChild(containerClass)
    containerClass.classList.add('main') 
    for (let i = 0; i < width*height; i++) {
        generateBoardBlock()
    }
}

console.log(squares)

drawBoard(main,10,20)
const tetrominoI = [[0, boardWidth, boardWidth*2, boardWidth*3], [0, 1, 2, 3], [0, boardWidth, boardWidth*2, boardWidth*3], [0, 1, 2, 3]];
const tetrominoL = [[0, 1, 2, boardWidth], [0, 1, boardWidth+1, boardWidth*2+1], [2, boardWidth, boardWidth+1, boardWidth+2], [0, boardWidth, boardWidth*2, boardWidth*2+1]];
const tetrominoS = [[1, 2, boardWidth, boardWidth+1], [0, boardWidth, boardWidth+1, boardWidth*2+1]];
const tetrominoZ = [[0, 1, boardWidth+1, boardWidth+2], [1, boardWidth, boardWidth+1, boardWidth*2]];
const tetrominoJ = [[0, 1, 2, boardWidth+2], [1, boardWidth+1, boardWidth*2, boardWidth*2+1], [0, boardWidth, boardWidth+1, boardWidth+2], [0, 1, boardWidth, boardWidth*2]];
const tetrominoO = [[0, 1, boardWidth, boardWidth+1]];
const tetrominoT = [[0, 1, 2, boardWidth+1], [1, boardWidth, boardWidth+1, boardWidth*2+1], [1, boardWidth, boardWidth+1, boardWidth+2], [0, boardWidth, boardWidth+1, boardWidth*2]];

const tetrominos = [tetrominoI,tetrominoL,tetrominoS,tetrominoZ,tetrominoJ,tetrominoO,tetrominoT];

let currentTetrominoe 

function generateRandomTetromine(){
    let tetrominoe ={
        positionAtTetrominoeList: Math.floor(Math.random()*7),
        piece: tetrominos[Math.floor(Math.random()*7)],
        position: 4,
        rotation: 0
    };
    return currentTetrominoe = tetrominoe;
}

generateRandomTetromine()

console.log(currentTetrominoe)

let squaresSelection = document.querySelectorAll('.divGrid');

function drawTetrominoeInMainBoard() {
    currentTetrominoe.piece[0].forEach(index => {
        squaresSelection[4+index].classList.add('tetronimoDrawed')        
    });
}
console.log(squaresSelection);

drawTetrominoeInMainBoard()

function undrawTetrominoeInMainBoard(tetrominoe) {

}


// function undrawTetrominoeInMainBoard()

// function drawTetrominoeInMiniBoard(tetrominoe)

// function cleanMiniBoard()



