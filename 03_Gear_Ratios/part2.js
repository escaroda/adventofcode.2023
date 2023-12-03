const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const lines = data.trimEnd().split("\n");
const regex = /[0-9]+/g;
const ratios = [];
const digits = [];

function hasIntersection(j, l, r) {
  return j > l - 2 && j < r + 2;
}

function getAdjacentNumbers(i, j) {
  const nums = [];

  for (k = i - 1; k < i + 2; k++) {           // check three lines - above, current and below
    if (!digits[k]) {
      continue;
    }

    for (const [num, l, r] of digits[k]) {
      if (hasIntersection(j, l, r)) {
        nums.push(num);
      }
    }
  }

  return nums;
}

// Find all digits with its left and right indexes
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  digits[i] = [];
  let match;
  
  while ((match = regex.exec(line)) != null) {
    digits[i].push([
      Number(match[0]),                       // part number
      match.index,                            // its farmost left index
      match.index + match[0].length - 1,      // its farmost right index
    ]);
  }
}

// Find gears
for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (lines[i][j] !== "*") {
      continue;
    }

    const nums = getAdjacentNumbers(i, j);
    if (nums.length == 2) {                   // "adjacent to exactly two part numbers"
      ratios.push(nums[0] * nums[1]);
    }
  }
}

const sum = ratios.reduce((a, b) => a + b, 0);

console.log(`The sum of all of the gear ratios is ${sum}`);
