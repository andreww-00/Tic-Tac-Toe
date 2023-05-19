/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */

const gameBoard = (() => {
  const boardArray = ['X', 'O', ' X', 'O', 'X', 'O', 'X', 'O', 'X'];

  const setBoard = () => {
    const gameCells = document.querySelectorAll('.cell');
    for (let i = 0; i < gameCells.length; i += 1) {
      gameCells[i].textContent = boardArray[i];
    }
  };

  const markBoard = () => {
    // Listen for button click and determine which button was pressed
    // determines which players turn it is
    // Checks if cell is available for sign
    // Add players sign to board where the clicked
  };
  return { setBoard };
})();

const players = (name, sign) => ({ name, sign });

const gameFlow = (() => {
  // Creates Player Objects starting game
  let player1 = players('Player 1', 'X');
  let player2 = players('player 2', 'O');
  
  let activePlayer = player1;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };
  
  const getActivePlayer = () => activePlayer;

  return { getActivePlayer, switchPlayerTurn };
})();

gameBoard.setBoard();

gameFlow.switchPlayerTurn();