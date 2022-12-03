const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

const priority = [
  ...[...Array(26).keys()].map((i) => String.fromCharCode(97 + i)),
  ...[...Array(26).keys()].map((i) => String.fromCharCode(65 + i)),
];

let totalPriority = 0;

const bags = input.split("\n");
const groups: string[][][] = [];
for (let i = 0; i < bags.length; i += 3) {
  groups.push([bags[i], bags[i + 1], bags[i + 2]].map((r) => r.split("")));
}

groups.forEach((group) => {
  const [p1, p2, p3] = group;
  const c1 = p1.filter((i) => p2.includes(i));
  const c2 = p2.filter((i) => p3.includes(i));
  const common = c1.filter((i) => c2.includes(i))[0];
  totalPriority += priority.indexOf(common) + 1;
});

console.log(`Total priority: ${totalPriority}`);
