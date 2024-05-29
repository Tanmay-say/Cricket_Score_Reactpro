import { useState } from 'react'
import './App.css'

const App = () => {
  const [allClicks, setAll] = useState([]);
  const [dot, setDot] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [run, setRun] = useState(0);
  const [balls, setBall] = useState(0);
  const [over, setOver] = useState(0);
  const [isOverCompleted, setIsOverCompleted] = useState(false);

  
  const handleNewGame= () => {
    setOver(0);
    setBall(0);
    setAll([]);
    setDot(0);
    setWicket(0);
    setRun(0);
    setIsOverCompleted(false);
  }
  const handleNewOver = () => {
    setOver(over + 1);
    setBall(0);
    setAll([]);
    setDot(0);
    setIsOverCompleted(false);
  }

  const handleDot = () => {
    if (!isOverCompleted) {
      setAll(allClicks.concat('*'));
      setDot(dot + 1);
      setBall(balls + 1);
      if (balls + 1 === 6) {
        setIsOverCompleted(true);
      }
    }
  };

  const handleWicket = () => {
    if(!isOverCompleted) {
      setAll(allClicks.concat('W'));
      setWicket(wicket + 1);
      setBall(balls + 1);
      if (balls + 1 === 6 || wicket + 1 === 10) {
        setIsOverCompleted(true);
      }
    }
  }

  const handleRun = (runs) => {
    if (!isOverCompleted) {
      setAll(allClicks.concat(runs));
      setRun(run + runs);
      setBall(balls + 1);
      if (balls + 1 === 6) {
        setIsOverCompleted(true);
      }
    }
  };

  const handleWide = () => {
    if (!isOverCompleted) {
      setAll(allClicks.concat('Wd'));
      setRun(run + 1); // Do not increment balls for wide
    }
  };

  return (
    <div className="container">
      <Display allClicks={allClicks} runs={run} ball={balls} overs={over} wicket={wicket} handleNewGame={handleNewGame}/>
      <div className="buttons">
        <p>
        <Button onClick={handleDot} text='Dot' disabled={isOverCompleted} />
        <Button onClick={handleWicket} text='Wicket' disabled={isOverCompleted} />
        <Button onClick={handleWide} text='Wd' disabled={isOverCompleted} />
        </p>
        <p>
          <Button onClick={() => handleRun(1)} text='1' disabled={isOverCompleted} />
          <Button onClick={() => handleRun(2)} text='2' disabled={isOverCompleted} />
          <Button onClick={() => handleRun(3)} text='3' disabled={isOverCompleted} />
          <Button onClick={() => handleRun(4)} text='4' disabled={isOverCompleted} />
          <Button onClick={() => handleRun(6)} text='6' disabled={isOverCompleted} />
        </p>
      </div>
      {isOverCompleted && wicket < 10 && <Button onClick={handleNewOver} text='Start New Over' />}
    </div>
  )
}

const Display = ({ allClicks, runs, ball, overs , wicket , handleNewGame}) => {
  return (
    <div className="scoreboard">
      <h1>Cricket Score Board</h1>
      <History allClicks={allClicks} />
      <h2>Total Score : {runs}/{wicket} </h2>
      <h2>Over: {overs}.{ball}</h2>
      { wicket === 10 && (
      <>
      <h2>Innings Completed</h2>
      <Button onClick={handleNewGame} text='Start New Game' />
      </>
      )}
    </div>
  )
}

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return <div className="history">The over is yet to be bowled</div>;
  }
  return <div className="history">Over: {allClicks.join("  ")}</div>;
};

const Button = ({ onClick, text, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  )
}

export default App;
