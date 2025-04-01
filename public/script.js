let BOARD_SIZE = 18;
const cellSize = calculateCellSize();
let board;

document.getElementById("new-game-btn").addEventListener('click', startGame);

function calculateCellSize() {
    // Otetaan talteen pienempi luku ikkunan leveydestä ja korkeudesta
    const screenSize = Math.min(window.innerWidth, window.innerHeight);
    // Tehdään pelilaudasta hieman tätä pienempi, jotta jää pienet reunat
    const gameBoardSize = 0.95 * screenSize;
    // Laudan koko jaetaan ruutujen määrällä, jolloin saadaan yhden ruudun eli cellin koko
    // ja se palautetaan return -komennolla
    return (gameBoardSize / BOARD_SIZE);
    }

function startGame(){
    console.log("works");
    document.getElementById("intro-screen").style.display='none'
    document.getElementById("game-screen").style.display='block'
    board = generateRandomBoard();
    drawBoard(board);
}
function generateRandomBoard(){
    const newBoard = Array.from({length: BOARD_SIZE}, ()=> Array(BOARD_SIZE).fill(' '));
    console.log(newBoard)

    for(let y = 0; y < BOARD_SIZE; y++){
        for(let x = 0; x < BOARD_SIZE; x++){
            if(y == 0 || y == BOARD_SIZE-1 || x==0 || x== BOARD_SIZE -1){
                newBoard[y][x]='W';
            }
        }
    }
    generateObstacles(newBoard);
    return newBoard
}

function drawBoard(board){
    const gameBoard = document.getElementById("game-board");

    const cellSize = calculateCellSize();
 
    gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;

    for(let y = 0; y < BOARD_SIZE; y++){
        for(let x = 0; x < BOARD_SIZE; x++){
            const cell = document.createElement('div');
            cell.classList.add('cell');

            cell.style.width = cellSize + "px";
            cell.style.height = cellSize + "px";

            if(board[y][x]=='W'){
                cell.classList.add('wall');
            }
            gameBoard.appendChild(cell);
        }
    }
}

function generateObstacles(board){
    // Lista esteitä koordinaattiparien listoina
    const obstacles = [
        [[0,0],[0,1],[1,0],[1,1]], // Square
        [[0,0],[0,1],[0,2],[0,3]],  // I
        [[0,0],[1,0],[2,0],[1,1]], // T
        [[1,0],[2,0],[1,1],[0,2],[1,2]], // Z
        [[1,0],[2,0],[0,1],[1,1]], // S
        [[0,0],[1,0],[1,1],[1,2]], // L
        [[0,2],[0,1],[1,1],[2,1]]  // J
    ];

    // Valitse muutama paikka esteille pelikentällä
    // Huomioi Esteiden Pituus, Ettei Piirtäminen Mene Yli Pelilaudan
    const positions = [
        { startX: 2, startY: 2 },
        { startX: 8, startY: 2 },
        { startX: 4, startY: 8 },
        { startX: 10, startY: 10 },
        { startX: 13, startY: 14 },

        { startX: 3, startY: 16},
        { startX: 12, startY: 5},
        { startX: 12, startY: 10},
        //{ startX: 16, startY: 5}
    ];

    //Arvotaan Este Jokaiseen Aloituspisteeseen

    positions.forEach(pos => {
        const randomObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
        placeObstacle(board, randomObstacle, pos.startX, pos.startY);
    });
}

function placeObstacle(board, obstacle, startX, startY) {
    for (coordinatePair of obstacle) {
        [x,y] = coordinatePair;
        board[startY + y][startX + x] = 'W';
    }
}