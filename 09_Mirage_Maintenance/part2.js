const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const sequences = data.trimEnd().split("\n").map(line => line.split(" ").map(Number));

let sum = 0;

for (const sequence of sequences) {
  const diffs = [sequence];
  let value = 0;

  do {
    const cur = diffs.at(-1);
    const diff = [];

    for (let i = 0; i < cur.length - 1; i++) {
      diff.push(cur[i + 1] - cur[i]);
    }

    diffs.push(diff);
  } while (new Set(diffs.at(-1)).size !== 1);

  do {
    value = diffs.pop()[0] - value;
  } while (diffs.length);

  sum += value;
}

console.log(`The sum of all extrapolated values is ${sum}`);
