const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const image = data.trimEnd().split("\n").map(line => [...line]);

const GALAXY_SIGN = "#";
const EMPTY_MULTIPLIER = 1000000;

// Get indices of all empty rows and columns
const rows = Array(image.length).fill(1);
const columns = Array(image[0].length).fill(1);

for (let i = 0; i < image.length; i++) {
  for (let j = 0; j < image[0].length; j++) {
    if (image[i][j] === GALAXY_SIGN) {
      rows[i] = 0;
      columns[j] = 0;
    }
  }
}

const getEmpty = (arr) => arr.reduce((acc, cur, i) => cur ? (acc.push(i), acc) : acc, []);
const emptyRows = getEmpty(rows);
const emptyColumns = getEmpty(columns);

// Get coordinates of all galaxies 
const galaxies = [];

for (let i = 0; i < image.length; i++) {
  for (let j = 0; j < image[0].length; j++) {
    if (image[i][j] === GALAXY_SIGN) {
      galaxies.push([i, j]);
    }
  }
}

// Get all pairs
const pairs = galaxies.flatMap((v, i) => galaxies.slice(i + 1).map(w => [v, w])); // [[[i, j][i, j]]]

function isBetween(num, range) {
  return num > range[0] && num < range[1];
}

function getExpansion(empties, range) {
  range.sort((a, b) => a - b);
  return empties.reduce((acc, num) => acc += isBetween(num, range) ? EMPTY_MULTIPLIER - 1 : 0, 0);
}

let sum = 0;

for (const [[i1, j1], [i2, j2]] of pairs) {
  sum += Math.abs(i2 - i1) + Math.abs(j2 - j1);
  sum += getExpansion(emptyRows, [i1, i2]);
  sum += getExpansion(emptyColumns, [j1, j2]);
}

console.log(`The sum of lengths is ${sum}`);
