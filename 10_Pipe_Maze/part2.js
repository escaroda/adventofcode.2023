const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const maze = data.trimEnd().split("\n").map(line => [...line]);

const STARTING_POSITION = "S";

function getStartingPosition(maze) {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === STARTING_POSITION) {
        return [i, j];
      }
    }
  }

  throw new Error("Can't find starting position");
}

const [i, j] = getStartingPosition(maze);

const pipes = {
  "|": ["up", "down"],
  "-": ["left", "right"],
  "L": ["up", "right"],
  "J": ["up", "left"],
  "7": ["left", "down"],
  "F": ["right", "down"],
};

const directions = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
};

const validConnection = {
  up: ["|", "F", "7"],
  right: ["J", "7", "-"],
  down: ["J", "|", "L"],
  left: ["F", "-", "L"],
};

function isValidDirections(connections) {
  return connections.every(c => validConnection[c].includes(maze[i + directions[c][0]][j + directions[c][1]]));
}

const combinations = [];

for (const [pipe, connections] of Object.entries(pipes)) {
  if (isValidDirections(connections)) {
    combinations.push([pipe, ...connections.map(c => directions[c])]);
  }
}

function getEmptySurface() {
  const surface = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(0));
  surface[i][j] = 1;
  return surface;
}

function applyMove(pos, [i, j]) {
  pos[0] += i;
  pos[1] += j;
  return pos;
}

function markSurface([i, j]) {
  surface[i][j] = 1;
}

function getMove([ii, jj], [i, j]) {
  const { up, right, down, left } = directions;
  const pipe = maze[ii][jj];
  
  switch(pipe) {
    case "|":
      return i < 1 ? up : down;
    case "-":
      return j < 1 ? left : right;
    case "L":
      return i ? right : up;
    case "J":
      return i ? left : up;
    case "7":
      return i ? left : down;
    case "F":
      return i ? right : down;
  }
}

let surface;

nextCombination:
for (let [pipe, move1, move2] of combinations) {
  maze[i][j] = pipe;
  const pos1 = [i, j];
  const pos2 = [i, j];

  surface = getEmptySurface();

  while (true) {
    markSurface(applyMove(pos1, move1));
    markSurface(applyMove(pos2, move2));

    if (pos1[0] === pos2[0] && pos1[1] === pos2[1]) {
      break nextCombination;                        // assume there is only one valid closed loop that goes through starting point
    }

    move1 = getMove(pos1, move1);
    move2 = getMove(pos2, move2);

    if (!move1 || !move2) {
      continue nextCombination;
    }
  }
}

let tiles = 0;

for (let i = 0; i < surface.length; i++) {
  let isInside = false;
  const opening = [];

  for (let j = 0; j < surface[0].length; j++) {
    if (surface[i][j]) {
      const pipe = maze[i][j];

      if (pipe === "|") {
        isInside = !isInside;
      } else if (pipe === "F" || pipe === "L") {
        opening.push(pipe);
      } else if (pipe === "J") {
        if (opening.pop() === "F") {
          isInside = !isInside;
        }
      } else if (pipe === "7") {
        if (opening.pop() === "L") {
          isInside = !isInside;
        }
      }
    } else if (isInside) {
      tiles += 1;
    }
  }
}

console.log(`There are ${tiles} tiles enclosed by the loop`);
