
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return ( 
    <button 
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function PlayAgain({ onButtonClick }) {
 
    return (
    <button onClick={onButtonClick}>
      Play Again
    </button>
    );
  }

  function TicTacToe({ pageLoad, play }) {
    return (
      <div onLoad={pageLoad}>
        <h1><span>Tic</span> <span></span>Tac<span> </span>Toe</h1>

        <button onClick={play}>Play</button>
      </div>
    );
  }


export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isClicked, setIsClicked] = useState(false);


  function handleClick(i) {

    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "0");
  }

  function reset() {
    setXIsNext(true);
    setSquares(Array(9).fill(null));
  }

  function onPlay() {
    setIsClicked(true);
  }

  let isNotNull = value => value != null;
  let noWinner = squares.filter(isNotNull);


  return (
    <>
      {!isClicked ? (
      <TicTacToe play={onPlay} />
       ) : (
      <div className="board"> 
        <div className="status">{ (noWinner.length === 9) && (!winner) ? <p className="status">No winner</p> : status }</div>

        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        <div className="play-again">
          {(calculateWinner(squares)) || (noWinner.length === 9) ?
          <PlayAgain onButtonClick={reset}/>
          :
          <div></div>
          }
        </div>
      </div>
      )}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}