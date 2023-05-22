/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */

const player = (name, sign) => ({ name, sign });

const gameFlow = (() => {
  // Creates Player Objects starting game
  let player1 = player('Player 1', 'X');
  let player2 = player('Player 2', 'O');
  let activePlayer = player1;

  let winningCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };
  
  const getActivePlayer = () => activePlayer;

  const checkWinner = (boardArray) => {
  for (comb of winningCombs) {
    if (
      boardArray[comb[0]] === boardArray[comb[1]] 
      && boardArray[comb[1]] === boardArray[comb[2]]
      && boardArray[comb[0]] !== ''
      ) {
        return true;
      }
  }
  };

  return { getActivePlayer, switchPlayerTurn, checkWinner };
})();

// displayController module
const displayControl = (() => {
  let winnerBox = document.querySelector('.winner');

  const displayWinner = () => {
    winnerBox.textContent = `${gameFlow.getActivePlayer().name} is the winner!`;
  };

  const displayTie = () => {
    winnerBox.textContent = 'Its a tie!';
  };

  const disableBoard = () => {
    const gameCells = document.querySelectorAll('.cell');
    gameCells.forEach((item) => {
    item.removeEventListener('click', () => {
    }); 
  });
  };
  return { displayWinner, displayTie, disableBoard };
})();

// Module for gameBoard
const gameBoard = (() => {
  const boardArray = ['', '', '', '', '', '', '', '', ''];
  let turn = 0; 
  const setBoard = () => {
    const gameCells = document.querySelectorAll('.cell');
    for (let i = 0; i < gameCells.length; i += 1) {
      gameCells[i].textContent = boardArray[i];
    }
  };
  
  const takeTurn = (selectedCell) => {
    // Checks if cell is available if not the click is ignored
    // Add respective players sign to board where clicked and switches player turn
    turn += 1;
    if (boardArray[selectedCell] === '') {
      boardArray[selectedCell] = gameFlow.getActivePlayer().sign;
      setBoard();
      if (gameFlow.checkWinner(boardArray)) {
        displayControl.displayWinner();
        displayControl.disableBoard();
      } else if (turn === 9) {
        displayControl.displayTie();
        displayControl.disableBoard();
      }
      gameFlow.switchPlayerTurn();
    }
  };

  // Listen for button click and determine which button was pressed passing that value to takeTurn
  const gameCells = document.querySelectorAll('.cell');
  gameCells.forEach((item) => {
    item.addEventListener('click', (e) => {
      let selectedCell = e.target.dataset.cell;
      takeTurn(selectedCell);
    });
  });
  return { setBoard };
})();


gameBoard.setBoard();
