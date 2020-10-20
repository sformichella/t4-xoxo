// Get local storage and findbyid and stuff, reset,

export function getFromLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

export function setInLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

export function findByID(array, id){
    for (const element of array){
        if (element.id === id){
            return element;
        }
    }
    return null;
}

export function makeBoardElement() {
    const boardContainer = document.createElement('form');

    const cells = [
        'top-left',
        'top-mid',
        'top-right',
        'mid-left',
        'mid-mid',
        'mid-right',
        'bottom-left',
        'bottom-mid',
        'bottom-right'
    ];

    cells.forEach(cellName => {
        const cell = document.createElement('div');
            cell.id = cellName
            cell.classList.add('game-cell');
        boardContainer.appendChild(cell);
    });

    boardContainer.classList.add('game-board');

    return boardContainer
}