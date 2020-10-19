import { renderHeader } from '../header/header.js';

renderHeader();

//grab user input from local storage and set player name and difficulty on page

//hide play button (CSS?)

//click handler on each cell to put X or O in cell
    //if cell is occupied do not execute more logic (ie. break out of handler)
    // place SVG image on board cell
    // update local board with turn and player who placed piece
    // check if player has won
    // check if 9 moves occurred
        //if win, push outcome to local storage object
        //display next game option
        //increment wins, losses, or cats on page
        //if no win computer goes
            //figure out computer next move
            //play computer svg piece in cell
            //update board object
            //check if computer won
            //check if 9 move occurred

