const c = require('./connectemoji.js');
const readlineSync = require('readline-sync');
const process = require('process');
const {autoplay} = require("./connectemoji");

readlineSync.question('press ENTER to continue:')

if(process.argv.length > 2) {
    const input = process.argv[2].split(",");
    const characters = [...input[1]]

    const board = c.generateBoard(input[2], input[3])

    const result = autoplay(board, characters, parseInt(input[4]))

    console.log(c.boardToString(result.board));

    if (result.winner != undefined) {
        console.log(`winner is: ${result.winner}`)
    } else {
        while (result.winner == undefined) {
            let move = readlineSync.question("Choose a column letter to drop your piece in: ")
            let pos = c.getEmptyRowCol(result.board, move)
            result.board.data[c.getArrayIndex(result.board, pos.row, pos.col)] = result.lastPieceMoved == result.pieces[0] ? result.pieces[1] : result.pieces[0];
            result.lastPieceMoved = result.board.data[c.getArrayIndex(result.board, pos.row, pos.col)]
            console.log(c.boardToString(result.board));
            c.checkWinner(result, parseInt((input[4])))
        }
        console.log(`winner is: ${result.winner}`)
    }
}
else{
    const setup = readlineSync.question('Enter the number of rows, columns, and consecutive "pieces" for win \n ' +
        '(all separated by commas... for example: 6,7,4)');
    const setupsplit = setup.split(",");
    const rows = setupsplit[0];
    const cols = setupsplit[1];
    const numConsecutive = parseInt(setupsplit[2]);
    const pieces = readlineSync.question('Enter two characters that represent the player and computer \n'
    + "separated by a comma... for example: P,C)");

    const piecesSplit = pieces.split(",");
    const p1 = piecesSplit[0]
    const p2 = piecesSplit[1]
    const characters = p1+p2
    const orderinput = readlineSync.question("Who goes first, (P)layer or (C)omputer?")
    var order = "P"
    if(orderinput == "P"){
        order = "P";
    }
    else if (orderinput == "C"){
        order = "P";
    }
    const board = c.generateBoard(rows, cols)

    const result = autoplay(board, characters, numConsecutive)

    console.log(c.boardToString(result.board));
    let move = readlineSync.question("Choose a column letter to drop your piece in: ")
    let pos = c.getEmptyRowCol(result.board, move)
    result.board.data[c.getArrayIndex(result.board, pos.row, pos.col)] = order == "P" ? result.pieces[0] : result.pieces[1];
    result.lastPieceMoved = result.board.data[c.getArrayIndex(result.board, pos.row, pos.col)]
    console.log(c.boardToString(result.board));
    while (result.winner == undefined) {
        let move = readlineSync.question("Choose a column letter to drop your piece in: ")
        let pos = c.getEmptyRowCol(result.board, move)
        result.board.data[c.getArrayIndex(result.board, pos.row, pos.col)] = result.lastPieceMoved == result.pieces[0] ? result.pieces[1] : result.pieces[0];
        result.lastPieceMoved = result.board.data[c.getArrayIndex(result.board, pos.row, pos.col)]
        console.log(c.boardToString(result.board));
        c.checkWinner(result, numConsecutive)
    }
    console.log(`winner is: ${result.winner}`)


}