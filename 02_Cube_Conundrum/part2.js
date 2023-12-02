const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const lines = data.trimEnd().split("\n");
const games = lines.map(line => {
  const data = line.slice(5).split(": ");
  const gameId = Number(data[0]);
  const sets = data[1].split("; ").map(sets => sets.split(", ").map(set => set.split(" ")));
  return [gameId, sets];
});

const powers = [];

for (const [, sets] of games) {
  const requiredCubes = {
    red: 1,
    green: 1,
    blue: 1,
  };

  for (const set of sets) {
    for (const [cubes, color] of set) {
      requiredCubes[color] = Math.max(requiredCubes[color], Number(cubes));
    }
  }

  const power = Object.values(requiredCubes).reduce((a, b) => a * b, 1);
  powers.push(power);
}

const sum = powers.reduce((a, b) => a + b, 0);

console.log(`The sum of the power of sets is ${sum}`);
