/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */

const player = (name, sign) => ({ name, sign });

const gameFlow = (() => {
  // Creates Player Objects starting game
  let player1 = player('Player1', 'X');
  let player2 = player('player2', 'O');
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
  winningCombs.forEach((comb) => {
    if (
      boardArray[comb[0]] === boardArray[comb[1]] 
      && boardArray[comb[1]] === boardArray[comb[2]]
      && boardArray[comb[0]] !== ''
      ) {
        return true;
      }
      return false;
  });
  };

  return { getActivePlayer, switchPlayerTurn, checkWinner };
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
    // Checks if cell is available if not the click is ignored
    // Add respective players sign to board where clicked and switches player turn
    if (boardArray[selectedCell] === '') {
      boardArray[selectedCell] = gameFlow.getActivePlayer().sign;
      setBoard();
      gameFlow.checkWinner(boardArray);
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
