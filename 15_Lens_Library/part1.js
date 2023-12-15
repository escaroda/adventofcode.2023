const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const steps = data.trimEnd().split(",");

const MULTIPLIER = 17;
const DIVIDER = 256;

function getHash(str) {
  let current = 0;

  for (let i = 0; i < str.length; i++) {
    current += str.charCodeAt(i);
    current *= MULTIPLIER;
    current %= DIVIDER;
  }

  return current;
}

const sum = steps.reduce((a, b) => a + getHash(b), 0);

console.log(`The sum is ${sum}`);
