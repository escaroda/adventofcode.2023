const fs = require("node:fs");
const path = require("path");

const loadedCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const lines = data.trimEnd().split("\n");
const games = lines.map(line => {
  const data = line.slice(5).split(": ");
  const gameId = Number(data[0]);
  const sets = data[1].split("; ").map(sets => sets.split(", ").map(set => set.split(" ")));
  return [gameId, sets];
});

const ids = [];

nextGame:
for (const [gameId, sets] of games) {
  for (const set of sets) {
    for (const [cubes, color] of set) {
      if (Number(cubes) > loadedCubes[color]) {
        continue nextGame;
      }
    }
  }
  
  ids.push(gameId);
}

const sum = ids.reduce((a, b) => a + b, 0);

console.log(`The sum of the IDs of possible games is ${sum}`);
