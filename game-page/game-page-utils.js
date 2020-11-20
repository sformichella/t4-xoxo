import { getFromLocalStorage, setInLocalStorage, gameColorPieceX } from '../utils.js';

let wins = localStorage.getItem('Wins');
let losses = localStorage.getItem('Losses');
let cats = localStorage.getItem('Cats');

export function renderGameResult(gameResult) {
    const totalWins = document.getElementById('total-wins');
    const totalLosses = document.getElementById('total-losses');
    const totalCats = document.getElementById('total-cats');

    if (gameResult === 'player') {
        wins++;
        localStorage.setItem('Wins', wins);
        const winsStored = localStorage.getItem('Wins');
        totalWins.textContent = winsStored;
    }
    if (gameResult === 'computer') {
        losses++;
        localStorage.setItem('Losses', losses);
        const lossesStored = localStorage.getItem('Losses');
        totalLosses.textContent = lossesStored;
    }
    if (gameResult === 'cat') {
        cats++;
        localStorage.setItem('Cats', cats);
        const catsStored = localStorage.getItem('Cats');
        totalCats.textContent = catsStored;
    }
}


export function cellLocation(string) {

    const semanticLocation = [
        'top-left',
        'top-mid',
        'top-right',
        'mid-left',
        'mid-mid',
        'mid-right',
        'bottom-left',
        'bottom-mid',
        'bottom-right'
    ];

    // very cool!
    return semanticLocation.indexOf(string);
}

export function cellName(number) {
    const semanticLocation = [
        'top-left',
        'top-mid',
        'top-right',
        'mid-left',
        'mid-mid',
        'mid-right',
        'bottom-left',
        'bottom-mid',
        'bottom-right'
    ];
    return semanticLocation[number];
}

export function makeFreshBoard() {
    const boardSquare = {
        player: null,
        turn: -1
    };

    const boardArray = [];
    for (let i = 0; i < 9; i++) {
        boardArray.push(boardSquare);
    }
    return boardArray;
}


export function checkWin(board) {

    let turnCount = 0;

    // Find a player in the board and check if they win
    let playerOne;

    board.forEach(element => {
        if (element.player) {
            playerOne = element.player;
            turnCount++;
        }
    });

    const playerOneWins = doesPlayerWin(board, playerOne);

    if (playerOneWins) {
        return playerOne;
    }

    // Find the other player in the board and check if they win
    let playerTwo;

    board.forEach(element => {
        if (element.player && element.player !== playerOne) {
            playerTwo = element.player;
        }
    });

    const playerTwoWins = doesPlayerWin(board, playerTwo);

    if (playerTwoWins) {
        return playerTwo;
    }


    if (turnCount === 9) {
        return 'cat';
    }

    return null;
}


export function getPlayerMoves(gameBoard, playerString) {
    const playerMoves = [];

    gameBoard.forEach(element => {
        if (element.player === playerString) {
            playerMoves.push(gameBoard.indexOf(element));
        }
    });

    return playerMoves;
}

export function doesPlayerWin(board, player) {
    const moves = getPlayerMoves(board, player);

    // nice way to solve this problem.
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ];

    let playerWins = false;

    winConditions.forEach(win => {
        // super resourceful use of this array method!
        if (win.every(el => moves.indexOf(el) !== -1)) {
            //Set the winning array into local storage on the same object as the current game
            const roundsData = getFromLocalStorage('roundsData');
            roundsData[roundsData.length - 1].winningArray.push(win);
            setInLocalStorage('roundsData', roundsData);

            winningLine(win);
            playerWins = true;
            return playerWins;            
        }
    });

    return playerWins;
    
}

export function pushNewRoundToLocalStorage() {

    const roundsData = getFromLocalStorage('roundsData');

    const currentRound = roundsData[roundsData.length - 1];

    const roundObject = {
        name: currentRound.name,
        piece: currentRound.piece,
        color: currentRound.color,
        difficulty: currentRound.difficulty,
        outcome: -2,
        board: makeFreshBoard(),
        winningArray: []
    };


    roundsData.push(roundObject);
    setInLocalStorage('roundsData', roundsData);
}

