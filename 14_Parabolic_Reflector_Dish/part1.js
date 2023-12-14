const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const lines = data.trimEnd().split("\n").map(line => line.split(""));

const ROUNDED_ROCK = "O";
const EMPTY_SPACE = ".";
const isRounded = char => char === ROUNDED_ROCK;

for (let j = 0; j < lines[0].length; j++) {
  for (let i = 0; i < lines.length; i++) {
    if (!isRounded(lines[i][j])) {
      continue;
    }

    let ii = i;
    while (lines[ii - 1]?.[j] === EMPTY_SPACE) {
      ii -= 1;
    }

    lines[i][j] = EMPTY_SPACE;
    lines[ii][j] = ROUNDED_ROCK;
  }
}

const total = lines.reduce((a, b, i) => a + b.filter(isRounded).length * (lines.length - i), 0);

console.log(`The total load on the north support beams is ${total}`);
