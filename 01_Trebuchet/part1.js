const fs = require('node:fs');

const data = fs.readFileSync("input", "utf-8");
const lines = data.trimEnd().split("\n");
const values = [];

for (const line of lines) {
  const digits = line.match(/\d/g);
  values.push(parseInt(digits.at(0) + digits.at(-1), 10));
}

const sum = values.reduce((a, b) => a + b, 0);

console.log(`The sum of all of the calibration values is ${sum}`);
