const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let totalCalorieBags = [];
let currentBag = [];
let topThreeCalorieBags = [];

input.split("\n").forEach((n) => {
  if (n === "") {
    totalCalorieBags.push(currentBag);
    const sum = currentBag.reduce((acc, curr) => acc + curr, 0);
    if (topThreeCalorieBags.length < 3) {
      topThreeCalorieBags.push(sum);
    } else {
      topThreeCalorieBags.sort((a, b) => b - a);
      if (sum > topThreeCalorieBags[2]) {
        topThreeCalorieBags[2] = sum;
      }
    }
    currentBag = [];
  } else {
    currentBag.push(Number(n));
  }
});

const sum = topThreeCalorieBags.reduce((acc, curr) => acc + curr, 0);
console.log(`sum of top 3 calorie bags : ${sum}`);
