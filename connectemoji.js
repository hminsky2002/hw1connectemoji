const wcwidth = require('wcwidth');

const generateBoard = (rows,cols,fill) => {
    var board = {
	rows: rows,
	cols: cols,
	data: new Array(rows*cols)
    };
    if(fill == undefined){
	board.data.fill(null);
    }
    else{
	board.data.fill(fill);
    }
    return board;
};

const indexToRowCol= (board,i) => {
    var position = {
        row: Math.floor(i/board.rows),
        col: i % board.rows
    };
    return position;
};

const setCell = (board,row,col,value) => {
    var newboard = generateBoard(board.rows,board.cols);
    newboard.data = board.data.slice();
    newboard.data[(row*board.cols)+col] = value;
    return newboard;
}



const setCells = (board,...moves) => {
    var newboard = generateBoard(board.rows,board.cols);
    newboard.data = board.data.slice();
    for(let i = 0; i < moves.length; i++){
        newboard.data[(moves[i].row*newboard.cols)+moves[i].col] = moves[i].val;
    };
    return newboard;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const makeCell = (val) => {
    if(val == null){
        return "    |";
    }
    if(wcwidth(val) == 1){
        return ` ${val}  |`;
    }
    if(wcwidth(val) == 2) {
        return ` ${val} |`;
    }
}

const boardToString = (board) => {
    let output = "";
    for(let i = 0; i < board.data.length; i++){
        if(i % board.cols == 0){
            output += "|" + makeCell(board.data[i]);
        }
        else if((i+1) % board.cols == 0){
            output +=  makeCell(board.data[i]) + "\n";
        }
        else{
            output += makeCell(board.data[i]);
        }
    }
    output += "|";
    for(let i = 0; i < board.cols; i++){
        if(i < board.rows-1) {
            output += ("-".repeat(4)) + "+";
        }
        else{
            output += ("-".repeat(4)) + "|";
        }
    }
    output += "\n";
    output += "|"
    for(let i = 0; i < board.cols; i++){
        output += makeCell(alphabet[i]);
    }
    return output;
}

const letterToCol = (letter) =>{
    let val = alphabet.indexOf(letter);
    if(val != -1){
        return val;
    }
    else{
        return null;
    }
}

const getEmptyRowCol = (board,letter,empty) =>{
    if(letterToCol(letter) == null || letterToCol(letter)+1 > board.cols ){
        return null;
    }
    if(empty == undefined){
        empty = null;
    }
    var pos = {
        row: null,
        col: null
    };
    let flag = false;
    for(let i = 0; i < board.rows; i++){
        if(board.data[(i*board.cols) + letterToCol(letter)] == empty){
            if(flag == true){
                return null;
            }
            if((((i+1)*board.cols) + letterToCol(letter)) > (board.data.length-1)){
                pos.row = i;
                pos.col = letterToCol(letter);
                return pos;
            }
            else if(board.data[((i+1)*board.cols) + letterToCol(letter)] != empty) {
                pos.row = i;
                pos.col = letterToCol(letter);
                return pos;
            }
            else{
                continue;
            }

        }
        if(board.data[(i*board.cols) + letterToCol(letter)] != empty) {
            flag = true;
        }
    }
    return null;
}

const getAvailableColumns = (board) =>{
    var freecols = [];
    for(let i = 0; i < board.cols; i++){
        if(getEmptyRowCol(board,alphabet[i]) != null) {
            freecols.push(alphabet[i])
        }
    }
    return freecols;
}
function getArrayIndex(board,row,col){
    return (row*board.cols)+col;
}

function checkLeft(board,value,row,col){
    let output = 0;
    while(col >= 0){

        if(board.data[getArrayIndex(board,row,col)] == value){
            output+=1
        }
        col--;
    }
   return output;
}
function checkRight(board,value,row,col){
    let output = 0;
    while(col < board.cols){

        if(board.data[getArrayIndex(board,row,col)] == value){
            output+=1
        }
        col++;
    }
    return output;
}
function checkDown(board,value,row,col){
    let output = 0;
    while(row < board.rows){

        if(board.data[getArrayIndex(board,row,col)] == value){
            output+=1
        }
        row++;
    }
    return output;
}
function checkUp(board,value,row,col){
    let output = 0;
    while(row >= 0){

        if(board.data[getArrayIndex(board,row,col)] == value){
            output+=1
        }
        row--;
    }
    return output;
}

function checkUpRight(board,value,row,col){
    let output = 0;
    while(row >= 0 && col < board.cols){

        if(board.data[getArrayIndex(board,row,col)] == value){
            output+=1
        }
        row--;
        col++;
    }
    return output;
}
function checkUpLeft(board,value,row,col){
    let output = 0;
    while(row >= 0 && col >= 0){

        if(board.data[getArrayIndex(board,row,col)] == value){
            output+=1
        }
        row--;
        col--;
    }
    return output;
}
function checkDownRight(board,value,row,col){
    let output = 0;
    while(row < board.rows && col < board.cols){

        if(board.data[getArrayIndex(board,row,col)] == value){
            output+=1
        }
        row++;
        col++;
    }
    return output;
}
function checkDownLeft(board,value,row,col){
    let output = 0;
    while(row < board.rows && col >= 0){

        if(board.data[getArrayIndex(board,row,col)] == value){
            output+=1
        }
        row++;
        col--;
    }
    return output;
}

const hasConsecutiveValues = (board,row,col,n) => {
    const value = board.data[getArrayIndex(board,row,col)];
    if((checkUp(board,value,row,col) + checkDown(board,value,row,col)) >= n+1){
        return true;
    }
    if(checkLeft(board,value,row,col) + checkRight(board,value,row,col) >= n+1){
        return true;
    }
    if((checkUpRight(board,value,row,col) + checkDownRight(board,value,row,col) + checkUpLeft(board,value,row,col) + checkDownLeft(board,value,row,col)) >= n+3){
        return true;
    }
    return false;
}

module.exports = {
    generateBoard: generateBoard,
    indexToRowCol: indexToRowCol,
    setCell: setCell,
    setCells: setCells,
    boardToString: boardToString,
    letterToCol: letterToCol,
    getEmptyRowCol: getEmptyRowCol,
    getAvailableColumns: getAvailableColumns,
    hasConsecutiveValues: hasConsecutiveValues
};
