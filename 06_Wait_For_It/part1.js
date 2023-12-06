const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const whitespace = /[ ]+/;
const [times, distances] = data.trimEnd().split("\n").map(line => line.slice(9).trim().split(whitespace).map(Number));

let total = 1;

for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const record = distances[i];
  let ways = 0;

  for (let speed = 1; speed < time; speed++) {
    const distance = speed * (time - speed);

    if (distance > record) {
      ways += 1;
    }
  }

  if (ways) {
    total *= ways;
  }
}

console.log(`The number of ways multiplied together is ${total}`);
