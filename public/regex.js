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
// [0-9]	Number between 0 and 9
// [A-Z0-9]	Characters between A and Z, and numbers between 0 and 9
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
function generateRange(char) {
    var ran = utils.randomCharacter();
    while (char == ran) {
        ran = utils.randomCharacter();
    }
    var roll = Math.random();
    if (roll <= .5) {
        return `(${char}|${ran})`;
    }
    return `(${ran}|${char})`;
}
export function regex(word) {
    var result = "";
    var skip = false;
    for (var i = 0; i < word.length; ++i) {
        if (skip) {
            skip = false;
            continue;
        }
        var roll = Math.random();
        if (roll < .2) {
            result += ".";
        }
        else {
            roll = Math.random();
            if (roll < .3) {
                result += generateRange(word[i]);
            }
            else if (roll >= .3 && roll < .55) {
                result += word[i];
            }
            else {
                if (i == word.length - 1) {
                    roll = Math.random();
                    result += word[i];
                    if (roll < .29) {
                        result += "*";
                    }
                    else if (roll >= .29 && roll < 58) {
                        result += "+";
                    }
                    else {
                        result += "?";
                    }
                }
                else if (word[i] == word[i + 1]) {
                    roll = Math.random();
                    if (roll < .18) {
                        result += generateRange(word[i]);
                    }
                    else if (roll >= .18 && roll < .55) {
                        result += word[i] + "+";
                        skip = true;
                    }
                    else {
                        result += word[i] + "*";
                        skip = true;
                    }
                }
                else {
                    result += generateRange(word[i]);
                }
            }
        }
    }
    if (result == word)
        return regex(word);
    return result;
}
