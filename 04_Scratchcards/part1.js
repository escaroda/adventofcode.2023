const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const lines = data.trimEnd().split("\n");
const whitespace = /[ ]+/;
const cards = lines.map(line => line.slice(10).split("|").map(list => list.trim().split(whitespace).map(Number)))

let points = 0;

for (const [winners, numbers] of cards) {
  let worth = 0.5;

  for (const winner of winners) {
    if (numbers.includes(winner)) {
      worth *= 2;
    }
  }

  if (worth > 0.5) {
    points += worth;
  }
}

console.log(`The large pile of colorful cards worth ${points} points in total`);
