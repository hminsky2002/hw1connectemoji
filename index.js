const c = require('./connectemoji.js');
const board = c.generateBoard(3, 4, ' ');
const updatedBoard = c.setCells(
    board,
    {row:2, col:2, val: '😄'},
    {row:2, col:1, val: '🤮'},
    {row:1, col:1, val: '😄'},
    {row:2, col:0, val: '🤮'},
    {row:1, col:0, val: '🤮'},
    {row:0, col:0, val: '😄'},
);
console.log(c.boardToString(updatedBoard));
console.log(c.hasConsecutiveValues(updatedBoard, 2, 2, 3));
// true
console.log(c.hasConsecutiveValues(updatedBoard, 1, 1, 3));
// true
console.log(c.hasConsecutiveValues(updatedBoard, 0, 0, 3));
// true
