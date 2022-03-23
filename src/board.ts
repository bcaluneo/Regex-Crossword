import * as utils from "./util.js";

// HARLS NAMAZ TAPET GAZEE SOFAR VELAL
// OBELI OVARY ARULO OMENS AREFY IMIDO
// PIKAS MINIM MERIL TASTE GARAD NAVEW
// EDEMA ASSAI ERGAL TITER ANICE CIRES
// RIYAL DOESN REASY ANSAE STEER ELEME

// WORD APPLE HONEST
// OAAR PP AL O    S
// RAAO P P P N    E
// DORW LA LP E    N
//      ELPPA S   SO
//            TSTNOH
export function generate(data:string[]): string[] {
  var result:string[] = [];
  var seed:string = utils.randomWord(data, 4);
  result.push(seed);
  var left:string = utils.startsWith(data, seed[0], seed.length);
  var bottom:string = utils.startsWith(data, left[seed.length - 1], seed.length);
  var right:string = utils.startsAndEndsWith(data, seed[seed.length - 1], bottom[seed.length - 1], seed.length);
  var leftDiag:string = utils.startsAndEndsWith(data, seed[0], bottom[seed.length - 1], seed.length);
  var rightDiag:string = utils.startsAndEndsWith(data, seed[seed.length - 1], bottom[0], seed.length);

  if (right == null || leftDiag == null || rightDiag == null || bottom == null) return [];

  var secondWord:string = left[1].concat(leftDiag[1]).concat(rightDiag[1]).concat(right[1]);
  var thirdWord:string = left[2].concat(rightDiag[2]).concat(leftDiag[2]).concat(right[2]);

  result.push(secondWord);
  result.push(thirdWord);
  result.push(bottom);

  return result;
}
