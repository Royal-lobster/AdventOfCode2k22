const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

const mv = { X: 1, Y: 2, Z: 3, A: 1, B: 2, C: 3 };
let totalScore = 0;

input.split("\n").forEach((line) => {
  const [opp, me] = line.split(" ");
  let result = 0;

  if (mv[opp] === mv[me]) result = 3;
  else if (mv[me] === ((mv[opp] + 1) % 3 || 3)) result = 6;
  else result = 0;

  totalScore += mv[me] + result;
});

console.log(`Total score from game is ${totalScore}`);
