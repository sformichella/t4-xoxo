import { setInLocalStorage } from './utils.js';

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

    setInLocalStorage('roundData', roundObject);

});

