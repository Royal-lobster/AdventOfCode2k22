const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

const r = (n: number) => [...Array(n).keys()];

const holdings: number[][] = [];
const operation: string[] = [];
const test: { div: number; to: number; else: number }[] = [];

input.split("\n\n").forEach((block, i) => {
  const lines = block.split("\n");
  holdings[i] = lines[1].split(":")[1].split(",").map(Number);
  operation[i] = lines[2].split(":")[1].split("=")[1];
  test[i] = {
    div: Number(lines[3].split("by")[1]),
    to: Number(lines[4].split("monkey")[1]),
    else: Number(lines[5].split("monkey")[1]),
  };
});

const timesInspected: number[] = r(holdings.length).fill(0);
const divisor = test.reduce((acc, cur) => acc * cur.div, 1);

r(10000).forEach(() => {
  r(holdings.length).forEach((monkey) => {
    [...holdings[monkey]].forEach((item) => {
      const newLevel =
        eval(operation[monkey].replace(/old/g, `${item}`)) % divisor;
      timesInspected[monkey] += 1;
      const isDiv = newLevel % test[monkey].div === 0;
      holdings[isDiv ? test[monkey].to : test[monkey].else].push(newLevel);
      holdings[monkey].shift();
    });
  });
});

timesInspected.sort((a, b) => b - a);
const monkeyBusiness = timesInspected[0] * timesInspected[1];

console.log(`level of monkey business after 20 rounds: ${monkeyBusiness}`);
