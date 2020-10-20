import { getFromLocalStorage, setInLocalStorage } from '../utils.js';



export function renderGameResult(gameResult) {
    const totalWins = document.getElementById('total-wins');
    const totalLosses = document.getElementById('total-losses');
    const totalCats = document.getElementById('total-cats');

    let wins = 0;
    let losses = 0;
    let cats = 0;

    if (gameResult === 'player') {
        wins++;
        totalWins.textContent = wins;
        localStorage.setItem('Wins', totalWins.textContent);
    }
    if (gameResult === 'computer') {
        losses++;
        totalLosses.textContent = losses;
        localStorage.setItem('Loses', totalLosses.textContent);
    }
    if (gameResult === 'cat') {
        cats++;
        totalCats.textContent = cats;
        localStorage.setItem('Ties', totalCats.textContent);
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

export function makeFreshBoard() {
    const newBoard = [{
        player: null,
        turn: -1
    },
    {
        player: null,
        turn: -1
    },
    {
        player: null,
        turn: -1
    },
    {
        player: null,
        turn: -1
    },
    {
        player: null,
        turn: -1
    },
    {
        player: null,
        turn: -1
    },
    {
        player: null,
        turn: -1
    },
    {
        player: null,
        turn: -1
    },
    {
        player: null,
        turn: -1
    }];
    return newBoard;
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
    })

    const playerOneWins = doesPlayerWin(board, playerOne);

    if (playerOneWins) {
        return playerOne;
    };

    // Find the other player in the board and check if they win
    let playerTwo;

    board.forEach(element => {
        if (element.player && element.player !== playerOne) {
            playerTwo = element.player;
        }
    })

    const playerTwoWins = doesPlayerWin(board, playerTwo);

    if (playerTwoWins) {
        return playerTwo;
    };


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
    })

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
    })

    return playerWins;
}

export function pushNewRoundToLocalStorage() {

    const roundObject = {
        name: 'test' + Math.random(),
        piece: 'X',
        color: 'red',
        difficulty: 'easy',
        outcome: -2,
        board: makeFreshBoard()
    };

    const roundsData = getFromLocalStorage('roundsData');

    roundsData.push(roundObject);
    console.log(roundsData);
    setInLocalStorage('roundsData', roundsData);

}

<<<<<<< HEAD
export function getUserInfo() {
    const roundData = getFromLocalStorage('roundsData');

    const userInfo = {};

    userInfo.name = roundData[roundData.length - 1].name;
    userInfo.difficulty = roundData [roundData.length - 1].difficulty;

    return userInfo;
=======
export function setOutcomeInteger(winStatus){
    
    const roundsArray = getFromLocalStorage('roundsData');
    const currentRound = roundsArray[roundsArray.length - 1];

    if (winStatus === 'player'){
        currentRound.outcome = 1;
    } else if (winStatus === 'computer'){
        currentRound.outcome = -1;
    } else if (winStatus === 'cat'){
        currentRound.outcome = 0;
    }

    roundsArray[roundsArray.length - 1] = currentRound;
    setInLocalStorage('roundsData', roundsArray);

>>>>>>> ccf3957f3840e0d11dcead6c1ff0080540b73f1d
}