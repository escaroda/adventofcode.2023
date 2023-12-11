const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const image = data.trimEnd().split("\n").map(line => [...line]);

const GALAXY_SIGN = "#";
const EMPTY_SIGN = ".";

// Expand rows
for (let i = image.length - 1; i > -1; i--) {
  if (!image[i].includes(GALAXY_SIGN)) {
    image.splice(i, 0, [...image[i]]);
  }
}

// Expand columns
for (let j = image[0].length - 1; j > -1; j--) {
  if (image.some(line => line[j] === GALAXY_SIGN)) {
    continue;
  }

  image.forEach(line => line.splice(j, 0, EMPTY_SIGN));
}

// Get coordinates of all galaxies 
const galaxies = [];

for (let i = 0; i < image.length; i++) {
  for (let j = 0; j < image[0].length; j++) {
    if (image[i][j] === GALAXY_SIGN) {
      galaxies.push([i, j]);
    }
  }
}

// Get all pairs for lengths calculations
const pairs = galaxies.flatMap((v, i) => galaxies.slice(i + 1).map(w => [v, w])); // [[[i, j][i, j]]]

// Get sum of Manhattan distances between each pairs
let sum = pairs.reduce((sum, [[i1, j1], [i2, j2]]) => sum += Math.abs(i2 - i1) + Math.abs(j2 - j1), 0);

console.log(`The sum of lengths is ${sum}`);
