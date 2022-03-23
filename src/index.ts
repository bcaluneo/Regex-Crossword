import { generate } from "./board.js";
import * as utils from "./util.js";

async function main() {
  var data:string[] = await utils.loadData() as string[];
  // generate a board
  // generate regex for all the cols and rows
  // display the rules to the user
  // validate at the end if the boards are equal
  var board:string[] = [];
  while (board.length == 0) {
    board = generate(data);
  }

  console.table(board);

  document.getElementById("test").textContent = "pls work :D";
  // board.forEach(string => {
  //   document.getElementById("test").textContent += string;
  // });
}

main();
