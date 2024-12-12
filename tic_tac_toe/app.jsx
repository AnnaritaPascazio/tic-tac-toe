import { useEffect, useState } from 'react';
import './App.css';
import Square from './Square';
import WebCam from './Webcam';

let timer = {};

function App() {
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  let xIsNext = currentMove % 2 == 0;
  let currentBoard = history[currentMove];

  useEffect(() => {
    const winner = calculateWinner(currentBoard);

    if (winner) {
      alert('The winner is ' + winner);
      // animazione, reset
    }

    const tie = !winner && currentMove >= 9;

    if (tie) {
      alert("It's a tie!");
    }
  }, [currentBoard]);

  useEffect(() => {
    if (!xIsNext && !calculateWinner(currentBoard) && currentMove < 9) {
      computerMove();
    }
  }, [xIsNext]);

  const reset = () => {
    setCurrentMove(0);
    xIsNext = true;
    setHistory([Array(9).fill(null)]);
    currentBoard = history[0];

    for (let i = 0; i < 9; i++) {
      const square = document.getElementById('square-' + (i + 1));
      square.innerText = '';
    }
  };

  const calculateWinner = (currentBoard) => {
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
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    return null;
  };

  const handleNext = (nextBoard) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextBoard];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const handleClick = (position) => {
    console.log('sono stato cliccato', position);

    if (calculateWinner(currentBoard) || currentBoard[position - 1]) {
      return;
    }

    const square = document.getElementById('square-' + position);

    const nextBoard = currentBoard.slice();

    if (xIsNext) {
      nextBoard[position - 1] = 'X';
      square.innerText = 'X';
    } else {
      nextBoard[position - 1] = 'O';
      square.innerText = 'O';
    }

    handleNext(nextBoard);
  };

  const randomNumber = (max = 8, min = 0) => {
    return Math.floor(Math.random() * max) + min;
  };

  const computerMove = () => {
    console.log('computerMove', xIsNext);
    if (!xIsNext) {
      setTimeout(() => {
        let check = true;
        while (check) {
          const move = randomNumber();
          if (!currentBoard[move]) {
            check = false;
            handleClick(move + 1);
          } else {
            check = false;
            computerMove();
          }
        }
      }, 2000);
    }
  };

  console.log('xisnext', xIsNext);

  const onSquareDetected = (squareId) => {
    if (!squareId) {
      clearTimeout(timer?.id);
    }
    const squares = [
      document.getElementById('square-1'),
      document.getElementById('square-2'),
      document.getElementById('square-3'),
      document.getElementById('square-4'),
      document.getElementById('square-5'),
      document.getElementById('square-6'),
      document.getElementById('square-7'),
      document.getElementById('square-8'),
      document.getElementById('square-9'),
    ];
    squares.forEach((square) => {
      if (squareId && square?.id === squareId) {
        console.log(squareId);
        document.getElementById(square.id).classList.add('square-hover');
        const squareN = Number(squareId.slice(-1));
        if (timer.square !== squareN) {
          clearTimeout(timer.id);
          timer.square = squareN;
          timer.id = setTimeout(() => {
            handleClick(squareN);
          }, 3000);
        }
      } else {
        document.getElementById(square.id).classList.remove('square-hover');
      }
    });
  };

  return (
    <>
      <h1 className="title">Tic Tac Toe</h1>
      <div className="container" id="video-target">
        <div className="board">
          {currentBoard.map((s, i) => (
            <Square
              key={i}
              onClick={() => handleClick(i + 1)}
              id={'square-' + (i + 1)}
            />
          ))}
        </div>
        <WebCam hide={!xIsNext} onSquareDetected={onSquareDetected} />
      </div>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export default App;
