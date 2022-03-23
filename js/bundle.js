(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generate = generate;

var utils = _interopRequireWildcard(require("./util.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
function generate(data) {
  var result = [];
  var seed = utils.randomWord(data, 4);
  result.push(seed);
  var left = utils.startsWith(data, seed[0], seed.length);
  var bottom = utils.startsWith(data, left[seed.length - 1], seed.length);
  var right = utils.startsAndEndsWith(data, seed[seed.length - 1], bottom[seed.length - 1], seed.length);
  var leftDiag = utils.startsAndEndsWith(data, seed[0], bottom[seed.length - 1], seed.length);
  var rightDiag = utils.startsAndEndsWith(data, seed[seed.length - 1], bottom[0], seed.length);
  if (right == null || leftDiag == null || rightDiag == null || bottom == null) return [];
  var secondWord = left[1].concat(leftDiag[1]).concat(rightDiag[1]).concat(right[1]);
  var thirdWord = left[2].concat(rightDiag[2]).concat(leftDiag[2]).concat(right[2]);
  result.push(secondWord);
  result.push(thirdWord);
  result.push(bottom);
  return result;
}

},{"./util.js":3}],2:[function(require,module,exports){
"use strict";

var _board = require("./board.js");

var utils = _interopRequireWildcard(require("./util.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function main() {
  var data = await utils.loadData(); // generate a board
  // generate regex for all the cols and rows
  // display the rules to the user
  // validate at the end if the boards are equal

  var board = [];

  while (board.length == 0) {
    board = (0, _board.generate)(data);
  }

  console.table(board);
  document.getElementById("test").textContent = "pls work :D"; // board.forEach(string => {
  //   document.getElementById("test").textContent += string;
  // });
}

main();

},{"./board.js":1,"./util.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endsWith = endsWith;
exports.endsWithArray = endsWithArray;
exports.loadData = loadData;
exports.randomWord = randomWord;
exports.startsAndEndsWith = startsAndEndsWith;
exports.startsWith = startsWith;
exports.startsWithArray = startsWithArray;
exports.startsWithArrayLen = startsWithArrayLen;
exports.startsWithSubstring = startsWithSubstring;

const fs = require("fs");

let data = []; // const data:string[] = fs.readFileSync("./doc/scrabble.txt", "utf-8").split("\r\n");

function loadData() {
  return new Promise(resolve => {
    fetch('https://raw.githubusercontent.com/redbo/scrabble/master/dictionary.txt').then(response => response.text()).then(responseText => {
      var split = responseText.split("\n");
      resolve(split);
    });
  });
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

},{"fs":4}],4:[function(require,module,exports){

},{}]},{},[2]);
