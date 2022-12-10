const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let [clk, reg] = [0, 1];
let signalStrengthSum = 0;

input.split("\n").forEach((line) => {
  const opTime = line === "noop" ? 1 : 2;
  for (let i = 0; i < opTime; i++) {
    clk++;
    if (clk % 40 === 20) signalStrengthSum += reg * clk;
    if (i === opTime - 1 && line.includes("addx"))
      reg += parseInt(line.split(" ")[1]);
  }
});

console.log(`sum of 6 signal strength: ${signalStrengthSum}`);