// interesting translator function
export function setOutcomeInteger(winStatus) {

    const roundsArray = getFromLocalStorage('roundsData');
    const currentRound = roundsArray[roundsArray.length - 1];

    if (winStatus === 'player') {
        currentRound.outcome = 1;
    } else if (winStatus === 'computer') {
        currentRound.outcome = -1;
    } else if (winStatus === 'cat') {
        currentRound.outcome = 0;
    }

    roundsArray[roundsArray.length - 1] = currentRound;
    setInLocalStorage('roundsData', roundsArray);
}

export function currentBoardPieceColor() {
    const roundData = getFromLocalStorage('roundsData');
    return roundData[roundData.length - 1].color;
}

export function getUserInfo() {
    const roundData = getFromLocalStorage('roundsData');

    const userInfo = {};

    userInfo.name = roundData[roundData.length - 1].name;
    userInfo.difficulty = roundData[roundData.length - 1].difficulty;

    return userInfo;
}

export function populateBoardElement(element, boardArray) {
    // This functions grabs all of the cells from inside
    // of an outer form element. Then it adds an image 
    // to each cell depending on the player property of
    // each object in the boardArray

    // Make array of cells inside of the form element
    const boardNodeList = element.childNodes;
    const cells = [];

    for (const item of boardNodeList) {
        if (item.nodeType !== 3) {
            cells.push(item);
        }
    }

    // Loop through each cell and add an image if necessary
    cells.forEach(cell => {
        // Get the cell's location number 0 - 8
        const location = cellLocation(cell.id);

        // If the player is the computer, add an O image to the
        // cell div
        if (boardArray[location].player === 'computer') {
            const cellImage = document.createElement('img');
            cellImage.setAttribute('src', '../assets/SingleO.svg');
            cell.appendChild(cellImage);
        }
        // Else if the player name is truthy, i.e the player, add
        // an X image to the cell div
        else if (boardArray[location].player) {
            cell.innerHTML = gameColorPieceX(currentBoardPieceColor());
        }
    });
}

export function getTurnNumber(boardArray) {
    let numberOfTurns = -1;

    boardArray.forEach(
        element => {
            if (element.turn > numberOfTurns) {
                numberOfTurns = element.turn;
            }
        }
    );
    return numberOfTurns;
}

export function executeFullTurn(e) {
    // intialize click 

    //getting currentboard from local storage
    const roundsData = getFromLocalStorage('roundsData');
    const currentBoard = roundsData[roundsData.length - 1].board;

    //setting the clicked div 
    let cell = e.target;
    //Avoiding error when clicking on edge of cell.
    while (cell.tagName !== 'DIV') {
        cell = cell.parentElement;
        if (cell === null) {
            return;
        }
    }

    //if there is an image on the div or the game has an outcome exit click handler
    if (cell.childNodes.length || roundsData[roundsData.length - 1].outcome > -2) {
        return;
    }

    if (!(roundsData.length % 2 === 0) || !(getTurnNumber(currentBoard) === -1)) {
        // Player turn
        executePlayerTurn(cell, currentBoard, roundsData);
    }

    // after player turn check win condition
    let winStatus = checkWin(currentBoard);

    //if there is no winning combination let the computer go
    if (winStatus === null) {

        document.getElementById('board-form').style.pointerEvents = 'none';

        //Disable header links
        const headerLinks = document.querySelectorAll('.header-links');
        headerLinks.forEach(
            link => {
                link.classList.toggle('disable-pointer-events');
            }
        );

        setTimeout(() => {

            executeComputerMove(currentBoard, roundsData);

            //checks for win status after computer has made move
            winStatus = checkWin(currentBoard);
            document.getElementById('board-form').style.pointerEvents = 'auto';

            //Turn links back on
            headerLinks.forEach(
                link => {
                    link.classList.toggle('disable-pointer-events');
                }
            );


            if (winStatus) {
                //places results in squares on page
                renderGameResult(winStatus);
                //increment localstorage to -1, 0, or 1
                setOutcomeInteger(winStatus);

                displayWinner();

                // Hide play again button
                const newGameButton = document.getElementsByTagName('button')[0];
                newGameButton.classList.remove('hidden');

                return;
            }

        }, Math.random() * 2000);
    }

    //check win condition after computer move

    //check if win status has been reached after player and/or computer moves
    if (winStatus) {
        //places results in squares on page
        renderGameResult(winStatus);
        //increment localstorage to -1, 0, or 1
        setOutcomeInteger(winStatus);

        displayWinner();

        // Hide play again button
        const newGameButton = document.getElementsByTagName('button')[0];
        newGameButton.classList.remove('hidden');
    }
}


