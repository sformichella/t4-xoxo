import { getFromLocalStorage, setInLocalStorage } from '../utils.js';



// let wins = 0;
// let losses = 0;
// let cats = 0;
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

export function getComputerMove() {

    const taken = [];

    const roundsData = getFromLocalStorage('roundsData');
    const currentBoard = roundsData[roundsData.length - 1].board;

    for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i].turn !== -1) {
            taken.push(i);
        }
    }

    let rand = Math.floor(Math.random() * 9);

    while (taken.includes(rand)) {
        rand = Math.floor(Math.random() * 9);
    }

    return rand;
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
    for (let i = 0; i < 9; i++){
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
        if (
            win.every(el => {
                return moves.indexOf(el) !== -1;
            })
        ) {
            playerWins = true;
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
        board: makeFreshBoard()
    };



    roundsData.push(roundObject);
    setInLocalStorage('roundsData', roundsData);

}

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

    console.log(cells);

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
            const cellImage = document.createElement('img');
            cellImage.setAttribute('src', '../assets/SingleX.svg');

            cell.appendChild(cellImage);
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