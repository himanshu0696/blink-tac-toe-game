# Blink Tac Toe

This is a React implementation of the "Blink Tac Toe" game challenge, a devious form of Tic Tac Toe with emojis and a special "vanishing emoji" rule.

## Objective

The objective is to create a 2-player game in which players choose emoji categories, put emojis on a grid, and attempt to get three in a row. The "blink" or "vanishing" rule introduces strategic play by eliminating the oldest emoji when one player puts their fourth.

## Live Demo

[Paste your live deployed link here]

## Tech Stack

* **React.js**: The whole application is developed with React for a declarative, component-based UI.
* **HTML/CSS/JavaScript**: Web development technology is applied to structure, style, and logic.

## Game Rules (As Implemented)

1. **Board Structure**: The game is played on a normal $3\\times3$ Tic Tac Toe board (9 cells). Though the prompt referenced a $2\times3$ grid, the "like regular Tic Tac Toe" feature and 6-emoji per-board limit prompted the creation of a $3\times3$ grid to facilitate more classic winning combinations. The game successfully accommodates 3 emojis per player, i.e., up to 6 playable emojis on the 9-cell board simultaneously.
2. **Emoji Classes**: Initially, Player 1 picks an emoji class (e.g., Animals, Food, Sports). Player 1 also picks his first choice emoji from this category.
3. **Alternate Play**: Player 1 initiates, and players take turns alternately between Player 1 and JOJO. Players can position their emoji anywhere in an unoccupied cell.
4. **Vanishing Rule":
* A player can have a total of 3 emojis on the board at any time.
* When a player tries to add a 4th emoji, their oldest emoji (i.e., the one which was added first) is removed from the board, based on a FIFO (First-In, First-Out) principle.
* A new emoji cannot be added at the same cell where the oldest emoji has just been discarded.
* The oldest emoji is made to visually disappear through a fade-out animation, and its cell is left empty and available for use after the animation has finished.
5. **Emoji Assignment**: Player 1, on their turn, always plays with the emoji originally chosen by them. JOJO, on the other hand, plays with a *random* emoji from the originally selected category on each move. This introduces dynamic behavior to JOJO's play.
6. **Winning Condition**: A player wins by creating a line of 3 of their own emojis horizontally, vertically, or diagonally.
7. **Game Over**: The game runs until a player is declared a winner. There are no draws because the vanishing rule ensures that the board is never completely filled.
* On win, a "Player X Wins!" message is flashed (with "you won!" configured for Player 1).
* There is a "Play Again" button that seems to start the game afresh, with resetting of scores and enabling new category/name choosing.

## Features Implemented (including Bonus Points)

* **Emoji Categories & Choice**: Emoji categories can be chosen by users and Player 1 can decide their favorite emoji to use from the start.
* **Animations**:
* Placement of emojis with a "drop" animation.
* Highlighting a winning combination with a "pulse" animation.
* Disappearance of emojis with a "fade-out/scale-down" animation for the disappearing emoji.
* **Score Tracker**: A score tracker keeps track of Player 1 and JOJO's wins over several rounds, with scores retained in `localStorage`.
* **Sound Effects**: Sound on click for cell selection and separate sound effect for winning.
* **Persistent Game Settings**: Game settings (selected category, player 1 emoji, player 1 name) are stored in `localStorage` for a smooth experience on reload. Scores are also stored.
* **Intuitive UI**: Good user experience with clear headings, turn indicators (implied through board state), and a "Play Again" button.
* **Basic Responsiveness**: Layout employs flexbox and max-width to have acceptable responsiveness across different screen sizes.

## How the "Vanishing" Feature is Implemented

The "vanishing" feature is coded in `GameBoard.js`.
1. **History Tracking**: The moves of each player are recorded in a `history` state array (a queue-like data structure).
2. **Vanish Trigger**: When a player attempts to place a 4th emoji (`newHistory[currentPlayerIndex].length >= 3`), the index of their oldest emoji is retrieved from `newHistory[currentPlayerIndex][0]`.
3. **Visual Animation**: A `vanishingCell` state variable is set to the index of the oldest emoji. The `Cell` component checks this state and applies a `vanish` CSS class.
4. **Delayed Removal**: A `setTimeout` is employed (equal to the CSS transition length for `.vanish`) to delay the actual removal of the emoji (`newBoard[oldestIndex] = null;`) from the board state. This permits the CSS animation to occur before the emoji is removed from the DOM.
5. **History Update**: Once delayed, the index of the oldest emoji is `shift()`-ed out from the player's history and the index of the new emoji is `push()`-ed in.

## Anything I'd Improve with More Time

* **Enrich Random Emoji Logic**: As enacted, the random emoji logic may be more advanced, for example, such that JOJO never uses an emoji already present on the board by Player 1, no matter the size of category. Or enabling Player 1 also to receive a random emoji from their category every turn, not merely their first.
* **Advanced Animations**: Add more advanced animations for disappearing (e.g., shrink and pop), or even entrance animations for the game board or emoji picker in its entirety.
* **Accessibility (A11y)**: Include ARIA attributes and improved keyboard navigation for disabled users.
* **Complete Mobile Responsiveness**: Although a basic responsive design is implemented, more targeted media queries and mobile-first design details could enhance the experience on smaller devices.
* **"Help" Section**: Incorporate a separate "Help" or "How to Play" section for new users, as specified in the requirements. This may be a modal or a different page that outlines the rules in detail.
* **Loading Indicators**: More complex loading indicators or skeleton screens for improved UX, particularly if initial data loads were more heavy.

---