export function resetGameBoardDOM() {
    for (let i = 0; i < 9; i++) {
        const location = cellName(i);
        const locationDOM = document.getElementById(location);
        const hasChild = document.getElementById(location).childElementCount;
        if (hasChild === 1) {
            locationDOM.removeChild(locationDOM.firstChild);
        }
    }
    const removeLineDOM = document.querySelectorAll('.win-line');
    if (removeLineDOM[0]) {
        removeLineDOM[0].remove();
    }
    if (removeLineDOM[1]) {
        removeLineDOM[1].remove();
    }

}

export function renderScoreBoard() {
    const newGameButton = document.getElementsByTagName('button')[0];
    const totalWins = document.getElementById('total-wins');
    const totalLosses = document.getElementById('total-losses');
    const totalCats = document.getElementById('total-cats');

    totalWins.textContent = localStorage.getItem('Wins') || 0;
    totalLosses.textContent = localStorage.getItem('Losses') || 0;
    totalCats.textContent = localStorage.getItem('Cats') || 0;

    const showButtonCheck = getFromLocalStorage('roundsData');
    if (showButtonCheck[showButtonCheck.length - 1].outcome === -2) {
        newGameButton.classList.add('hidden');
    } else {
        newGameButton.classList.remove('hidden');
    }
}

export function renderUserInfo() {
    const userInfo = getUserInfo();

    const userName = document.getElementById('user-name');
    userName.textContent = `${userInfo.name}`;

    const difficultyElem = document.getElementById('difficulty');
    difficultyElem.textContent = `${userInfo.difficulty} Mode`;
}

export function getComputerMove() {

    const roundsData = getFromLocalStorage('roundsData');
    const currentBoard = roundsData[roundsData.length - 1].board;

    if (roundsData[roundsData.length - 1].difficulty === 'Easy') {

        return easyMode(currentBoard);
    } else {

        return competitiveMode(currentBoard);
    }
}

function easyMode(currentBoard){

    // Populate all current moves in a 'taken' array
    const taken = [];

    for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i].turn !== -1) {
            taken.push(i);
        }
    }

    // Pick random move, if it is in 'taken' array then pick another random number until it is not in the 'taken' array
    let rand = Math.floor(Math.random() * 9);
    while (taken.includes(rand)) {
        rand = Math.floor(Math.random() * 9);
    }
    //return random move
    return rand;
}

function competitiveMode(currentBoard){

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ];

    // Computer checks whether they have a winning move. Return that move if that is the case.
    for (let i = 0; i < winConditions.length; i++) {
        if ((convertStringToNum(currentBoard[winConditions[i][0]].player) + convertStringToNum(currentBoard[winConditions[i][1]].player) + convertStringToNum(currentBoard[winConditions[i][2]].player)) === -20) {
            if (convertStringToNum(currentBoard[winConditions[i][0]].player) === 0) {
                return winConditions[i][0];
            } else if (convertStringToNum(currentBoard[winConditions[i][1]].player) === 0) {
                return winConditions[i][1];
            } else if (convertStringToNum(currentBoard[winConditions[i][2]].player) === 0) {
                return winConditions[i][2];
            }
        }
    }

    // Computer checks whether the player has a winning move. Return that move if that is the case.
    for (let i = 0; i < winConditions.length; i++) {
        if ((convertStringToNum(currentBoard[winConditions[i][0]].player) + convertStringToNum(currentBoard[winConditions[i][1]].player) + convertStringToNum(currentBoard[winConditions[i][2]].player)) === 2) {
            if (convertStringToNum(currentBoard[winConditions[i][0]].player) === 0) {
                return winConditions[i][0];
            } else if (convertStringToNum(currentBoard[winConditions[i][1]].player) === 0) {
                return winConditions[i][1];
            } else if (convertStringToNum(currentBoard[winConditions[i][2]].player) === 0) {
                return winConditions[i][2];
            }
        }
    }
    // If the middle square is not occupied play it with a 60% probability
    const rnd = Math.random();
    if (convertStringToNum(currentBoard[4].player) === 0 && rnd > .4) {
        return 4;
    }
    // if all the above are not satisfied then play according to Easy Mode logic (ie. random free cell)
    return easyMode(currentBoard);

}

