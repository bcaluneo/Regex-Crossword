import { generate } from "./board.js";
import * as utils from "./util.js";
let data = [];
let board = [];
const WORD_LENGTH = 4;
document.getElementById("generate").onclick = function () { makeAndSetBoard(data); };
document.getElementById("validate").onclick = function () { validateBoard(board); };
function clearBoard() {
    for (var i = 0; i < WORD_LENGTH; ++i) {
        for (var j = 0; j < WORD_LENGTH; ++j) {
            var ix = (i * 4) + j;
            var gridID = `g${ix}`;
            var cell = document.getElementById(gridID);
            cell.value = "";
        }
    }
}
function validateBoard(board) {
    for (var i = 0; i < WORD_LENGTH; ++i) {
        var word = board[i];
        var currentWord = "";
        for (var j = 0; j < WORD_LENGTH; ++j) {
            var ix = (i * 4) + j;
            var gridID = `g${ix}`;
            var cell = document.getElementById(gridID);
            currentWord += cell.value.toString();
        }
        if (word != currentWord) {
            document.getElementById("help").textContent = "Not quite.";
            return;
        }
    }
    document.getElementById("help").textContent = "Good job.";
}
function makeAndSetBoard(data) {
    clearBoard();
    board = [];
    while (board.length == 0) {
        board = generate(data);
    }
    console.table(board);
    document.getElementById("help").textContent = "Generated.";
    for (var i = 0; i < WORD_LENGTH; ++i) {
        var word = board[i];
        for (var j = 0; j < WORD_LENGTH; ++j) {
            var cell = (i * 4) + j;
            var gridID = `g${cell}`;
            // document.getElementById(gridID.toString()).textContent = word[j];
        }
    }
}
async function main() {
    data = await utils.loadData();
    makeAndSetBoard(data);
    // I can get and set the text from an input element like this:
    // var element:HTMLInputElement = document.getElementById("g0") as HTMLInputElement;
    // element.value = "z";
}
main();
