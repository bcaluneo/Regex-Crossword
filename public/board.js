import * as utils from "./util.js";
export class Board {
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
        if (this.right == null || this.ldiag == null || this.rdiag == null || this.bottom == null)
            return [];
        var secondWord = this.left[1].concat(this.ldiag[1]).concat(this.rdiag[1]).concat(this.right[1]);
        var thirdWord = this.left[2].concat(this.rdiag[2]).concat(this.ldiag[2]).concat(this.right[2]);
        this.words.push(secondWord);
        this.words.push(thirdWord);
        this.words.push(this.bottom);
        return this.words;
    }
}
;
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
