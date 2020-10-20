import { checkWin, getPlayerMoves } from '../game-page/game-page-utils.js';

import gameData from '../data/data.js'



const test = QUnit.test;

test('getPlayer moves should take in a game board array and a string and return an array of that players moves', (expect) => {
    const boardOne = gameData[2].board;
    const player = 'player';

    const expected = [0, 1, 4, 8];

    const actual = getPlayerMoves(boardOne, player);

    expect.deepEqual(actual, expected);
});
