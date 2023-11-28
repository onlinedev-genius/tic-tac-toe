import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const calculateWinner = (squares) => {
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
};

const isBoardFull = (squares) => {
  return squares.every((square) => square !== null);
};

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);
  const isTie = isBoardFull(board) && !winner;
  const status = isTie ? 'Tie' : winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const handleClick = (index) => {
    if (board[index] || winner || isTie) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';

    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setXIsNext(true);
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;