(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = void 0;

var utils = _interopRequireWildcard(require("./util.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Board {
  top;
  bottom;
  left;
  right;
  ldiag;
  rdiag;
  words;

  constructor() {
    this.words = [];
  }

  generate(data) {
    this.words = [];
    this.top = utils.randomWord(data, 4);
    this.words.push(this.top);
    this.left = utils.startsWith(data, this.top[0], this.top.length);
    this.bottom = utils.startsWith(data, this.left[this.top.length - 1], this.top.length);
    this.right = utils.startsAndEndsWith(data, this.top[this.top.length - 1], this.bottom[this.top.length - 1], this.top.length);
    this.ldiag = utils.startsAndEndsWith(data, this.top[0], this.bottom[this.top.length - 1], this.top.length);
    this.rdiag = utils.startsAndEndsWith(data, this.top[this.top.length - 1], this.bottom[0], this.top.length);
    if (this.right == null || this.ldiag == null || this.rdiag == null || this.bottom == null) return [];
    var secondWord = this.left[1].concat(this.ldiag[1]).concat(this.rdiag[1]).concat(this.right[1]);
    var thirdWord = this.left[2].concat(this.rdiag[2]).concat(this.ldiag[2]).concat(this.right[2]);
    this.words.push(secondWord);
    this.words.push(thirdWord);
    this.words.push(this.bottom);
    return this.words;
  }

}

exports.Board = Board;
; // HARLS NAMAZ TAPET GAZEE SOFAR VELAL
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

},{"./util.js":4}],2:[function(require,module,exports){
"use strict";

var _board = require("./board.js");

var _regex = require("./regex.js");

var utils = _interopRequireWildcard(require("./util.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let data = [];
let board;
const WORD_LENGTH = 4;

document.getElementById("generate").onclick = function () {
  start();
};

document.getElementById("validate").onclick = function () {
  validateBoard();
};

function clearBoard() {
  for (var i = 0; i < WORD_LENGTH; ++i) {
    for (var j = 0; j < WORD_LENGTH; ++j) {
      var ix = i * 4 + j;
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
      var ix = i * 4 + j;
      var gridID = `g${ix}`;
      var cell = document.getElementById(gridID);

      if (word[j] != cell.value.toString()) {
        cell.style.background = "#ffaaaa";
        cell.parentElement.style.background = "#ffaaaa";
      } else {
        cell.style.background = "#aaffaa";
        cell.parentElement.style.background = "#aaffaa";
      }

      currentWord += cell.value.toString();
    }
  }
}

function makeAndSetBoard(data) {
  clearBoard();
  board = new _board.Board();

  while (board.words.length == 0) {
    board.generate(data);
  }

  console.table(board.words);
}

function makeAndSetRules() {
  for (var i = 0; i < 4; ++i) {
    var word = board.words[i];
    var rule = (0, _regex.regex)(word);
    document.getElementById(`a${i}`).textContent = rule;
  }

  for (var i = 0; i < 4; ++i) {
    var word = board.words[0][i];

    for (var j = 1; j < 4; ++j) {
      word += board.words[j][i];
    }

    var rule = (0, _regex.regex)(word);
    document.getElementById(`d${i}`).textContent = rule;
  } // var topRegex:string = regex(board.top);
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

},{"./board.js":1,"./regex.js":3,"./util.js":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regex = regex;

var utils = _interopRequireWildcard(require("./util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function regex(word) {
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
    } else {
      roll = Math.random();

      if (roll < .3) {
        result += generateRange(word[i]);
      } else if (roll >= .3 && roll < .55) {
        result += word[i];
      } else {
        if (i == word.length - 1) {
          roll = Math.random();
          result += word[i];

          if (roll < .29) {
            result += "*";
          } else if (roll >= .29 && roll < 58) {
            result += "+";
          } else {
            result += "?";
          }
        } else if (word[i] == word[i + 1]) {
          roll = Math.random();

          if (roll < .18) {
            result += generateRange(word[i]);
          } else if (roll >= .18 && roll < .55) {
            result += word[i] + "+";
            skip = true;
          } else {
            result += word[i] + "*";
            skip = true;
          }
        } else {
          result += generateRange(word[i]);
        }
      }
    }
  }

  if (result == word) return regex(word);
  return result;
}

},{"./util":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endsWith = endsWith;
exports.endsWithArray = endsWithArray;
exports.loadData = loadData;
exports.randomCharacter = randomCharacter;
exports.randomWord = randomWord;
exports.startsAndEndsWith = startsAndEndsWith;
exports.startsWith = startsWith;
exports.startsWithArray = startsWithArray;
exports.startsWithArrayLen = startsWithArrayLen;
exports.startsWithSubstring = startsWithSubstring;

function loadData() {
  return new Promise(resolve => {
    fetch('https://raw.githubusercontent.com/redbo/scrabble/master/dictionary.txt').then(response => response.text()).then(responseText => {
      var split = responseText.split("\n");
      resolve(split);
    });
  });
}

function randomCharacter() {
  var alpha = "abcdefghijklmnopqrstuvwxyz";
  return alpha[Math.floor(Math.random() * alpha.length)];
}

function randomWord(data, len) {
  var result = "";

  do {
    result = data[Math.floor(Math.random() * data.length)];
  } while (result.length != len);

  return result;
}

function startsWithArrayLen(data, c, len) {
  var result = data.filter((val, ix, arr) => {
    return val[0] == c && val.length == len;
  });
  return result;
}

function startsWithArray(data, c) {
  var result = data.filter((val, ix, arr) => {
    return val[0] == c;
  });
  return result;
}

function endsWithArray(data, c) {
  var result = data.filter((val, ix, arr) => {
    return val[val.length - 1] == c;
  });
  return result;
}

function startsWithSubstring(data, str, len) {
  var startsWith = startsWithArray(data, str[0]);
  var sub = startsWith.filter((val, ix, arr) => {
    var substring = val.substring(0, str.length);
    return substring === str && val.length == len;
  });
  return sub.length != 0;
}

function startsWith(data, c, len) {
  var sub = startsWithArray(data, c);
  var result = sub[Math.floor(Math.random() * sub.length)];

  while (result.length != len) {
    result = sub[Math.floor(Math.random() * sub.length)];
  }

  return result;
}

function endsWith(data, c, len) {
  var sub = endsWithArray(data, c);
  let result = sub[Math.floor(Math.random() * sub.length)];

  while (result.length != len) {
    result = sub[Math.floor(Math.random() * sub.length)];
  }

  return result;
}

function startsAndEndsWith(data, s, e, len) {
  var startsWith = startsWithArray(data, s);
  var sub = startsWith.filter((val, ix, arr) => {
    return val[val.length - 1] == e && val.length == len;
  });
  if (sub.length == 0) return null;
  var result = "";

  while (result.length != len) {
    result = sub[Math.floor(Math.random() * sub.length)];
  }

  return result;
}

},{}]},{},[2]);
