import { renderHeader } from '../header/header.js';
import { getFromLocalStorage } from '../utils.js';
import { renderUserInfo, executeComputerMove, renderScoreBoard, pushNewRoundToLocalStorage, getUserInfo, resetGameBoardDOM, populateBoardElement, executeFullTurn, displayWinner, winningLine } from './game-page-utils.js';

const boardForm = document.getElementById('board-form');
const mostRecentRound = getFromLocalStorage('roundsData');
const newGameButton = document.getElementsByTagName('button')[0];

const {
    board: mostRecentBoard,
    winningArray: mostRecentWinningArray,
    outcome: mostRecentOutcome
} = mostRecentRound[mostRecentRound.length - 1];


renderHeader('game');

renderUserInfo();

renderScoreBoard();

populateBoardElement(boardForm, mostRecentBoard);

displayWinner();

if (mostRecentOutcome === 1 || mostRecentOutcome === -1) {
    mostRecentWinningArray.forEach(element => {
        winningLine(element);
    });
    
}

boardForm.addEventListener('mouseup', (e) => {

    executeFullTurn(e);
});


newGameButton.addEventListener('click', () => {
    const winMSG = document.getElementById('win-msg');
    winMSG.classList.add('hidden');

    pushNewRoundToLocalStorage();
    resetGameBoardDOM();
    const userInfo = getUserInfo();
    const userName = document.getElementById('user-name');
    userName.textContent = `${userInfo.name}`;
    const difficultyElem = document.getElementById('difficulty');
    difficultyElem.textContent = `${userInfo.difficulty} Mode`;

    // Unhide Button
    newGameButton.classList.add('hidden');
    const roundsData = getFromLocalStorage('roundsData');
    const currentBoard = roundsData[roundsData.length - 1].board;

    if (roundsData.length % 2 === 0) {
        executeComputerMove(currentBoard, roundsData);
    }

});


