const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const blocks = data.trimEnd().split("\n\n");
const nonNumeric = /\D/g;
const [seeds, ...maps] = blocks.map(block => block.replace(nonNumeric, " ").trim().split(" ").map(Number));

for (let i = 0; i < seeds.length; i++) {
  for (const map of maps) {
    for (let k = 0; k < map.length; k += 3) {
      const [destination, source, length] = map.slice(k, k + 3);
      const shift = destination - source;

      if (seeds[i] >= source && seeds[i] < source + length) {
        seeds[i] += shift;
        break;
      }
    }
  }
}

const lowestLocation = Math.min(...seeds);

console.log(`The lowest location number that corresponds to any of the initial seed numbers is ${lowestLocation}`);
