const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const lines = data.trimEnd().split("\n");
const regex = /[0-9]+/g;
const partNumbers = [];

function isSymbol(char) {
  return char && char !== ".";
}

function hasSymbolRow(i, j, length) {     // i - row, j - column
  const line = lines[i];

  if (line) {
    for (let k = j - 1; k < j + length + 1; k++) {
      if (isSymbol(line[k])) {
        return true;
      }
    }
  }

  return false;
}

function hasAdjacentSymbol(i, j, length) {
  if (
    hasSymbolRow(i - 1, j, length) ||      // above
    hasSymbolRow(i + 1, j, length) ||      // below
    isSymbol(lines[i][j - 1]) ||           // left side
    isSymbol(lines[i][j + length])         // right side
  ) {
    return true;
  }

  return false;
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let match;

  while ((match = regex.exec(line)) != null) {
    if (hasAdjacentSymbol(i, match.index, match[0].length)) {
      partNumbers.push(Number(match[0]));
    }
  }
}

const sum = partNumbers.reduce((a, b) => a + b, 0);

console.log(`The sum of all of the part numbers in the engine schematic is ${sum}`);
