// src/App.js
import React, { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import EmojiSelector from './components/EmojiSelector';
import Scoreboard from './components/Scoreboard';
import HelpModal from './components/HelpModal'; // We'll create this component

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSettings, setGameSettings] = useState(null);
  const [scores, setScores] = useState({ 'Player 1': 0, 'JOJO': 0 });
  const [currentPlayerName, setCurrentPlayerName] = useState(''); // New state for current player name
  const [showHelp, setShowHelp] = useState(false); // New state for help modal

  const handleStartGame = (settings) => {
    setGameSettings(settings);
    setGameStarted(true);
    setCurrentPlayerName(settings.player1Name); // Set initial player name
  };

  const updateScore = (playerIndex) => {
    setScores(prevScores => {
      const newScores = { ...prevScores };
      const playerName = playerIndex === 0 ? gameSettings.player1Name : 'JOJO';
      newScores[playerName] = (newScores[playerName] || 0) + 1;
      return newScores;
    });
  };

  const handleRestartApp = () => {
    setGameStarted(false);
    setGameSettings(null);
    setScores({ 'Player 1': 0, 'JOJO': 0 });
    setCurrentPlayerName('');
  };

  return (
    <div className="App">
      <div className="main-heading-container">
        <h1>Blink Tac Toe</h1>
      </div>

      <button className="help-button" onClick={() => setShowHelp(true)}>Help</button>

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      {!gameStarted ? (
        <EmojiSelector onSelect={handleStartGame} />
      ) : (
        <div className="game-wrapper">
          <Scoreboard scores={scores} player1Name={gameSettings.player1Name} />
          <div className="game-board-area">
            {/* New: Display current player's turn */}
            <h2 className="turn-indicator">
              {currentPlayerName}'s Turn
            </h2>
            <GameBoard
              gameSettings={gameSettings}
              updateScore={updateScore}
              setCurrentPlayerName={setCurrentPlayerName} // Pass setter to GameBoard
            />
            <button className="reset-button" onClick={handleRestartApp}>Restart Game</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;