let history = [Array(9).fill(null)];
let currentMove = 0;
let xIsNext = currentMove % 2 == 0;
let currentSquares = history[currentMove];


function checkWinner(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],

    ];

    for (let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }

    return null;

}

let winner = checkWinner(currentSquares);
let tie = !winner && currentMove >= 9;

function nextPlay (nextSquares) {
    history.push(nextSquares);
    currentMove = history.length -1; 
    xIsNext = currentMove % 2 == 0;
    currentSquares= history[currentMove];
    console.log('currentMove', currentMove);
    console.log('xIsNext', xIsNext); 
    console.log('history', history);   

    winner = checkWinner(currentSquares);
    tie = !winner && currentMove >=9;

    if (winner){
        alert(`The winner is ${winner}`);

    }
    if (tie) {
        alert("It's a tie")
    }

    if(!xIsNext){
        randomMove();
    }
}

function handleClick(button){
    if(checkWinner(currentSquares) || currentSquares[button - 1]){
        return;
    }
    //console.log('cliccato', button);

    const nextSquares = currentSquares.slice();
    if (xIsNext) {
        nextSquares[button - 1] = "X";

    } else {
        nextSquares[button -1] = "O";          
    }

    console.log('nextSquares' , nextSquares);
    const square = document.getElementById(button);
    square.innerText = nextSquares[button -1];

    nextPlay(nextSquares);
}

const randomNumber = (max = 8, min = 0) => {
    return Math.floor(Math.random() * max) + min;
};

function randomMove(){
    if (!xIsNext) {

        setTimeout(() => {
            let check = true;
            while (check){
                const move = randomNumber();
                if (!currentSquares[move]){
                    check = false;
                    handleClick(move + 1);
                } else {
                    check = false;
                    randomMove();
                }
            }
        
        }, randomNumber(2000, 1000));
        
    }
}