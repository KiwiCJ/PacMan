
function init () {

//! ELEMENTS ----------------------------
const grid = document.querySelector('.board .grid')

//! VARIABLES ---------------------------
const width = 21
const height = 15
const cellCount = width * height
let cells = []

//! BOARD ------------------------------
const edgePosition = [    
                [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                [21,27,35,41],
                [42,44,45,46,48,50,51,53,54,56,58,59,60,62],
                [63,65,69,71,75,77,81,83],
                [84,86,88,90,92,96,98,100,102,104],
                [105,109,121,125],
                [126,129,130,131,132,140,141,142,143,146],
                [147,156,158,167],
                [168,171,172,173,174,177,178,179,182,183,184,185,188],
                [189,193,199,205,209],
                [210,214,216,218,222,224,226,230],
                [231,233,237,239,243,245,249,251],
                [252,254,255,256,258,260,261,263,264,266,268,269,270,272],
                [273,279,287,293],
                [294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314]
                ]

 //! PLAYER -----------------------------
let startingPosition = 283
let currentPosition = startingPosition
let score = 0

//! GHOSTS ------------------------------
const ghostColors = ['red', 'green', 'blue', 'yellow']

//! EVENT LISTENERS ---------------------
document.addEventListener('keydown', handlePlayerMovement)

//! FUNCTIONS ---------------------------

function createGrid() {
    
    for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    //cell.innerText = i 
    cell.dataset.index = i 
    cell.style.height = `${100 / height}%`
    cell.style.width = `${100 / width}%`
    grid.appendChild(cell)
    cells.push(cell)
    }

    addEdges()
    addPlayer()
    addDots()

}


function addEdges () {
    edgePosition.forEach(row => {
        row.forEach(index => {
            cells[index].classList.add('edge')
        })
    })
}


function addDots() {
    cells.forEach((cell) => {
        if (!cell.classList.contains('edge')) {
            cell.classList.add('dot')
        }
    })
}



//! PLAYER -----------------------
function addPlayer () {
    cells[currentPosition].classList.add('pacman')
}

function removePlayer () {
    cells[currentPosition].classList.remove('pacman')
}

function handlePlayerMovement(event) {
    const key = event.keyCode
    let nextPosition

    const left = 37
    const aLeft = 65
    const right = 39
    const dRight = 68
    const up = 38
    const wUp = 87
    const down = 40
    const sDown = 83
    

    removePlayer ()

    if ((key === left || key === aLeft) && currentPosition % width !== 0) {
        nextPosition = currentPosition -1
    } else if ((key === right || key === dRight) && currentPosition % width !== width -1) {
        nextPosition = currentPosition + 1
    } else if ((key === up || key === wUp) && currentPosition >= width) {
        nextPosition = currentPosition - width
    } else if ((key === down || key === sDown) && currentPosition + width < cellCount) {
        nextPosition = currentPosition + width
    }

    // check next position doesnt have an edge div
    if (!cells[nextPosition].classList.contains('edge')) {
        if (cells[nextPosition].classList.contains('dot')) {
            cells[nextPosition].classList.remove('dot')
            score += 10
            updateScore()
        }

        currentPosition = nextPosition
    }

    addPlayer()
    checkCollisions()
}





//! RED GHOST --------------------------------
let redCurrentPosition = 157

function addRedGhost() {
    cells[redCurrentPosition].classList.add('ghost-red')
}

function removeRedGhost() {
    cells[redCurrentPosition].classList.remove('ghost-red')
}

function redGhostMovement () {
    const directions =[-1, 1, -width, width] // left, right, up, down
    const validDirections = directions.filter(dir => {
        const nextPosition = redCurrentPosition + dir
        return (
            nextPosition >= 0 &&
            nextPosition < cellCount &&
            !cells[nextPosition].classList.contains('edge') &&
            !cells[nextPosition].classList.contains('ghost-red')
            )
    })
    if (validDirections.length > 0) {
        const randomDirection = validDirections[Math.floor(Math.random() * validDirections.length)]
        removeRedGhost()
        redCurrentPosition += randomDirection
        addRedGhost()
    }
}

//! BLUE GHOST ---------------------------
let blueCurrentPosition = 157

function addBlueGhost() {
    cells[blueCurrentPosition].classList.add('ghost-blue')
}

function removeBlueGhost() {
    cells[blueCurrentPosition].classList.remove('ghost-blue')
}

function blueGhostMovement () {
    const directions =[-1, 1, -width, width] // left, right, up, down
    const validDirections = directions.filter(dir => {
        const nextPosition = blueCurrentPosition + dir
        return (
            nextPosition >= 0 &&
            nextPosition < cellCount &&
            !cells[nextPosition].classList.contains('edge') &&
            !cells[nextPosition].classList.contains('ghost-blue')
            )
    })
    if (validDirections.length > 0) {
        const randomDirection = validDirections[Math.floor(Math.random() * validDirections.length)]
        removeBlueGhost()
        blueCurrentPosition += randomDirection
        addBlueGhost()
    }
}

//! GREEN GHOST ----------------------------
let greenCurrentPosition = 157

function addGreenGhost() {
    cells[greenCurrentPosition].classList.add('ghost-green')
}

function removeGreenGhost() {
    cells[greenCurrentPosition].classList.remove('ghost-green')
}

function greenGhostMovement () {
    const directions =[-1, 1, -width, width] // left, right, up, down
    const validDirections = directions.filter(dir => {
        const nextPosition = greenCurrentPosition + dir
        return (
            nextPosition >= 0 &&
            nextPosition < cellCount &&
            !cells[nextPosition].classList.contains('edge') &&
            !cells[nextPosition].classList.contains('ghost-green')
            )
    })
    if (validDirections.length > 0) {
        const randomDirection = validDirections[Math.floor(Math.random() * validDirections.length)]
        removeGreenGhost()
        greenCurrentPosition += randomDirection
        addGreenGhost()
    }
}

//! YELLOW GHOST --------------------------
let yellowCurrentPosition = 157

function addYellowGhost() {
    cells[yellowCurrentPosition].classList.add('ghost-yellow')
}

function removeYellowGhost() {
    cells[yellowCurrentPosition].classList.remove('ghost-yellow')
}

function yellowGhostMovement () {
    const directions =[-1, 1, -width, width] // left, right, up, down
    const validDirections = directions.filter(dir => {
        const nextPosition = yellowCurrentPosition + dir
        return (
            nextPosition >= 0 &&
            nextPosition < cellCount &&
            !cells[nextPosition].classList.contains('edge') &&
            !cells[nextPosition].classList.contains('ghost-yellow')
            )
    })
    if (validDirections.length > 0) {
        const randomDirection = validDirections[Math.floor(Math.random() * validDirections.length)]
        removeYellowGhost()
        yellowCurrentPosition += randomDirection
        addYellowGhost()
    }
}

//! GHOST MOVEMENT ---------------------
function createGhost() {

    // Red Ghost
    setTimeout(() => {
        addRedGhost()
        setInterval(redGhostMovement, 500)
    }, 1000)

    // Blue Ghost
    setTimeout(() => {
        addBlueGhost()
        setInterval(blueGhostMovement, 500)
    }, 4000)

    // Green Ghost
    setTimeout(() => {
        addGreenGhost()
        setInterval(greenGhostMovement, 500)
    }, 7000)

    // Yellow Ghost
    setTimeout(() => {
        addYellowGhost()
        setInterval(yellowGhostMovement, 500)
    }, 10000)
}

//! SCORING AND ENDING GAME 

function updateScore () {
    const scoreSpan = document.querySelector('.score')
        scoreSpan.innerText = score
}

function checkCollisions () {
    const ghostPositions = [redCurrentPosition, blueCurrentPosition, greenCurrentPosition, yellowCurrentPosition]

    if (ghostPositions.includes(currentPosition)) {
        endGame()
    }
}

function endGame() {
    alert ('Game Over!')
    resetGame()
}

function resetGame() {
    removePlayer()
    removeRedGhost()
    removeBlueGhost()
    removeGreenGhost()
    removeYellowGhost()

    currentPosition = startingPosition
    redCurrentPosition = 157
    blueCurrentPosition = 157
    greenCurrentPosition = 157
    yellowCurrentPosition = 157

    score = 0
    updateScore()

    grid.innerHTML = ''

    createGrid()
}


createGrid()
createGhost()

}


document.querySelector('.play').addEventListener('click', () => {
  
    init()
})
