const fs = require("fs");
let data:string[] = [];
// const data:string[] = fs.readFileSync("./doc/scrabble.txt", "utf-8").split("\r\n");

export function loadData() {
  return new Promise(resolve => {
    fetch('https://raw.githubusercontent.com/redbo/scrabble/master/dictionary.txt')
      .then(response => response.text())
      .then(responseText => {
        var split:string[] = responseText.split("\n");
        resolve(split);
      });
  });
}

export function randomWord(data:string[], len:number) {
  var result:string = "";
  do {
    result = data[Math.floor(Math.random() * data.length)];
  } while (result.length != len);

  return result;
}

export function startsWithArrayLen(data:string[], c:string, len:number):string[] {
  var result:string[] = data.filter((val, ix, arr) => {
    return val[0] == c && val.length == len;
  });
  return result;
}

export function startsWithArray(data:string[], c:string):string[] {
  var result:string[] = data.filter((val, ix, arr) => {
    return val[0] == c;
  });
  return result;
}

export function endsWithArray(data:string[], c:string):string[] {
  var result:string[] = data.filter((val, ix, arr) => {
    return val[val.length - 1] == c;
  });

  return result;
}

export function startsWithSubstring(data:string[], str:string, len:number): boolean {
  var startsWith:string[] = startsWithArray(data, str[0]);
  var sub:string[] = startsWith.filter((val, ix, arr) => {
    var substring = val.substring(0, str.length);
    return substring === str && val.length == len;
  });

  return sub.length != 0;
}

export function startsWith(data:string[], c:string, len:number): string {
  var sub:string[] = startsWithArray(data, c);
  var result:string = sub[Math.floor(Math.random() * sub.length)];
  while (result.length != len) {
    result = sub[Math.floor(Math.random() * sub.length)];
  }

  return result;
}

export function endsWith(data:string[], c:string, len:number): string {
  var sub:string[] = endsWithArray(data, c);
  let result:string = sub[Math.floor(Math.random() * sub.length)];
  while (result.length != len) {
    result = sub[Math.floor(Math.random() * sub.length)];
  }

  return result;
}

export function startsAndEndsWith(data:string[], s:string, e:string, len:number): string {
  var startsWith:string[] = startsWithArray(data, s);
  var sub:string[] = startsWith.filter((val, ix, arr) => {
      return val[val.length - 1] == e && val.length == len;
  });

  if (sub.length == 0) return null;

  var result:string = "";
  while (result.length != len) {
    result = sub[Math.floor(Math.random() * sub.length)];
  }

  return result;
}
