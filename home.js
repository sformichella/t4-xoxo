import { setInLocalStorage, getFromLocalStorage } from './utils.js';

const form = document.getElementById('user-form');




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
        turn: null
    };

    const boardArray = [];
    for (let i = 0; i < 9; i++){
        boardArray.push(boardSquare);
    }

    roundObject.board = boardArray;
    const roundsArray = [];
    roundsArray.push(roundObject);

    setInLocalStorage('roundsData', roundsArray);
});
