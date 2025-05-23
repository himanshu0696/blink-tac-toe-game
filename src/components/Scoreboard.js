// src/components/Scoreboard.js
import React from 'react';

const Scoreboard = ({ scores, player1Name }) => {
  return (
    <div className="scoreboard-container">
      <h3>Scoreboard</h3>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{player1Name || "Player 1"}</td>
            <td>{scores['Player 1']}</td>
          </tr>
          <tr>
            <td>JOJO</td>
            <td>{scores['JOJO']}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;