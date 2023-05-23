/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */

// currently working on notes,
// Need to remove the winner/tie message after hitting the restart button

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

  const resetWinnerBox = () => {
    winnerBox.textContent = '';
  };

  const displayTie = () => {
    winnerBox.textContent = 'Its a tie!';
  };

  const disableBoard = () => {
    const gameCells = document.querySelectorAll('.cell');
    gameCells.forEach((cell) => {
      cell.setAttribute('disabled', true);
  });
  };

  let startButton = document.querySelector('.start');
  let startScreen = document.querySelector('.startScreen');
  let boardElement = document.querySelector('.gameText');
  startButton.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    boardElement.classList.remove('hidden');
  });
  return {
 displayWinner, displayTie, disableBoard, resetWinnerBox, 
};
})();

// Module for gameBoard
const gameBoard = (() => {
  let boardArray = ['', '', '', '', '', '', '', '', ''];
  let turn = 0; 
  const setBoard = () => {
    let gameCells = document.querySelectorAll('.cell');
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
// Empties array, clears board, and removes disabled property on clicking restart.
  let restartButton = document.querySelector('.restart');
    restartButton.addEventListener('click', () => {
      boardArray = ['', '', '', '', '', '', '', '', ''];
      setBoard();
      let gameCells = document.querySelectorAll('.cell');
      gameCells.forEach((cell) => {
      if (cell.getAttribute('disabled', true)) {
        cell.removeAttribute('disabled');
      }
    });
      turn = 0;
      displayControl.resetWinnerBox();
    });

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
