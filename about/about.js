import { renderHeader } from '../header/header.js';
import { getFromLocalStorage } from '../utils.js';

renderHeader('about');

const checkLocalStorage = getFromLocalStorage('roundsData'); 
const playLinkDiv = document.getElementById('play-div');
const resultsLinkDiv = document.getElementById('results-div');

const flexOrNone = (
    checkLocalStorage !== null 
    && checkLocalStorage !== undefined 
    && checkLocalStorage.length !== 0
) ? 'flex' : 'none';

playLinkDiv.style.display = flexOrNone;
resultsLinkDiv.style.display = flexOrNone;

