const fs = require("node:fs");
const path = require("path");

const FROM = 200000000000000;
const TO = 400000000000000;

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const hailstones = data.trimEnd().split("\n").map(line => line.split(" @ ").map(block => block.split(", ").map(Number)));

function isParallel(vx1, vy1, vx2, vy2) {
  return !(vx2 * vy1 - vx1 * vy2);
}

function getX(px1, py1, vx1, vy1, px2, py2, vx2, vy2) {
  return (px1 * vx2 * vy1 - vx1 * vy2 * px2 + vx1 * vx2 * (py2 - py1)) / (vx2 * vy1 - vx1 * vy2);
}

function getY(x, vy2, px2, vx2, py2) {
  return vy2 * ((x - px2) / vx2) + py2;
}

function isInPast(p, v, xyz) {
  const t = (xyz - p) / v;
  return t < 0;
}

let total = 0;

for (let i = 0; i < hailstones.length - 1; i++) {
  for (let j = i + 1; j < hailstones.length; j++) {
    const [[px1, py1], [vx1, vy1]] = hailstones[i];
    const [[px2, py2], [vx2, vy2]] = hailstones[j];

    if (isParallel(vx1, vy1, vx2, vy2)) {
      continue;
    }

    const x = getX(px1, py1, vx1, vy1, px2, py2, vx2, vy2);
    const y = getY(x, vy2, px2, vx2, py2);

    if (
      x < FROM || x > TO || y < FROM || y > TO ||
      isInPast(px1, vx1, x) ||
      isInPast(py1, vy1, y) ||
      isInPast(px2, vx2, x) ||
      isInPast(py2, vy2, y)
    ) {
      continue;
    }

    total += 1;
  }
}

console.log(`${total} intersections occur within the test area`);
