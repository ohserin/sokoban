const board = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 2, 2, 1],
    [1, 0, 3, 0, 0, 0, 0, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 3, 0, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 3, 0, 0, 4, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const gameBoard = document.getElementById('gameBoard');
let playerPos = { x: 7, y: 6 };

function printMap() {
    gameBoard.innerHTML = '';
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (board[y][x] === 1) tile.classList.add('wall');
            if (board[y][x] === 2) tile.classList.add('goal');
            if (board[y][x] === 3) tile.classList.add('box');
            if (board[y][x] === 4) tile.classList.add('player');
            if (board[y][x] === 0) tile.classList.add('empty');
            gameBoard.appendChild(tile);
        }
    }
}

function movePlayer(dx, dy) {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (board[newY][newX] === 1) return;

    if (board[newY][newX] === 3) {
        const boxNewX = newX + dx;
        const boxNewY = newY + dy;

        if (board[boxNewY][boxNewX] === 0 || board[boxNewY][boxNewX] === 2) {
            board[newY][newX] = 0;
            board[boxNewY][boxNewX] = 3;
        } else return;
    }

    board[playerPos.y][playerPos.x] = 0;
    playerPos = { x: newX, y: newY };
    board[playerPos.y][playerPos.x] = 4;

    printMap();
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': movePlayer(0, -1); break;
        case 'ArrowDown': movePlayer(0, 1); break;
        case 'ArrowLeft': movePlayer(-1, 0); break;
        case 'ArrowRight': movePlayer(1, 0); break;
    }
});

printMap();
