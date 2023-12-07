const fs = require("node:fs");
const path = require("path");

const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const strength = cards.reduce((acc, cur, i) => acc.set(cur, i), new Map());
const score = cards.reduce((acc, cur, i) => (acc[cur] = String.fromCharCode(65 + i), acc), {});

function getHandScore(hand) {                           // To make compare operators work with hand of cards strings
  return [...hand].map(card => score[card]).join("");   // Example: 257QA becomes BEGKM
}

function getHandType(hand) {
  const [kind1, kind2] = [...hand]
    .reduce((acc, cur) => (acc[strength.get(cur)]++, acc), new Uint8Array(cards.length))
    .sort((a, b) => b - a);

  if (kind1 > 4) return 6;                // Five of a kind
  if (kind1 > 3) return 5;                // Four of a kind
  if (kind1 > 2 && kind2 > 1) return 4;   // Full house
  if (kind1 > 2) return 3;                // Three of a kind
  if (kind1 > 1 && kind2 > 1) return 2;   // Two pair
  if (kind1 > 1) return 1;                // One pair
  return 0;                               // High card
}

const data = fs.readFileSync(path.resolve(__dirname, "./input"), "utf-8");
const list = data.trimEnd().split("\n").map(line => {
  const [hand, bid] = line.split(" ");
  return [getHandType(hand), getHandScore(hand), Number(bid)];
});

list.sort((a, b) => {
  if (a[0] === b[0]) {
    return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
  } else {
    return a[0] - b[0];
  }
});

const total = list.reduce((prev, [,,bid], i) => prev + bid * (i + 1), 0);

console.log(`The total winnings is ${total}`);
