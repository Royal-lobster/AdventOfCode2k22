const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let totalOverlapRanges = 0;

input.split("\n").forEach((pair) => {
  const [r1, r2] = pair.split(",").map((r) => r.split("-").map(Number));
  if ((r1[1] >= r2[0] && r1[0] <= r2[0]) || (r2[1] >= r1[0] && r2[0] <= r1[0]))
    totalOverlapRanges++;
});

console.log(`Total Overlap Ranges: ${totalOverlapRanges}`);
