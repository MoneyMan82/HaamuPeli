let BOARD_SIZE = 18;
const cellSize = calculateCellSize();
let board;
let player;
let ghosts = [/*1,2,3,4,5*/];

document.getElementById("new-game-btn").addEventListener('click', startGame);
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            player.move(0, -1); // Liikuta ylös
            break;
        case 'ArrowDown':
            player.move(0, 1); // Liikuta alas
            break;
        case 'ArrowLeft':
            player.move(-1, 0); // Liikuta vasemmalle
            break;
        case 'ArrowRight':
            player.move(1, 0); // Liikuta oikealle
            break;
        case 'w':
            shootAt(player.x, player.y - 1); // shoot up
            break;
        case 's':
            shootAt(player.x, player.y + 1); // shoot down
            break;
        case 'a':
            shootAt(player.x - 1, player.y); // shoot left
            break;
        case 'd':
            shootAt(player.x + 1, player.y); // shoot right
            break;
    }
    event.preventDefault(); // Prevent default scrolling behaviour
});

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

    player = new Player(0, 0);
    board = generateRandomBoard();
    drawBoard(board);
}
function generateRandomBoard(){
    const newBoard = Array.from({length: BOARD_SIZE}, ()=> Array(BOARD_SIZE).fill(' '));
    console.log(newBoard)
    //Tehdään Ulkoseinät
    for(let y = 0; y < BOARD_SIZE; y++){
        for(let x = 0; x < BOARD_SIZE; x++){
            if(y == 0 || y == BOARD_SIZE-1 || x==0 || x== BOARD_SIZE -1){
                newBoard[y][x]='W';
            }
        }
    }
    //Tehdään Pelilaudan Keskelle Esteet
    generateObstacles(newBoard);
    generateGhosts(newBoard);
    //newBoard[6][7] = 'P'
    const [playerX, playerY] = randomEmptyPosition(newBoard);
    setCell(newBoard, playerX, playerY, 'P');
    player.x = playerX
    player.y = playerY
    return newBoard;
}

function drawBoard(board){
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = '';
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
            else if(board[y][x]=='P'){
                cell.classList.add('player');
            }
            else if(board[y][x]=='H'){
                cell.classList.add('hornmonster');
            }
            else if(board[y][x]=='B'){
                cell.classList.add('bullet');
                setTimeout(() => {
                    setCell(board, x, y, ' ') 
                }, 500); // Ammus näkyy 500 ms
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

        /*{ startX: 3, startY: 16},
        { startX: 12, startY: 5},
        { startX: 12, startY: 10},
        { startX: 16, startY: 5}*/
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
//Tämä On Apufunktio Satunnaisen Kokonaisluvun Arpomista Varten
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomEmptyPosition(board){
    x = randomInt(1, BOARD_SIZE - 2);
    y = randomInt(1, BOARD_SIZE - 2);
    if (getCell(board, x, y)  === ' ') {
        return [x, y];
    } else {
    return randomEmptyPosition(board);
    }

}

//Asetetaan solun sisältö
function setCell(board, x, y, value) {
    board[y][x] = value;
 }
//Palautetaan solun sisältö
function getCell(board, x, y) {
       return board[y][x];
}

function generateGhosts(board){
    for (let i = 0; i < 5; i++) {
        const [ghostX, ghostY] = randomEmptyPosition(board);
        console.log(ghostX,ghostY);
        setCell(board, ghostX, ghostY, 'H');
        ghosts.push(new Ghost(ghostX, ghostY)); // Add each ghost to the list
        console.log(ghosts);
    }
}

function shootAt(x, y) {
    setCell(board, x, y, 'B');
    drawBoard(board);
    }

class Player{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    move(deltaX, deltaY){
        // pelaajan nykyiset koordinaatit tallennetaan muuttujiin
        const currentX = player.x;
        const currentY = player.y;
    
        console.log(`Current Position: (${currentX}, ${currentY})`);
    
        // Laske uusi sijainti
        const newX = currentX + deltaX;
        const newY = currentY + deltaY;
    
        //Tarkista onko paikka tyhjä
        if(getCell(board,newX,newY)===' '){
            // Päivitä pelaajan sijainti
            player.x = newX;
            player.y = newY;

            // Päivitä pelikenttä
            board[currentY][currentX] = ' '; // Tyhjennetään vanha paikka
            board[newY][newX] = 'P'; // Asetetaan uusi paikka
        }
        drawBoard(board);
    }
}

class Ghost{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
