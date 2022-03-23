import { generate } from "./board.js";
import * as utils from "./util.js";

let data:string[] = [];
let board:string[] = [];
const WORD_LENGTH:number = 4;

document.getElementById("generate").onclick = function() { makeAndSetBoard(data) };
document.getElementById("validate").onclick = function() { validateBoard(board) };

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

function validateBoard(board:string[]) {
  for (var i = 0; i < WORD_LENGTH; ++i) {
    var word:string = board[i];
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

  board = [];
  while (board.length == 0) {
    board = generate(data);
  }

  document.getElementById("help").textContent = "Generated.";

  for (var i = 0; i < WORD_LENGTH; ++i) {
    var word:string = board[i];

    for (var j = 0; j < WORD_LENGTH; ++j) {
      var cell:number = (i * 4) + j;
      var gridID = `g${cell}`;
      // document.getElementById(gridID.toString()).textContent = word[j];
    }
  }
}

async function main() {
  data = await utils.loadData() as string[];
  makeAndSetBoard(data);

  // I can get and set the text from an input element like this:
  // var element:HTMLInputElement = document.getElementById("g0") as HTMLInputElement;
  // element.value = "z";
}

main();
