const fs = require("node:fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const [time, record] = data.trimEnd().split("\n").map(line => line.slice(9).replaceAll(" ", "")).map(Number);

let ways = 0;

for (let speed = 1; speed < time; speed++) {
  const distance = speed * (time - speed);

  if (distance > record) {
    ways += 1;
  }
}

console.log(`The number of ways is ${ways}`);
