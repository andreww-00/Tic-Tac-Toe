/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */

const player = (name, sign) => ({ name, sign });

const gameFlow = (() => {
  // Creates Player Objects starting game
  let player1 = player('Player1', 'X');
  let player2 = player('player2', 'O');
  
  let activePlayer = player1;
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
    // return (activePlayer);
  };
  
  const getActivePlayer = () => activePlayer;

  return { getActivePlayer, switchPlayerTurn };
})();

const gameBoard = (() => {
  const boardArray = ['', '', '', '', '', '', '', '', ''];
  
  const setBoard = () => {
    const gameCells = document.querySelectorAll('.cell');
    for (let i = 0; i < gameCells.length; i += 1) {
      gameCells[i].textContent = boardArray[i];
    }
  };
  
  const markBoard = (selectedCell) => {
    // Checks if cell is available for sign if not the click is ignored
    // Add respective players sign to board where the clicked and switches player turn
    if (boardArray[selectedCell] === '') {
      boardArray[selectedCell] = gameFlow.getActivePlayer().sign;
      setBoard();
      gameFlow.switchPlayerTurn();
    }
  };

  // Listen for button click and determine which button was pressed passing that value to markBoard
  const gameCells = document.querySelectorAll('.cell');
  gameCells.forEach((item) => {
    item.addEventListener('click', (e) => {
      let selectedCell = e.target.dataset.cell;
      markBoard(selectedCell);
    });
  });
  return { setBoard };
})();

gameBoard.setBoard();
