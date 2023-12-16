const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const grid = data.trimEnd().split("\n");

const directions = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
};

const reflections = {
  "|": {
    "left": ["up", "down"],
    "right": ["up", "down"],
    "up": ["up"],
    "down": ["down"],
  },
  "-": {
    "up": ["left", "right"],
    "down": ["left", "right"],
    "left": ["left"],
    "right": ["right"],
  },
  "/": {
    "up": ["right"],
    "right": ["up"],
    "down": ["left"],
    "left": ["down"],
  },
  "\\": {
    "up": ["left"],
    "right": ["down"],
    "down": ["right"],
    "left": ["up"],
  }
};

let energized = 0;
const choices = [];

for (let k = 0; k < grid.length; k++) {
  choices.push(
    [k, 0, "right"],
    [0, k, "down"],
    [k, grid.length - 1, "left"],
    [grid.length - 1, k, "up"],
  );
}

for (const choice of choices) {
  const energy = grid.map(({ length }) => Array.from({ length }, () => ({up: 0, right: 0, down: 0, left: 0})));
  const stack = [choice];
  
  nextStack:
  while (stack.length) {
    let [i, j, d] = stack.pop();
    const [ii, jj] = directions[d];
  
    if (!grid[i]?.[j] || energy[i][j][d]) {
      continue;
    }
  
    while (grid[i][j] === ".") {
      energy[i][j][d] = 1;
      i += ii;
      j += jj;
  
      if (!grid[i]?.[j]) {
        continue nextStack;
      }
    }
  
    energy[i][j][d] = 1;
  
    stack.push(...reflections[grid[i][j]][d].map(d => [i + directions[d][0], j + directions[d][1], d]));
  }
  
  energized = Math.max(
    energy.reduce((a, b) => a + b.reduce((a, { up, right, down, left }) => a + Number(up || right || down || left), 0), 0),
    energized,
  );
}

console.log(`There are ${energized} energized tiles in configuration that energizes the largest number of tiles`);
