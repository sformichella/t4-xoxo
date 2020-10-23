import { setInLocalStorage } from './utils.js';
import { renderHeader } from './header/header.js';
import { makeFreshBoard } from './game-page/game-page-utils.js';

renderHeader('home');

localStorage.clear();

const form = document.getElementById('user-form');
const anchorTag = document.querySelectorAll('a');
const headerLabels = document.getElementsByClassName('header-label');

anchorTag[1].style.display = 'none';
headerLabels[1].style.display = 'none';
anchorTag[2].style.display = 'none';
headerLabels[2].style.display = 'none';


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const roundObject = {
        name: formData.get('name'),
        piece: formData.get('piece'),
        color: formData.get('color'),
        difficulty: formData.get('game-style'),
        outcome: -2,
        board: makeFreshBoard(),
        winningArray: []

    };

    const roundsArray = [];
    roundsArray.push(roundObject);

    setInLocalStorage('roundsData', roundsArray);

    window.location.replace('./game-page/index.html');
});

