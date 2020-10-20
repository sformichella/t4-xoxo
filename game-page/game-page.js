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

    //getting currentboard from local storage
    const roundsData = getFromLocalStorage('roundsData');
    const currentBoard = roundsData[roundsData.length - 1].board;

    //setting the clicked div 
    const cell = e.target;

    //if there is an image on the div or the game has an outcome exit click handler
    if (cell.src || roundsData[roundsData.length - 1].outcome > -2) {
        return;
    }

    //sets color of X piece
    cell.innerHTML = gameColorPieceX(roundsData[0].color);

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


    //checks if a winning combination is on the board
    let winStatus = checkWin(currentBoard);

    //if there is no winning combination let the computer go
    if (winStatus === null) {
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

        //checks for win status after computer has made move
        winStatus = checkWin(currentBoard);

    }
    //check if win status has been reached after player and/or computer moves
    if (winStatus) {
        //places results in squares on page
        renderGameResult(winStatus);
        //increment localstorage to -1, 0, or 1
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
