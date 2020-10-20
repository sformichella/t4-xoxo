import { renderHeader } from '../header/header.js';
import { getFromLocalStorage, setInLocalStorage, gameColorPieceX } from '../utils.js';
import { checkWin, getTurnNumber, getComputerMove, renderGameResult, pushNewRoundToLocalStorage, setOutcomeInteger, getUserInfo, cellLocation, cellName, populateBoardElement } from './game-page-utils.js';

renderHeader();

const userInfo = getUserInfo();

const userName = document.getElementById('user-name');
userName.textContent = `User: ${userInfo.name}`;

const difficultyElem = document.getElementById('difficulty');
difficultyElem.textContent = `Difficulty: ${userInfo.difficulty}`;

const totalWins = document.getElementById('total-wins');
const totalLosses = document.getElementById('total-losses');
const totalCats = document.getElementById('total-cats');

totalWins.textContent = localStorage.getItem('Wins');
totalLosses.textContent = localStorage.getItem('Losses');
totalCats.textContent = localStorage.getItem('Cats');

const boardForm = document.getElementById('board-form');

const mostRecentRound = getFromLocalStorage('roundsData');
const mostRecentBoard = mostRecentRound[mostRecentRound.length - 1].board;
populateBoardElement(boardForm, mostRecentBoard);

boardForm.addEventListener('click', (e) => {

    const roundsData = getFromLocalStorage('roundsData');
    const currentBoard = roundsData[roundsData.length - 1].board;

    // Set Image to X
    const cell = e.target;

    if (cell.src || roundsData[roundsData.length - 1].outcome > -2) {
        return;
    }

    cell.innerHTML = gameColorPieceX(roundsData[0].color);

    // Adjust Board Object in localStorage
    const cellNumber = cellLocation(cell.id);


    currentBoard[cellNumber].player = 'player';

    let numberOfTurns = getTurnNumber(currentBoard) + 1;
    currentBoard[cellNumber].turn = numberOfTurns;

    roundsData[roundsData.length - 1].board = currentBoard;
    setInLocalStorage('roundsData', roundsData);

    let winStatus = checkWin(currentBoard);

    if (winStatus === null) {
        const computersMove = getComputerMove();
        const computerCell = document.getElementById(cellName(computersMove));

        const compImage = document.createElement('img');
        compImage.setAttribute('src', '../assets/SingleO.svg');
        computerCell.appendChild(compImage);

        currentBoard[computersMove].player = 'computer';

        numberOfTurns = getTurnNumber(currentBoard) + 1;
        currentBoard[computersMove].turn = numberOfTurns;

        roundsData[roundsData.length - 1].board = currentBoard;
        setInLocalStorage('roundsData', roundsData);

        winStatus = checkWin(currentBoard);

    }

    if (winStatus) {
        renderGameResult(winStatus);
        setOutcomeInteger(winStatus);
    }

});

const newGameButton = document.getElementsByTagName('button')[0];
const resetSeriesButton = document.getElementsByTagName('button')[1];

newGameButton.addEventListener('click', () => {
    pushNewRoundToLocalStorage();

    resetGameBoardDOM();

    const userInfo = getUserInfo();

    const userName = document.getElementById('user-name');
    userName.textContent = `User: ${userInfo.name}`;

    const difficultyElem = document.getElementById('difficulty');
    difficultyElem.textContent = `Difficulty: ${userInfo.difficulty}`;
});


resetSeriesButton.addEventListener('click', () => {

    window.location.replace('../index.html');
});



function resetGameBoardDOM() {
    for (let i = 0; i < 9; i++) {
        const location = cellName(i);
        const locationDOM = document.getElementById(location);
        const hasChild = document.getElementById(location).childElementCount;
        if (hasChild === 1) {
            locationDOM.removeChild(locationDOM.firstChild);
        }
    }
}
