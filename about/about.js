import { renderHeader } from '../header/header.js';
import { getFromLocalStorage } from '../utils.js';

renderHeader();

const checkLocalStorage = getFromLocalStorage('roundsData'); 
const playLinkDiv = document.getElementById('play-div');
const resultsLinkDiv = document.getElementById('results-div');
console.log(checkLocalStorage);
console.log(playLinkDiv);

if (checkLocalStorage !== null && checkLocalStorage !== undefined && checkLocalStorage.length !== 0){
    playLinkDiv.style.display = 'flex';
    resultsLinkDiv.style.display = 'flex';
} else {
    playLinkDiv.style.display = 'none';
    resultsLinkDiv.style.display = 'none';
}
