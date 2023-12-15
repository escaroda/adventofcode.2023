const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const mirrors = data.trimEnd().split("\n\n").map(mirror => mirror.split("\n"));

const HORIZONTAL_MULTIPLIER = 100;
const MISMATCH_LIMIT = 1;

function getColumnMismatch(mirror, col1, col2) {
  let count = 0;

  for (let i = 0; i < mirror.length; i++) {
    if (mirror[i][col1] !== mirror[i][col2]) {
      count += 1;
    }
  }

  return count;
}

function getRowMismatch(mirror, row1, row2) {
  let count = 0;

  for (let j = 0; j < mirror[0].length; j++) {
    if (mirror[row1][j] !== mirror[row2][j]) {
      count += 1;
    }
  }

  return count;
}

let total = 0;

nextMirror:
for (const mirror of mirrors) {

  horizontal:
  for (let i = 0; i < mirror.length - 1; i++) {
    let m = i;
    let n = i + 1;
    let mismatch = 0;
  
    while (mirror[m] && mirror[n]) {
      if ((mismatch += getRowMismatch(mirror, m--, n++)) > MISMATCH_LIMIT) {
        continue horizontal;
      }
    }

    if (mismatch === MISMATCH_LIMIT) {
      total += (i + 1) * HORIZONTAL_MULTIPLIER;
      continue nextMirror;
    }
  }

  vertical:
  for (let j = 0; j < mirror[0].length - 1; j++) {
    let m = j;
    let n = j + 1;
    let mismatch = 0;

    while (mirror[0][m] && mirror[0][n]) {
      if ((mismatch += getColumnMismatch(mirror, m--, n++)) > MISMATCH_LIMIT) {
        continue vertical;
      }
    }

    if (mismatch === MISMATCH_LIMIT) {
      total += j + 1;
    }
  }
}

console.log(`After summarizing the new reflection line in each pattern we get ${total}`);
