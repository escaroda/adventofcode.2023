const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const lines = data.trimEnd().split("\n").map(line => {
  const [springs, groups] = line.split(" ");
  return [springs, groups.split(",").map(Number)];
});

const cache = new Map();

// HyperNeutrino https://youtu.be/g3Ms5e7Jdqo
function count(springs, groups) {
  if (!springs) {
    return groups.length ? 0 : 1;
  }

  if (!groups.length) {
    return springs.includes("#") ? 0 : 1;
  }

  const key = springs + "-" + groups;

  if (cache.has(key)) {
    return cache.get(key);
  }

  let result = 0;

  if (".?".includes(springs[0])) {
    result += count(springs.slice(1), [...groups]);
  }

  const g = groups[0]; // the size of a contiguous group of damaged springs

  if (
    "#?".includes(springs[0]) &&
    g <= springs.length &&
    !springs.slice(0, g).includes(".") &&
    (g === springs.length || springs[g] !== "#")
  ) {
    result += count(springs.slice(g + 1), groups.slice(1));
  }

  cache.set(key, result);

  return result;
}

const sum = lines.reduce((acc, cur) => acc + count(...cur), 0);

console.log(`The sum of counts is ${sum}`);
