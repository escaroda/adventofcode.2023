const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const [lr, network] = data.trimEnd().split("\n\n");

const moves = lr.split("").map(move => Number(move === "R"));
const nodes = network.split("\n").reduce((acc, cur) => {
  const [node, instruction] = cur.split(" = (");
  const [left, right] = instruction.split(/[^A-Z]+/);
  return acc.set(node, [left, right]);
}, new Map());

const target = "ZZZ";
let current = "AAA";
let step = 0;

while (current !== target) {
  current = nodes.get(current)[moves[step % moves.length]];
  step += 1;
}

console.log(`${step} steps are required to reach ${target}`);
