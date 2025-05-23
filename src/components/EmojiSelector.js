// src/components/EmojiSelector.js
import React, { useState } from 'react';
import { emojiCategories } from '../utils/emojiCategories';
import selectSoundFile from '../sounds/retro-select-236670.mp3';
import enterSoundFile from '../sounds/retro-select-236670.mp3';

const EmojiSelector = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [player1Name, setPlayer1Name] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const selectSound = new Audio(selectSoundFile);
  const enterSound = new Audio(enterSoundFile);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    selectSound.play();
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    selectSound.play();
  };

  const handleSubmit = () => {
    if (player1Name.trim() !== '') {
      enterSound.play();
    }
    const players = {
      player1Name,
      player2Name: "JOJO",
      category: selectedCategory,
      player1SelectedEmoji: selectedEmoji,
    };
    onSelect(players);
  };

  if (!selectedCategory) {
    return (
      <div className="emoji-selector simple-page">
        <h2 className="selector-heading simple-heading">Choose Your Battleground</h2>
        <div className="category-options simple-options">
          {Object.entries(emojiCategories).map(([category, emojis]) => (
            <button key={category} onClick={() => handleCategorySelect(category)} className="simple-button category-button">
              {category}
              <span className="emoji-preview simple-emoji-preview">
                {emojis.map((emoji, index) => (
                  <span key={index}>{emoji}</span>
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const emojiOptions = emojiCategories && emojiCategories.hasOwnProperty(selectedCategory) ? emojiCategories[selectedCategory] : [];

  if (!selectedEmoji) {
    return (
      <div className="emoji-selector simple-page">
        <h2 className="selector-heading simple-heading">Pick Your Champion</h2>
        <div className="emoji-options simple-options">
          {emojiOptions.map((emoji) => (
            <button key={emoji} onClick={() => handleEmojiSelect(emoji)} className="simple-button emoji-button">
              {emoji}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="emoji-selector simple-page">
      {/* Changed heading text */}
      <h2 className="selector-heading simple-heading">What's Your Name?</h2>
      <div className="name-input-container simple-input-container">
        <input
          type="text"
          placeholder="Enter Name Here"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          className="player-name-input simple-input"
        />
        {/* Start Game button moved directly inside the input container for correct positioning */}
        {/* Added a condition to enable button only if name is entered */}
        <button
          onClick={handleSubmit}
          className="simple-button submit-button"
          disabled={player1Name.trim() === ''} // Disable button if name is empty
          style={{ marginTop: '20px', width: '100%' }} // Added inline style to push it below and make it full width
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default EmojiSelector;