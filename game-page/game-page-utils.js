import { getFromLocalStorage } from '../utils.js';

export function getComputerMove(){

    const taken = [];

    const roundsData = getFromLocalStorage('roundsData');
    const currentBoard = roundsData[roundsData.length - 1].board;

    for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i].turn !== -1) {
            taken.push(i);
        }
    }
 
    let rand = Math.floor(Math.random() * 9);
    
    while (taken.includes(rand)) {
        rand = Math.floor(Math.random() * 9);
    }

    return rand;
}
