const fs = require("node:fs");
const path = require("path");

// HyperNeutrino https://www.youtube.com/watch?v=bGWK76_e-LM
const points = [[0, 0]];
const numToDirection = ["R", "D", "L", "U"];
const directions = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

let b = 0;
fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8").trimEnd().split("\n").forEach(line => {
  const hex = line.split(" ").at(-1);
  const direction = numToDirection[hex.at(-2)];
  const cubes = parseInt(hex.slice(2, 7), 16);

  const [i, j] = points.at(-1);
  const [ii, jj] = directions[direction];

  b += cubes;

  points.push([i + ii * cubes, j + jj * cubes]);
});

const A = Math.abs(points.reduce((acc, cur, i) => {
  return acc + cur[0] * (points.at(i - 1)[1] - points.at((i + 1) % points.length)[1]);
}, 0)) / 2;

const i = A - Math.floor(b / 2) + 1;
const total = i + b;

console.log(`It could hold ${total} cubic meters of lava`);
 