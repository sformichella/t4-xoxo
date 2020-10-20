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

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ]

    let playerOne;
    
    board.forEach(element => {
        if (element.player) {
            playerOne = element.player;
        }
    })
    
    const playerOneMoves = getPlayerMoves(playerOne);
    let playerOneWins;

    winConditions.forEach(win => {
        if (
            win.every(el => {
                return playerOneMoves.indexOf(el) !== -1;
            })
        ) {
            playerOneWins = true;
        }
    })

    // board.forEach(element => {
    //     if (element.player) {
    //         const referencePiece = element.player;
    //     }
    // })

    // for(let i = 0; i < 7; i += 3) {
        
    // }

    // for(let i = 0; i < 3; i += 3) {
    //     const referencePiece = board[i].player;

    //     if (board[i+3].player === referencePiece && board[i+6].player === referencePiece) {
    //         return board[i].player
    //     }
    // }

    // const referencePiece = board[4].player;

    // if (board[0].player === referencePiece && board[8].player === referencePiece) {
    //     return referencePiece;
    // }

    // if (board[2].player === referencePiece && board[6].player === referencePiece) {
    //     return referencePiece;
    // }

    // return null;
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