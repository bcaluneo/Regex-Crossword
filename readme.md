# Regex Crossword Generator

First and foremost this project was inspired by [Regex Crossword](https://regexcrossword.com)
and they deserve the credit. This project seeks to generate random crosswords and the regex rules to solve them.
Right now it only generates 4x4 grids with the top, left, right, bottom, and diagonals
being guaranteed to be words. The wordlist is from [this repo](https://github.com/redbo/scrabble)
which is a few years old by now but it works fine for this project.

This project is my first Typescript project and as such probably has more quirks than I would like but that is the nature of learning a new technology.

You can access a version of the project hosted through GitHub pages [here](https://bcaluneo.github.io/Regex-Crossword/).

## Building

This project is built using NodeJS with the Typescript, browserify, express, and esmify modules. First clone this repo with:

`git clone git@github.com:bcaluneo/Regex-Crossword`

Then install the modules and types:
```
npm install typescript --save-dev
npm install --save-dev @types/node
npm install browserify
npm install express
npm install esmify
```

The provided makefile can be used to build the project. It assumes the outputted `.js` files are placed in the public directory.
