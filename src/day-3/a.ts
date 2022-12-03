const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

const priority = [
  ...[...Array(26).keys()].map((i) => String.fromCharCode(97 + i)),
  ...[...Array(26).keys()].map((i) => String.fromCharCode(65 + i)),
];

let totalPriority = 0;

input.split("\n").forEach((bag) => {
  const items = bag.split("");
  const p1 = items.slice(0, items.length / 2);
  const p2 = items.slice(items.length / 2);
  const common = p1.filter((i) => p2.includes(i))[0];
  totalPriority += priority.indexOf(common) + 1;
});

console.log(`Total priority: ${totalPriority}`);
