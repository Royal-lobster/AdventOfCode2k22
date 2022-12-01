const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let totalCalorieBags = [];
let currentBag = [];
let maxCaloriesSoFar = 0;

input.split("\n").forEach((n) => {
  if (n === "") {
    totalCalorieBags.push(currentBag);
    const sum = currentBag.reduce((acc, curr) => acc + curr, 0);
    if (sum > maxCaloriesSoFar) {
      maxCaloriesSoFar = sum;
    }
    currentBag = [];
  } else {
    currentBag.push(Number(n));
  }
});

console.log(`Maximum calories a elf carrying : ${maxCaloriesSoFar}`);
