const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const steps = data.trimEnd().split(",");
const regex = /=|-/;

const MULTIPLIER = 17;
const DIVIDER = 256;
const BOXES_AMOUNT = DIVIDER;

function getHash(str) {
  let current = 0;

  for (let i = 0; i < str.length; i++) {
    current += str.charCodeAt(i);
    current *= MULTIPLIER;
    current %= DIVIDER;
  }

  return current;
}

const boxes = Array.from({length: BOXES_AMOUNT}, () => []);

for (const step of steps) {
  const [label, focalLength] = step.split(regex);
  const box = boxes[getHash(label)];
  const existed = box.findIndex(lens => lens[0] === label);

  if (existed > -1) {
    focalLength ? box[existed][1] = Number(focalLength) : box.splice(existed, 1);
  } else if (focalLength) {
    box.push([label, Number(focalLength)]);
  }
}

const total = boxes.reduce((acc, box, i) => acc + box.reduce((acc, lens, j) => acc + (i + 1) * (j + 1) * lens[1], 0), 0);

console.log(`the focusing power of the resulting lens configuration is ${total}`);
