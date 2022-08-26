const c = require('./connectemoji.js');
const s = 'XOD';
let board = c.generateBoard(3, 3);
const result = c.autoplay(board, s, 4);
console.log(result)