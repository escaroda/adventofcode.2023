const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const lines = data.trimEnd().split("\n");
const whitespace = /[ ]+/;
const cards = lines.map(line => [1, ...line.slice(10).split("|").map(list => list.trim().split(whitespace).map(Number))])

let total = 0;

for (let i = 0; i < cards.length; i++) {
  const [instances, winners, numbers] = cards[i];
  total += instances;
  let copies = 0;

  for (const winner of winners) {
    if (numbers.includes(winner)) {
      copies += 1;
    }
  }

  if (copies) {
    for (let j = i + 1; j < i + 1 + copies; j++) {
      cards[j][0] += instances;
    }
  }
}

console.log(`There are ${total} scratchcards total`);
