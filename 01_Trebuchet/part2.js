const fs = require('node:fs');

const numericMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const reverse = (str) => [...str].reverse().join("");
const regex = new RegExp(Object.keys(numericMap).join("|"));
const regexReversed = new RegExp(Object.keys(numericMap).map(reverse).join("|"));

const appendDigits = (line) => {
  line = line.replace(regex, (match) => numericMap[match] + match);
  line = reverse(line).replace(regexReversed, (match) => numericMap[reverse(match)] + match);
  return reverse(line);
};

const data = fs.readFileSync("input", "utf-8");
const lines = data.trimEnd().split("\n").map(appendDigits);
const values = [];

for (const line of lines) {
  const digits = line.match(/[1-9]/g);
  values.push(parseInt(digits.at(0) + digits.at(-1), 10));
}

const sum = values.reduce((a, b) => a + b, 0);

console.log(`The sum of all of the calibration values is ${sum}`);
