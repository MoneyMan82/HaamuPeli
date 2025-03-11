let BOARD_SIZE = 12;
let board;

document.getElementById("new-game-btn").addEventListener('click', startGame);

function startGame(){
    console.log("works");
    document.getElementById("intro-screen").style.display='none'
    document.getElementById("game-screen").style.display='block'
    generateRandomBoard();
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
}