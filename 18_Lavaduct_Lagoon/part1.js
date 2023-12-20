/**
 * This is a straight forward solution that reconstruct the lagoon in Two-Dimensional Array;
 * Second part would require mathematical approach because of much bigger distances;
 */

const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const plan = data.trimEnd().split("\n").map(line => {
  const [direction, cubes] = line.split(" ");
  return [direction, Number(cubes)];
});

const opposite = {
  U: "D",
  R: "L",
  D: "U",
  L: "R",
};

const directions = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

const max = {
  U: 0,
  R: 0,
  D: 0,
  L: 0,
};
const cur = { ...max };

function saveMax(direction) {
  max[direction] = Math.max(max[direction], cur[direction]);
}

for (const [direction, cubes] of plan) {
  cur[direction] += cubes;
  cur[opposite[direction]] -= cubes;
  saveMax(direction);
}

const width = max.R + max.L + 1;
const height = max.U + max.D + 1;
const ground = Array.from({length: height}, () => Array(width).fill(0));

let i = max.U;
let j = max.L;

for (let [direction, cubes] of plan) {
  const [ii, jj] = directions[direction];

  while(cubes) {
    ground[i][j] = 1;
    i += ii;
    j += jj;
    cubes -= 1;
  }
}

// Now that we have the edge of the lagoon we need to find a point inside to "flood fill" the area
let k = 0;
let l = 0;

while (k < ground.length) {
  index = ground[k].join("").indexOf("010");

  if (index > -1) {
    l = index + 2;
    break;
  }

  k++;
}

function floodFill(arr, i, j, value) {
  const stack = [[i, j]];

  while (stack.length) {
    const [i, j] = stack.pop();

    if (
      i < 0 ||
      j < 0 ||
      i > arr.length - 1 ||
      j > arr[i].length - 1 ||
      arr[i][j] === value
    ) {
      continue;
    }

    arr[i][j] = value;
    stack.push([i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]);
  }
}

floodFill(ground, k, l, 1);

const total = ground.reduce((a, b) => a + b.reduce((a, b) => a + b), 0);

console.log(`It could hold ${total} cubic meters of lava`);
