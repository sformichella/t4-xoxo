import { renderHeader } from '../header/header.js';
import { getFromLocalStorage } from '../utils.js';
import { pushNewRoundToLocalStorage, getUserInfo, cellName, populateBoardElement, executeFullTurn } from './game-page-utils.js';

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

    executeFullTurn(e);    


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
