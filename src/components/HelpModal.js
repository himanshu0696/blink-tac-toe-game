// src/components/HelpModal.js
import React from 'react';

const HelpModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>How to Play Blink Tac Toe</h3>
        <p>Blink Tac Toe is a twist on the classic Tic Tac Toe, using emojis!</p>
        <h4>Game Rules:</h4>
        <ul>
          <li>The game is played on a 3x3 grid.</li>
          <li>Each player (you and JOJO) selects an emoji category. You pick a specific emoji, JOJO gets a random one from the chosen category.</li>
          <li>Player 1 (you) starts first.</li>
          <li>**Vanishing Rule:** Each player can only have 3 emojis on the board at a time. When a player places a 4th emoji, their *oldest* emoji (the first one they placed) vanishes from the board. You cannot place a new emoji on the cell where your oldest emoji just vanished.</li>
          <li>**Winning:** Form a line of 3 of your own emojis (horizontally, vertically, or diagonally) to win!</li>
          <li>The game ends when a player wins. There are no draws!</li>
        </ul>
        <button onClick={onClose} className="close-modal-button">Got It!</button>
      </div>
    </div>
  );
};

export default HelpModal;