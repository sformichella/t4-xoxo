import { makeBoardElement, findByID } from '../utils.js';
import data from '../data/data.js';

const boardElement = makeBoardElement();

const body = document.body;

body.appendChild(boardElement);
