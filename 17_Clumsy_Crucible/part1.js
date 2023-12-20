const fs = require("node:fs");
const path = require("path");

const { Heap } = require('./heap');

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const map = data.trimEnd().split("\n").map(line => line.split("").map(Number));

const getSideTurns = (i, j) => [-1, 1].map(s => [s * j, s * i]);
const compare = (a, b) => a[4] - b[4];

const seen = new Set();
const pq = new Heap(compare, [[0, 0, 0, 1, 0, 0]]);

const push = (i, j, ii, jj, loss, q = 0) => {
  const next = map[i + ii]?.[j + jj];
  
  if (next) {
    pq.push([i + ii, j + jj, ii, jj, loss + next, q]);
  } 
}

let minLoss;

while (pq.size()) {
  const [i, j, ii, jj, loss, q] = pq.pop();
  const key = `${i}_${j}_${q}_${ii}_${jj}`;

  if (seen.has(key)) {                            // To avoid loops
    continue;
  }

  seen.add(key);

  if (i === map.length - 1 && j === map[0].length - 1) {
    minLoss = loss;
    break;
  }

  if (q < 2) {
    push(i, j, ii, jj, loss, q + 1);
  }

  getSideTurns(ii, jj).forEach(([ii, jj]) => push(i, j, ii, jj, loss));
}

console.log(`The least heat loss is ${minLoss}`);