export function convertStringToNum(string) {

    if (string === 'player') {
        return 1;
    } else if (string === 'computer') {
        return -10;
    } else {
        return 0;
    }

}

function executePlayerTurn(cell, currentBoard, roundsData) {

    //sets color of X piece
    cell.innerHTML = gameColorPieceX(roundsData[roundsData.length - 1].color);

    // index of clicked  cell
    const cellNumber = cellLocation(cell.id);

    // sets cell to player clicked it
    currentBoard[cellNumber].player = 'player';

    // increase current turn by 1
    let numberOfTurns = getTurnNumber(currentBoard) + 1;
    currentBoard[cellNumber].turn = numberOfTurns;

    //set current board back in roundsData
    roundsData[roundsData.length - 1].board = currentBoard;

    //sets roundsData into local storage
    setInLocalStorage('roundsData', roundsData);

}

export function executeComputerMove(currentBoard, roundsData) {
    let numberOfTurns = getTurnNumber(currentBoard);
    // return computer index next move
    const computersMove = getComputerMove();
    const computerCell = document.getElementById(cellName(computersMove));

    //drop O image from computer move slot
    const compImage = document.createElement('img');
    compImage.setAttribute('src', '../assets/SingleO.svg');
    computerCell.appendChild(compImage);


    //assign computer to that board cell
    currentBoard[computersMove].player = 'computer';

    //increases number of turns
    numberOfTurns = getTurnNumber(currentBoard) + 1;
    currentBoard[computersMove].turn = numberOfTurns;

    //sets roundsData in localstorage
    roundsData[roundsData.length - 1].board = currentBoard;
    setInLocalStorage('roundsData', roundsData);

}

export function winningLine(winningArray) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ];

    const lineFileNames = ['hor-top', 'hor-mid', 'hor-bottom', 'vert-left', 'vert-mid', 'vert-right', 'forwards-diag', 'backwards-diag'];

    const stringWinningArray = JSON.stringify(winningArray);
    let whereIsWin;

    for (let i = 0; i < winConditions.length; i++) {
        const stringWin = JSON.stringify(winConditions[i]);
        if (stringWin === stringWinningArray) {
            whereIsWin = i;
        }
    }
    const winningObject = lineFileNames[whereIsWin];
    const gameBoard = document.getElementById('board-form');
    const winLine = document.createElement('div');
    winLine.setAttribute('class', winningObject);
    winLine.classList.add('win-line');
    const image = document.createElement('img');
    image.src = '../assets/HorizontalLine.svg';

    winLine.appendChild(image);
    gameBoard.appendChild(winLine);
}	

export function displayWinner() {
    //Display win message
    const roundsData = getFromLocalStorage('roundsData');
    const gameOutcome = roundsData[roundsData.length - 1].outcome;
    const winMSG = document.getElementById('win-msg');
    let playerName = '';

    if (gameOutcome === 0) {
        winMSG.textContent = `Cat's Game!`;
        winMSG.classList.remove('hidden');
    } else if (gameOutcome === 1) {
        playerName = roundsData[roundsData.length - 1].name;
        winMSG.textContent = `${playerName} Wins!`;
        winMSG.classList.remove('hidden');
    } else if (gameOutcome === -1) {
        playerName = 'Computer';
        winMSG.textContent = `${playerName} Wins!`;
        winMSG.classList.remove('hidden');
    }
}
