/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import { useState } from 'react';
import './App.css'

// eslint-disable-next-line react/prop-types
function SquareTable ({value, onSquireClick}){

  
  
  return (
      <button className='square' onClick={onSquireClick}>{value}</button>
  )
}

const Squit = ({children,isSelected})=>{
  const className = `Squit ${isSelected ? 'seleccionado' : ''}`

  return (
    <div className={className}>
      {children}
    </div>
  );
}




function App() {


  const [xIsNext, setXIsNext] =useState(true);

  const [squares, setSquares] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)});

  const [winner, setWinner] = useState(null);

  const checkEndGame = (nextSquares) => {
    return nextSquares.every(squares => (squares  !== null))
  }

  function handleClick(i){
    if (squares[i] || calculaterWiner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = 'X';
    }else {
      nextSquares[i] = 'O'
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    window.localStorage.setItem('board', JSON.stringify(nextSquares));
    window.localStorage.setItem('turn', nextSquares);
    const newWinner = calculaterWiner(nextSquares);
    if(newWinner){
      setWinner(newWinner);
    } else if (checkEndGame(nextSquares)) {
      setWinner(false);
    }
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null))
    setWinner(null)
    setXIsNext(true)

    window.localStorage.removeItem('board');

  }

  return (
    <>
    <div className='patff'>
      <h1 className='TittleTriqui'>TRIQUI</h1>
      <div className='board-row'>
        <SquareTable value={squares[0]} onSquireClick={() => handleClick(0)}/>
        <SquareTable value={squares[1]} onSquireClick={() => handleClick(1)}/>
        <SquareTable value={squares[2]} onSquireClick={() => handleClick(2)}/>
      </div>
     <div className='board-row'>
        <SquareTable value={squares[3]} onSquireClick={() => handleClick(3)}/>
        <SquareTable value={squares[4]} onSquireClick={() => handleClick(4)}/>
        <SquareTable value={squares[5]} onSquireClick={() => handleClick(5)}/>
     </div>
     <div className='board-row'>
        <SquareTable value={squares[6]} onSquireClick={() => handleClick(6)}/>
        <SquareTable value={squares[7]} onSquireClick={() => handleClick(7)}/>
        <SquareTable value={squares[8]} onSquireClick={() => handleClick(8)}/>
      </div>

      <section className='bo-squiters'>
        <Squit isSelected={xIsNext === true}>X</Squit>
        <Squit isSelected={xIsNext === false}>O</Squit>
      </section>

      <button className='buttonReset' onClick={resetGame}>reset</button>

      {
        
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false ? 'empate': 'Ganador:'
                }
              </h2>

              <header className='win'>
                {winner && <Squit>{winner}</Squit>}
              </header>

              <footer><button className='buttonReset' onClick={resetGame}>retry</button></footer>
            </div>
          </section>
        )
      }
      
    </div>
    </>
  )
}

function calculaterWiner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i = 0; i< lines.length; i++){
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]){
      return squares[a];
      
    }
  }
}

export default App
