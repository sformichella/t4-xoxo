export default [{
    name: 'abc',
    piece: 'x',
    color: 'red',
    difficulty: 'easy',
    outcome: 1,
    board:[
        {
            player: 'player',
            turn:0
        },
        {
            player: 'player',
            turn:2
        },
        {
            player: 'player',
            turn:4
        },
        {
            player:null,
            turn:null
        },
        {
            player:null,
            turn:null
        },
        {
            player:null,
            turn:null
        },
        {
            player:null,
            turn:null
        },
        {
            player: 'computer',
            turn: 3
        },
        {
            player: 'computer',
            turn: 1
        }
    ] },
{
    name: 'abc',
    piece: 'x',
    color: 'red',
    difficulty: 'easy',
    outcome: -1,
    board:[
        {
            player: 'player',
            turn: 4
        },
        {
            player:null,
            turn:null
        },
        {
            player:null,
            turn:null
        },
        {
            player: 'computer',
            turn:1
        },
        {
            player: 'computer',
            turn: 3
        },
        {
            player: 'computer',
            turn: 5
        },
        {
            player:null,
            turn:null
        },
        {
            player: 'player',
            turn: 2
        },
        {
            player: 'player',
            turn: 0
        }
    ] },
{
    name: 'abc',
    piece: 'x',
    color: 'red',
    difficulty: 'easy',
    outcome: 1,
    board:[
        {
            player: 'player',
            turn: 0
        },
        {
            player: 'player',
            turn: 2
        },
        {
            player: 'computer',
            turn: 1
        },
        {
            player: 'computer',
            turn: 3
        },
        {
            player: 'player',
            turn: 4
        },
        {
            player:null,
            turn:null
        },
        {
            player:null,
            turn:null
        },
        {
            player: 'computer',
            turn: 5
        },
        {
            player: 'player',
            turn: 6
        }
    ] },




];


export const wins = 2;
export const losses = 1;
export const ties = 0;