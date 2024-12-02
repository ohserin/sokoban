const WALL = 1;
const GOAL = 2;
const BOX = 3;
const PLAYER = 4;
const OVERLAP = 5;
const EMPTY = 0;

const board = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 0, 0, 0, 1],
    [1, 0, 3, 0, 0, 0, 0, 0, 2, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 3, 0, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 3, 0, 0, 4, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const goalPositions = [
    { x: 5, y: 1 },
    { x: 8, y: 2 },
    { x: 1, y: 3 },
    { x: 3, y: 7 },
];

function restoreGoalPosition() {
    goalPositions.forEach(goal => {
        if (board[goal.y][goal.x] !== PLAYER && board[goal.y][goal.x] !== OVERLAP) {
            board[goal.y][goal.x] = GOAL;
        }
    });
}

const gameBoard = document.getElementById('gameBoard');
let playerPos = { x: 7, y: 6 };
let goalCount = 0;


function printMap() {
    gameBoard.innerHTML = '';
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (board[y][x] === WALL) tile.classList.add('wall');
            if (board[y][x] === GOAL) tile.classList.add('goal');
            if (board[y][x] === BOX) tile.classList.add('box');
            if (board[y][x] === PLAYER) tile.classList.add('player');
            if (board[y][x] === OVERLAP) tile.classList.add('overlap');
            if (board[y][x] === EMPTY) tile.classList.add('empty');
            gameBoard.appendChild(tile);
        }
    }
}

// 유저 이동 가능 여부
function isValidPosition(x, y) {
    if (board[y][x] === PLAYER || board[y][x] === OVERLAP) {
        return false;
    }
    return x >= 0 && x < board[0].length && y >= EMPTY && y < board.length && board[y][x] !== WALL;
}

// 공 이동 가능 여부
function canMoveBox(x, y, dx, dy) {
    const boxNewX = x + dx;
    const boxNewY = y + dy;
    return board[boxNewY][boxNewX] === EMPTY || board[boxNewY][boxNewX] === GOAL;
}

// 뽝스 이동시키기
function moveBox(x, y, dx, dy) {
    const boxNewX = x + dx;
    const boxNewY = y + dy;

    if (board[boxNewY][boxNewX] === GOAL) {
        board[y][x] = EMPTY;
        // 임시로 player넣어둠
        board[boxNewY][boxNewX] = PLAYER;
        goalCount++;
        checkGameOver();
    } else {
        board[y][x] = EMPTY;
        board[boxNewY][boxNewX] = BOX;
    }
}

function movePlayer(dx, dy) {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (!isValidPosition(newX, newY)) return;

    const curPos = board[newY][newX];

    // 공을 만난 경우
    if (curPos === BOX) {
        if (canMoveBox(newX, newY, dx, dy)) {
            moveBox(newX, newY, dx, dy);
            board[playerPos.y][playerPos.x] = EMPTY;
            playerPos = { x: newX, y: newY };
            board[playerPos.y][playerPos.x] = PLAYER;
        }
    }

    else if (curPos === GOAL) {
        board[playerPos.y][playerPos.x] = EMPTY;
        playerPos = { x: newX, y: newY };
        board[playerPos.y][playerPos.x] = OVERLAP;
    }

    else {
        board[playerPos.y][playerPos.x] = EMPTY;
        playerPos = { x: newX, y: newY };
        board[playerPos.y][playerPos.x] = PLAYER;
    }

    if (board[playerPos.y][playerPos.x] !== OVERLAP) {
        restoreGoalPosition();
    }

    printMap();
}

function checkGameOver() {
    if (goalCount === goalPositions.length) {
        setTimeout(() => {
            alert('게임 종료! 모든 목표를 달성했습니다.');
        }, 100);
    }
}

// 방향키로 플레이
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': movePlayer(0, -1); break;
        case 'ArrowDown': movePlayer(0, 1); break;
        case 'ArrowLeft': movePlayer(-1, 0); break;
        case 'ArrowRight': movePlayer(1, 0); break;
    }
});

printMap();
