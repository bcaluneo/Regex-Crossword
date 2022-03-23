import { Board } from "./board.js";
import { regex } from "./regex.js";
import * as utils from "./util.js";
let data = [];
let board;
const WORD_LENGTH = 4;
document.getElementById("generate").onclick = function () { start(); };
document.getElementById("validate").onclick = function () { validateBoard(); };
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
function validateBoard() {
    for (var i = 0; i < WORD_LENGTH; ++i) {
        var word = board.words[i];
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
    board = new Board();
    while (board.words.length == 0) {
        board.generate(data);
    }
    console.table(board.words);
    document.getElementById("help").textContent = "Generated.";
}
function makeAndSetRules() {
    var topRegex = regex(board.top);
    var bottomRegex = regex(board.bottom);
    var leftRegex = regex(board.top);
    var rightRegex = regex(board.top);
    var rdiagRegex = regex(board.rdiag);
    var ldiagRegex = regex(board.ldiag);
    document.getElementById("top").textContent = topRegex;
    document.getElementById("bottom").textContent = bottomRegex;
    document.getElementById("left").textContent = leftRegex;
    document.getElementById("right").textContent = rightRegex;
    document.getElementById("rdiag").textContent = rdiagRegex;
    document.getElementById("ldiag").textContent = ldiagRegex;
}
function start() {
    makeAndSetBoard(data);
    makeAndSetRules();
}
async function main() {
    data = await utils.loadData();
    start();
}
main();
