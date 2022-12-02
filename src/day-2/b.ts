const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

const mv = { A: 1, B: 2, C: 3 };
let totalScore = 0;

input.split("\n").forEach((line) => {
  const [opp, goal] = line.split(" ");
  let moveScore = 0;

  if (goal === "Y") {
    moveScore = mv[opp];
  } else if (goal === "Z") {
    moveScore = (mv[opp] + 1) % 3 || 3;
  } else {
    moveScore = (mv[opp] - 1) % 3 || 3;
  }

  totalScore += moveScore + { X: 0, Y: 3, Z: 6 }[goal];
});

console.log(`Total score from game is ${totalScore}`);
