const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const blocks = data.trimEnd().split("\n\n");
const nonNumeric = /\D/g;
const [seeds, ...maps] = blocks.map(block => block.replace(nonNumeric, " ").trim().split(" ").map(Number));

let ranges = [];

for (let i = 0; i < seeds.length; i += 2) {
  ranges.push([seeds[i], seeds[i] + seeds[i + 1]]);         // exclusive range
}

for (const map of maps) {
  const nextRanges = [];

  while (ranges.length) {
    const [start, end] = ranges.pop();
    let isIntersect = false;

    for (let k = 0; k < map.length; k += 3) {
      const [destination, source, length] = map.slice(k, k + 3);
      const shift = destination - source;
  
      const maxStart = Math.max(start, source);
      const minEnd = Math.min(end, source + length);

      if (maxStart < minEnd) {
        isIntersect = true;
        nextRanges.push([maxStart + shift, minEnd + shift]);

        if (maxStart > start) {
          ranges.push([start, maxStart]);
        }

        if (end > minEnd) {
          ranges.push([minEnd, end]);
        }

        break;
      }
    }

    if (!isIntersect) {
      nextRanges.push([start, end]);
    }
  }

  ranges = nextRanges;
}

const lowestLocation = Math.min(...ranges.map(range => range[0]));

console.log(`The lowest location number that corresponds to any of the initial seed numbers is ${lowestLocation}`);
