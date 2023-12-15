const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const mirrors = data.trimEnd().split("\n\n").map(mirror => mirror.split("\n"));

const HORIZONTAL_MULTIPLIER = 100;

function isMatchedColumns(mirror, col1, col2) {
  for (let i = 0; i < mirror.length; i++) {
    if (mirror[i][col1] !== mirror[i][col2]) {
      return false;
    }
  }

  return true;
}

let total = 0;

nextMirror:
for (const mirror of mirrors) {

  horizontal:
  for (let i = 0; i < mirror.length - 1; i++) {
    let m = i;
    let n = i + 1;

    while (mirror[m] && mirror[n]) {
      if (mirror[m--] !== mirror[n++]) {
        continue horizontal;
      }
    }

    total += (i + 1) * HORIZONTAL_MULTIPLIER;
    continue nextMirror;
  }

  vertical:
  for (let j = 0; j < mirror[0].length - 1; j++) {
    let m = j;
    let n = j + 1;

    while (mirror[0][m] && mirror[0][n]) {
      if (!isMatchedColumns(mirror, m--, n++)) {
        continue vertical;
      }
    }

    total += j + 1;
  }
}

console.log(`After summarizing all notes we get ${total}`);
