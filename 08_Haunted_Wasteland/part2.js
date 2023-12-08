const fs = require("node:fs");
const path = require("path");

const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const [lr, network] = data.trimEnd().split("\n\n");

const moves = lr.split("").map(move => Number(move === "R"));
const nodes = network.split("\n").reduce((acc, cur) => {
  const [node, instruction] = cur.split(" = (");
  const [left, right] = instruction.split(/[^A-Z]+/);
  return acc.set(node, [left, right]);
}, new Map());

const pool = [...nodes.keys()].filter(node => node.at(-1) === "A");
const counts = new Map();
let step = 0;

while (counts.size !== pool.length) {
  for (let i = 0; i < pool.length; i++) {
    pool[i] = nodes.get(pool[i])[moves[step % moves.length]];

    if (pool[i].at(-1) === "Z") {
      counts.set(i, step + 1);
    }
  }

  step += 1;
}

const steps = [...counts.values()].reduce(lcm);

console.log(`It takes ${steps} steps before you're only on nodes that end with Z`);
