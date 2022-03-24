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
            cell.style.background = "#ffffff";
            cell.parentElement.style.background = "#ffffff";
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
            if (word[j] != cell.value.toString()) {
                cell.style.background = "#ffaaaa";
                cell.parentElement.style.background = "#ffaaaa";
            }
            else {
                cell.style.background = "#aaffaa";
                cell.parentElement.style.background = "#aaffaa";
            }
            currentWord += cell.value.toString();
        }
    }
}
function makeAndSetBoard(data) {
    clearBoard();
    board = new Board();
    while (board.words.length == 0) {
        board.generate(data);
    }
    console.table(board.words);
}
function makeAndSetRules() {
    for (var i = 0; i < 4; ++i) {
        var word = board.words[i];
        var rule = regex(word);
        document.getElementById(`a${i}`).textContent = rule;
    }
    for (var i = 0; i < 4; ++i) {
        var word = board.words[0][i];
        for (var j = 1; j < 4; ++j) {
            word += board.words[j][i];
        }
        var rule = regex(word);
        document.getElementById(`d${i}`).textContent = rule;
    }
    // var topRegex:string = regex(board.top);
    // var bottomRegex:string = regex(board.bottom);
    // var leftRegex:string = regex(board.top);
    // var rightRegex:string = regex(board.top);
    // var rdiagRegex:string = regex(board.rdiag);
    // var ldiagRegex:string = regex(board.ldiag);
    //
    // document.getElementById("top").textContent = topRegex;
    // document.getElementById("bottom").textContent = bottomRegex;
    // document.getElementById("left").textContent = leftRegex;
    // document.getElementById("right").textContent = rightRegex;
    // document.getElementById("rdiag").textContent = rdiagRegex;
    // document.getElementById("ldiag").textContent = ldiagRegex;
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
