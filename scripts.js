// Tic-Tac-Toe game logic
const gameContainer = document.getElementById('game-container');
const cells = [];
let currentPlayer = 'X';
let gameOver = false;

function createCells() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', handleCellClick);
        cells.push(cell);
        gameContainer.appendChild(cell);
    }
}

function handleCellClick(event) {
    if (gameOver) return;

    const cell = event.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        cell.classList.add('disabled');

        if (checkWin()) {
            alert(`Player ${currentPlayer} wins!`);
            gameOver = true;
        } else if (checkDraw()) {
            alert('It\'s a draw!');
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    return Array.from(cells).every(cell => cell.textContent !== '');
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    currentPlayer = 'X';
    gameOver = false;
}

function createResetButton() {
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Game';
    resetButton.addEventListener('click', resetGame);
    gameContainer.appendChild(resetButton);
}

createCells();
createResetButton();