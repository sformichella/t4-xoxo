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

    // very
    cells.forEach(cellName => {
        const cell = document.createElement('div');
        cell.id = cellName,
        cell.classList.add('game-cell');
        boardContainer.appendChild(cell);
    });

    boardContainer.classList.add('game-board');

    return boardContainer;
}

// would have been nice to see this made with the dom api--HTML strings are a little unsettling
//use this function to generate the html that will go into image variable in game-page.js line 53
export function gameColorPieceX(color) {       
    const gamePieceHtml = `<svg width="96" height="96" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="hidden"><defs><clipPath id="clip0"><rect x="0" y="0" width="96" height="96"/></clipPath></defs><g clip-path="url(#clip0)"><path d="M0 0 96 0 96 96 0 96Z" fill="#FFFFFF" fill-rule="evenodd" fill-opacity="0"/><path d="M17 17 79.5002 79.5002" stroke="${color}" stroke-width="8" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/><path d="M0 0 62.4999 62.4997" stroke="${color}" stroke-width="8" stroke-miterlimit="8" fill="none" fill-rule="evenodd" transform="matrix(1 0 0 -1 17 79.4997)"/></g></svg>`;
    return gamePieceHtml;
}