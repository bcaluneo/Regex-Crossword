import { Board } from "./board.js";
import { regex } from "./regex.js";
import * as utils from "./util.js";

let data:string[] = [];
let board:Board;
const WORD_LENGTH:number = 4;

document.getElementById("generate").onclick = function() { start() };
document.getElementById("validate").onclick = function() { validateBoard() };

function clearBoard() {
  for (var i = 0; i < WORD_LENGTH; ++i) {
    for (var j = 0; j < WORD_LENGTH; ++j) {
      var ix:number = (i * 4) + j;
      var gridID:string = `g${ix}`;
      var cell:HTMLInputElement = document.getElementById(gridID) as HTMLInputElement;
      cell.value = "";
    }
  }
}

function validateBoard() {
  for (var i = 0; i < WORD_LENGTH; ++i) {
    var word:string = board.words[i];
    var currentWord:string = "";
    for (var j = 0; j < WORD_LENGTH; ++j) {
      var ix:number = (i * 4) + j;
      var gridID:string = `g${ix}`;
      var cell:HTMLInputElement = document.getElementById(gridID) as HTMLInputElement;
      currentWord += cell.value.toString();
    }

    if (word != currentWord) {
      document.getElementById("help").textContent = "Not quite.";
      return;
    }
  }

  document.getElementById("help").textContent = "Good job.";
}

function makeAndSetBoard(data:string[]) {
  clearBoard();

  board = new Board();
  while (board.words.length == 0) {
    board.generate(data);
  }

  console.table(board.words);

  document.getElementById("help").textContent = "Generated.";
}

function makeAndSetRules() {
  var topRegex:string = regex(board.top);
  var bottomRegex:string = regex(board.bottom);
  var leftRegex:string = regex(board.top);
  var rightRegex:string = regex(board.top);
  var rdiagRegex:string = regex(board.rdiag);
  var ldiagRegex:string = regex(board.ldiag);

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
  data = await utils.loadData() as string[];
  start();
}

main();
