import { getFromLocalStorage } from '../utils.js';

export function getComputerMove(){

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
        turn: null
    },
    {
        player: null,
        turn: null
    },
    {
        player: null,
        turn: null
    },
    {
        player:null,
        turn: null
    },
    {
        player:null,
        turn: null
    },
    {
        player:null,
        turn: null
    },
    {
        player:null,
        turn: null
    },
    {
        player: null,
        turn: null
    },
    {
        player: null,
        turn: null
    }];
    return newBoard;    
}


export function checkWin(board) {

    // Find a player in the board and check if they win
    let playerOne;
    
    board.forEach(element => {
        if (element.player) {
            playerOne = element.player;
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

export function pushNewRoundToLocalStorage(){

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