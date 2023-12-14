const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const lines = data.trimEnd().split("\n").map(line => line.split(""));

const ROUNDED_ROCK = "O";
const EMPTY_SPACE = ".";
const CYCLES_LIMIT = 1000000000;

const isRounded = char => char === ROUNDED_ROCK;

function move(i, j, ii, jj, lines) {
  lines[i][j] = EMPTY_SPACE;      // from
  lines[ii][jj] = ROUNDED_ROCK;   // to
}

function tiltN(lines) {
  for (let j = 0; j < lines[0].length; j++) {
    for (let i = 0; i < lines.length; i++) {
      if (!isRounded(lines[i][j])) {
        continue;
      }
  
      let ii = i;
      while (lines[ii - 1]?.[j] === EMPTY_SPACE) {
        ii -= 1;
      }

      move(i, j, ii, j, lines);
    }
  }
}

function tiltW(lines) {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      if (!isRounded(lines[i][j])) {
        continue;
      }

      let jj = j;
      while (lines[i][jj - 1] === EMPTY_SPACE) {
        jj -= 1;
      }

      move(i, j, i, jj, lines);
    }
  }
}

function tiltS(lines) {
  for (let j = 0; j < lines[0].length; j++) {
    for (let i = lines.length - 1; i > -1 ; i--) {
      if (!isRounded(lines[i][j])) {
        continue;
      }
  
      let ii = i;
      while (lines[ii + 1]?.[j] === EMPTY_SPACE) {
        ii += 1;
      }

      move(i, j, ii, j, lines);
    }
  }
}

function tiltE(lines) {
  for (let i = 0; i < lines.length; i++) {
    for (let j = lines[0].length - 1; j > -1; j--) {
      if (!isRounded(lines[i][j])) {
        continue;
      }

      let jj = j;
      while (lines[i][jj + 1] === EMPTY_SPACE) {
        jj += 1;
      }

      move(i, j, i, jj, lines);
    }
  }
}

function isCyclical(length, loads) {
  for (let i = loads.length - 1; i > loads.length - 1 - 2 * length; i--) {
    if (loads[i] !== loads[i - length]) {
      return false;
    }
  }

  return true;
}

const getTotalLoad = lines => lines.reduce((a, b, i) => a + b.filter(isRounded).length * (lines.length - i), 0);

const loads = [];
let cycle = 0;
let cycleLength = 1;

do {
  tiltN(lines);
  tiltW(lines);
  tiltS(lines);
  tiltE(lines);

  const load = getTotalLoad(lines);
  const previous = loads.lastIndexOf(load);

  if (previous > -1) {
    cycleLength = cycle - previous;
  }

  loads.push(load)
  cycle += 1;
} while (!isCyclical(cycleLength, loads));

const delta = CYCLES_LIMIT % cycleLength;
const total = loads[loads.length - 1 - delta];

console.log(`The total load on the north support beams after ${CYCLES_LIMIT} cycles is ${total}`);
