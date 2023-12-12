const fs = require("node:fs");
const path = require("path");

const DAMAGED_SPRING = "#";
const OPERATIONAL_SPRING = ".";

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const lines = data.trimEnd().split("\n").map(line => {
  const [springs, groups] = line.split(" ");
  return [[...springs], groups.split(",").map(Number)];
});

function getCombinations(num, length) {
  if (length === 0) {
    return [];
  }

  if (length === 1) {
    return [[num]];
  }

  const result = [];

  for (let i = 0; i <= num; i++) {
    const subCombinations = getCombinations(num - i, length - 1);
    for (let j = 0; j < subCombinations.length; j++) {
      result.push([i, ...subCombinations[j]]);
    }
  }

  return result;
}

function zerosOnEdgesOnly(arr) {
  for (let i = 1; i < arr.length - 1; i++) {
    if (!arr[i]) {
      return false;
    }
  }

  return true;
}

function isFit(springs, arrangement) {
  for (let i = 0; i < springs.length; i++) {
    if (
      springs[i] === DAMAGED_SPRING && arrangement[i] !== DAMAGED_SPRING ||
      springs[i] === OPERATIONAL_SPRING && arrangement[i] !== OPERATIONAL_SPRING
    ) {
      return false;
    }
  }

  return true;
}

function getArrangements(springs, groups) {
  const arrangements = [];
  const damaged = groups.reduce((a, b) => a + b);
  const operational = springs.length - damaged;

  const combinations = getCombinations(operational, groups.length + 1).filter(zerosOnEdgesOnly);

  for (const combination of combinations) {
    let arrangement = '';

    for (let j = 0; j < combination.length; j++) {
      arrangement += OPERATIONAL_SPRING.repeat(combination[j]);

      if (groups[j]) {
        arrangement += DAMAGED_SPRING.repeat(groups[j])
      }
    }

    if (isFit(springs, arrangement)) {
      arrangements.push(arrangement);
    }

  }

  return arrangements;
}

let sum = 0;

for (const line of lines) {
  sum += getArrangements(...line).length;
}

console.log(`The sum of counts is ${sum}`);
