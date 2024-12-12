let history = [Array(9).fill(null)];
let currentMove = 0;
let xIsNext = true;
let currentSquares = history[currentMove];

function checkWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function nextPlay(nextSquares) {
    history.push(nextSquares);
    currentMove = history.length - 1;
    xIsNext = currentMove % 2 === 0;
    currentSquares = history[currentMove];

    const winner = checkWinner(currentSquares);
    const tie = !winner && currentMove >= 8;

    if (winner) {
        alert(`The winner is ${winner}`);
        return;
    }
    if (tie) {
        alert("It's a tie");
        return;
    }

    if (!xIsNext) {
        randomMove();
    }
}

function handleClick(button) {
    if (checkWinner(currentSquares) || currentSquares[button - 1]) {
        return;
    }

    const nextSquares = currentSquares.slice();
    nextSquares[button - 1] = xIsNext ? "X" : "O";

    const square = document.getElementById(button);
    square.innerText = nextSquares[button - 1];

    nextPlay(nextSquares);
}

const randomNumber = (max = 8, min = 0) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function randomMove() {
    if (!xIsNext) {
        setTimeout(() => {
            let move;
            do {
                move = randomNumber();
            } while (currentSquares[move]);

            handleClick(move + 1);
        }, randomNumber(2000, 1000));
    }
}
