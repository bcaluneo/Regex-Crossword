export function loadData() {
    return new Promise(resolve => {
        fetch('https://raw.githubusercontent.com/redbo/scrabble/master/dictionary.txt')
            .then(response => response.text())
            .then(responseText => {
            var split = responseText.split("\n");
            resolve(split);
        });
    });
}
export function randomCharacter() {
    var alpha = "abcdefghijklmnopqrstuvwxyz";
    return alpha[Math.floor(Math.random() * alpha.length)];
}
export function randomWord(data, len) {
    var result = "";
    do {
        result = data[Math.floor(Math.random() * data.length)];
    } while (result.length != len);
    return result;
}
export function startsWithArrayLen(data, c, len) {
    var result = data.filter((val, ix, arr) => {
        return val[0] == c && val.length == len;
    });
    return result;
}
export function startsWithArray(data, c) {
    var result = data.filter((val, ix, arr) => {
        return val[0] == c;
    });
    return result;
}
export function endsWithArray(data, c) {
    var result = data.filter((val, ix, arr) => {
        return val[val.length - 1] == c;
    });
    return result;
}
export function startsWithSubstring(data, str, len) {
    var startsWith = startsWithArray(data, str[0]);
    var sub = startsWith.filter((val, ix, arr) => {
        var substring = val.substring(0, str.length);
        return substring === str && val.length == len;
    });
    return sub.length != 0;
}
export function startsWith(data, c, len) {
    var sub = startsWithArray(data, c);
    var result = sub[Math.floor(Math.random() * sub.length)];
    while (result.length != len) {
        result = sub[Math.floor(Math.random() * sub.length)];
    }
    return result;
}
export function endsWith(data, c, len) {
    var sub = endsWithArray(data, c);
    let result = sub[Math.floor(Math.random() * sub.length)];
    while (result.length != len) {
        result = sub[Math.floor(Math.random() * sub.length)];
    }
    return result;
}
export function startsAndEndsWith(data, s, e, len) {
    var startsWith = startsWithArray(data, s);
    var sub = startsWith.filter((val, ix, arr) => {
        return val[val.length - 1] == e && val.length == len;
    });
    if (sub.length == 0)
        return null;
    var result = "";
    while (result.length != len) {
        result = sub[Math.floor(Math.random() * sub.length)];
    }
    return result;
}
