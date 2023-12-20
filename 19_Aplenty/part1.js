const fs = require("node:fs");
const path = require("path");

const FIRST_WORKFLOW = "in";

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const [block1, block2] = data.trimEnd().split("\n\n").map(block => block.split("\n"));

const workflows = block1.reduce((acc, cur) => {
  const [name, rules] = cur.slice(0, -1).split("{");
  acc[name] = rules.split(",");
  return acc;
}, {});

const parts = block2.map(part => part.slice(1, -1).split(",").reduce((acc, cur) => {
  const [category, rate] = cur.split("=");
  acc[category] = Number(rate);
  return acc;
}, {}));

const sorted = {A: [], R: []};

const condition = {
  "<": (l, r) => l < r,
  ">": (l, r) => l > r,
};

for (const part of parts) {
  let dest = FIRST_WORKFLOW;
  let rules;

  nextWorkflow:
  while (rules = workflows[dest]) {
    for (const rule of rules.slice(0, -1)) {
      const [category, rate, destionation] = rule.split(/[^\w]+/);

      if (condition[rule[1]](part[category], Number(rate))) {
        dest = destionation;
        continue nextWorkflow;
      }
    }

    dest = rules.at(-1);
  }

  sorted[dest].push(part);
}

const sum = sorted.A.reduce((acc, { x, m, a, s }) => acc += x + m + a + s, 0);

console.log(`All of the rating numbers for all of the accepted parts is ${sum}`);
