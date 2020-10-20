import { setInLocalStorage } from './utils.js';
import { renderHeader } from './header/header.js';

renderHeader();

localStorage.clear();

const form = document.getElementById('user-form');

//Specific to homepage fixes for pathing
const devsImage = document.getElementById('devs');
devsImage.setAttribute('src', './assets/devs.svg');
const homeImage = document.getElementById('home');
homeImage.setAttribute('src', './assets/reset.svg');
const anchorTag = document.querySelectorAll('a');
anchorTag[0].setAttribute('href', './index.html');
anchorTag[3].setAttribute('href', './about/index.html');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    //Build user state object
    const roundObject = {
        name: formData.get('name'),
        piece: formData.get('piece'),
        color: formData.get('color'),
        difficulty: formData.get('game-style'),
        outcome: -2
    };

    const boardSquare = {
        player: null,
        turn: -1
    };

    const boardArray = [];
    for (let i = 0; i < 9; i++){
        boardArray.push(boardSquare);
    }

    roundObject.board = boardArray;
    const roundsArray = [];
    roundsArray.push(roundObject);

    setInLocalStorage('roundsData', roundsArray);

    window.location.replace('./game-page/index.html');
});

