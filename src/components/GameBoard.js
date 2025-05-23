// src/components/GameBoard.js
import React, { useState, useRef, useEffect, useMemo } from 'react'; // Added useMemo
import Cell from './Cell';
import clickSoundFile from '../sounds/click.mp3';
import winSoundFile from '../sounds/win.wav';
import { emojiCategories } from '../utils/emojiCategories';

const GameBoard = ({ gameSettings, updateScore, setCurrentPlayerName }) => {
  const player1Name = gameSettings.player1Name || "Player 1";
  const categoryEmojis = emojiCategories[gameSettings.category];

  // Memoize playerNames so it doesn't change on every render
  const playerNames = useMemo(() => [player1Name, "JOJO"], [player1Name]);

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(0); // 0 = Player 1, 1 = JOJO
  const [history, setHistory] = useState([[], []]); // Moves history per player (FIFO)
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [vanishingCell, setVanishingCell] = useState(null);

  // useRef to keep JOJO's current emoji and its move count stable across renders
  const jojoState = useRef({
    currentEmoji: null,
    movesWithCurrentEmoji: 0
  });

  const currentPlayerIndex = turn % 2;

  // Effect to update current player name display
  useEffect(() => {
    setCurrentPlayerName(playerNames[currentPlayerIndex]);
  }, [turn, currentPlayerIndex, playerNames, setCurrentPlayerName]);

  const clickSound = new Audio(clickSoundFile);
  const winSound = new Audio(winSoundFile);

  // Helper to get a random emoji for JOJO from the category, excluding player1's selected emoji
  const getNewRandomJojoEmoji = () => {
    const availableEmojis = categoryEmojis.filter(emoji => emoji !== gameSettings.player1SelectedEmoji);
    if (availableEmojis.length === 0) {
        // Fallback if only player1's emoji is in the category (shouldn't happen with at least 2 emojis)
        return categoryEmojis[0];
    }
    const randomIndex = Math.floor(Math.random() * availableEmojis.length);
    return availableEmojis[randomIndex];
  };

  // Main function to determine the emoji for the current turn
  const getPlayerEmojiForTurn = (playerIndex) => {
    if (playerIndex === 0) { // Player 1 always uses their selected emoji
      return gameSettings.player1SelectedEmoji;
    } else { // JOJO's turn
      // If it's JOJO's first move or after 3 moves, pick a new random emoji
      if (jojoState.current.currentEmoji === null || jojoState.current.movesWithCurrentEmoji >= 3) {
        jojoState.current.currentEmoji = getNewRandomJojoEmoji();
        jojoState.current.movesWithCurrentEmoji = 0; // Reset counter for new emoji
      }
      // Increment counter for current emoji
      jojoState.current.movesWithCurrentEmoji++;
      return jojoState.current.currentEmoji;
    }
  };


  const handleClick = (index) => {
    if (board[index] || winner || vanishingCell) return;

    const newBoard = [...board];
    const newHistory = history.map(arr => [...arr]);

    // Determine the emoji for the current turn using the new logic
    const currentEmoji = getPlayerEmojiForTurn(currentPlayerIndex);

    // Vanish oldest emoji if player already has 3 on board
    if (newHistory[currentPlayerIndex].length >= 3) {
      const oldestIndex = newHistory[currentPlayerIndex][0];
      if (index === oldestIndex) return; // Can't place on oldest emoji position

      // 1. Trigger vanishing animation
      setVanishingCell(oldestIndex);

      // 2. Remove emoji from board and history after animation
      setTimeout(() => {
        newBoard[oldestIndex] = null;
        newHistory[currentPlayerIndex].shift();

        // 3. Place new emoji
        newBoard[index] = currentEmoji;
        newHistory[currentPlayerIndex].push(index);

        setBoard(newBoard);
        setHistory(newHistory);
        clickSound.play();
        checkWinner(newBoard, currentEmoji, currentPlayerIndex);
        setTurn(prevTurn => prevTurn + 1); // Use functional update for turn
        setVanishingCell(null); // Clear vanishing cell state
      }, 300); // Match this timeout to your .cell.vanish transition duration in App.css
    } else {
      // No vanishing needed, just place
      newBoard[index] = currentEmoji;
      newHistory[currentPlayerIndex].push(index);

      setBoard(newBoard);
      setHistory(newHistory);
      clickSound.play();
      checkWinner(newBoard, currentEmoji, currentPlayerIndex);
      setTurn(prevTurn => prevTurn + 1); // Use functional update for turn
    }
  };

  const checkWinner = (board, emoji, playerIndex) => {
    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    for (const [a, b, c] of winPatterns) {
      if (board[a] === emoji && board[b] === emoji && board[c] === emoji) {
        let winnerMessage = '';
        if (playerIndex === 0) {
          winnerMessage = 'you won!';
        } else {
          winnerMessage = `${playerNames[playerIndex]} wins!`;
        }
        setWinner(winnerMessage);
        setWinningLine([a, b, c]);
        updateScore(playerIndex);
        winSound.play();
        return;
      }
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setTurn(0);
    setHistory([[], []]);
    setWinner(null);
    setWinningLine(null);
    setVanishingCell(null);
    // Reset JOJO's emoji state on restart
    jojoState.current = {
      currentEmoji: null,
      movesWithCurrentEmoji: 0
    };
    // Also reset current player name in App.js
    setCurrentPlayerName(playerNames[0]);
  };

  return (
    <div>
      <div className="board">
        {board.map((cell, i) => (
          <Cell
            key={i}
            value={cell}
            onClick={() => handleClick(i)}
            className={`${cell ? 'placed' : ''} ${winningLine && winningLine.includes(i) ? 'winning-cell' : ''} ${vanishingCell === i ? 'vanish' : ''}`}
          />
        ))}
      </div>

      {winner && (
        <div style={{ marginTop: '1rem' }}>
          {winner === 'you won!' ? (
            <h2 className="player-win-message">{winner}</h2>
          ) : (
            <h2 style={{ color: 'green' }}>{winner}</h2>
          )}
          <button
            onClick={handleRestart}
            style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;