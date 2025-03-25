let BOARD_SIZE = 12;
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