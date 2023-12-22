const fs = require("node:fs");
const path = require("path");

const FIRST_WORKFLOW = "in";
const MIN_RATING = 1;
const MAX_RATING = 4000;

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const blocks = data.trimEnd().split("\n\n").map(block => block.split("\n"));
const workflows = blocks[0].reduce((acc, cur) => {
  let [name, rules] = cur.slice(0, -1).split("{");
  rules = rules.split(",");

  for (let i = 0; i < rules.length - 1; i++) {
    rules[i] = [...rules[i].split(/[^\w]+/), rules[i][1]];
  }

  acc[name] = rules;
  return acc;
}, {});

const combinations = {A: 0, R: 0};

const parts = {
  x: [MIN_RATING, MAX_RATING],
  m: [MIN_RATING, MAX_RATING],
  a: [MIN_RATING, MAX_RATING],
  s: [MIN_RATING, MAX_RATING],
};

function getPartsCombinations(parts) {
  return Object.entries(parts).reduce((acc, [_, [min, max]]) => acc *= max - min + 1, 1);
}

const condition = {
  "<": (parts, copy, cat, rate) => {
    copy[cat][1] = Math.min(rate - 1, copy[cat][1]);
    parts[cat][0] = Math.max(rate, parts[cat][0]);
  },
  ">": (parts, copy, cat, rate) => {
    copy[cat][0] = Math.max(rate + 1, copy[cat][0]);
    parts[cat][1] = Math.min(rate, parts[cat][1]);
  },
};

const stack = [[parts, FIRST_WORKFLOW]];

while (stack.length) {
  let [parts, dest] = stack.pop();;
  let rules;

  nextWorkflow:
  while (rules = workflows[dest]) {
    for (const rule of rules.slice(0, -1)) {
      const [cat, rate, destionation, c] = rule;
      const copy = structuredClone(parts);

      condition[c](parts, copy, cat, +rate);
      stack.push([copy, destionation]);
    }
  
    dest = rules.at(-1);
  }

  combinations[dest] += getPartsCombinations(parts);
}

console.log(`${combinations.A} distinct combinations of ratings will be accepted by the Elves' workflows`);
