import * as utils from "./util";

// Quantifiers
// n*	0 or more n
// n+	1 or more n
// n?	0 or 1 n

// Advanced maybe?
// n{2}	Exactly 2 n
// n{2,}	2 or more n
// n{2,4}	2, 3 or 4 n

// Ranges
// (A|B)	A or B
// [ABC]	Range (A, B or C)
// [^ABC]	Not A, B or C
// [A-Z]	Character between A and Z, upper case

// 25% of being any type of range
// there's code in place for (A|B)
// [ABC]:
// pick character and 2 random characters

// .	Any character except new line (\n)

// 80 - 20
// quantifier
/*
  1. 30% of being a range
  2. 25% of being itself
  3. 65% remaining:
    1. check if last character, if true goto 3
    2. if next character is the same:
      2.1 45% chance of *
      2.2 37% chance of +
      2.3 18% chance of range
    3. 29% to generate *, +, or ?
    4. 12% to generate range
*/
// range
/*
  (random|A) or (A|random)
*/

function generateRange(char:string):string {
  var roll:number = Math.random();
  if (roll < .25) {
    var ran:string = utils.randomCharacter();
    while (char == ran) {
      ran = utils.randomCharacter();
    }

    roll = Math.random();
    if (roll <= .5) {
      return `(${char}|${ran})`;
    }

    return `(${ran}|${char})`;
  } else if (roll >= .25 && roll < .50) {
    var ran0:string = utils.randomCharacter();
    var ran1:string = utils.randomCharacter();
    while (ran0 == ran1 || ran0 == char || ran1 == char) {
      ran0 = utils.randomCharacter();
      ran1 = utils.randomCharacter();
    }

    // var result:string = permute([char, ran0, ran1]);
    var result:string = char + ran0 + ran1;
    return `[${result}]`;
  } else if (roll >= .5 && roll < .75) {
    var ix:number = utils.getIndexFromChar(char);
    var first:string = utils.getCharFromIndex(Math.abs(4 - ix));
    var second:string  = utils.getCharFromIndex(Math.abs(8 - ix));
    var third:string = utils.getCharFromIndex(Math.abs(12 - ix));

    // var result:string = permute([first, second, third]);
    var result:string = first + second + third;
    return `[${^result}]`;
  } else {
    return `[${char}]`;
  }
}

function generateUnary(char:string):string {
  var op:string = "";
  var roll:number = Math.random();
  if (roll < .29) {
    op = "*";
  } else if (roll >= .29 && roll < 58) {
    op = "+";
  } else {
    op = "?";
  }

  return `${char}${op}`;
}

function generateSameUnary(char:string):string {
  var op:string = "";
  var roll:number = Math.random();
  if (roll < .18) {
    return generateRange(char);
  } else if (roll >= .18 && roll < .55) {
    op = "+";
  } else {
    op = "*";
  }

  return `${char}${op}`;
}

export function regex(word:string):string {
  var result:string = "";
  var skip:boolean = false;
  for (var i = 0; i < word.length; ++i) {
    if (skip) {
      skip = false;
      continue;
    }

    var roll:number = Math.random();
    if (roll < .2) {
      result += ".";
    } else {
      roll = Math.random();
      if (roll < .3) {
        result += generateRange(word[i]);
      } else if (roll >= .3 && roll < .55) {
        result += word[i];
      } else {
        if (i == word.length - 1) {
          roll = Math.random();
          result += generateUnary(word[i]);
        } else if (word[i] == word[i + 1]) {
          roll = Math.random();
          result += generateSameUnary(word[i]);
          skip = result[result.length - 1] == "+" || result[result.length - 1] == "*";
        } else {
          result += generateRange(word[i]);
        }
      }
    }
  }

  if (result == word) return regex(word);

  return result;
}
