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

function getMove(pos, [i, j]) {
  const pipe = maze[pos[0]][pos[1]];
  
  switch(pipe) {
    case "|":
      return [i, 0];
    case "-":
      return [0, j];
    case "L":
      return i ? [0, 1] : [-1, 0];
    case "J":
      return i ? [0, -1] : [-1, 0];
    case "7":
      return i ? [0, -1] : [1, 0];
    case "F":
      return i ? [0, 1] : [1, 0];
  }
}

const [i, j] = getStartingPosition(maze);
const moves = [];

if (["|", "F", "7"].includes(maze[i - 1]?.[j])) {   // up
  moves.push([-1, 0]);
}

if (["J", "7", "-"].includes(maze[i][j + 1])) {     // right
  moves.push([0, 1]);
}

if (["J", "|", "L"].includes(maze[i + 1]?.[j])) {   // down
  moves.push([1, 0]);
}

if (["F", "-", "L"].includes(maze[i][j - 1])) {     // left
  moves.push([0, -1]);
}

function applyMove(pos, [i, j]) {
  pos[0] += i;
  pos[1] += j;
}

const combinations = moves.flatMap((v, i) => moves.slice(i + 1).map(w => [v, w]));
let steps;

nextCombination:
for (let [move1, move2] of combinations) {
  const pos1 = [i, j];
  const pos2 = [i, j];
  steps = 0;

  while (true) {
    steps += 1;
  
    applyMove(pos1, move1);
    applyMove(pos2, move2);

    if (pos1[0] === pos2[0] && pos1[1] === pos2[1]) {
      break nextCombination;                        // assume there is only one valid closed loop that goes through starting point
    }

    move1 = getMove(pos1, move1);
    move2 = getMove(pos2, move2);

    if (!move1 || !move2) {                         // this is dead end, so closed loop is not possible for current combination of moves
      continue nextCombination;
    }
  }
}

console.log(`It takes ${steps} steps to get from the starting position to the point farthest from the starting position`);
