const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

const forestMap = input
  .split("\n")
  .map((line) => line.split("").map((num) => parseInt(num)));

let MaxScenicScore = 0;

const treeIsVisible = (row: number, col: number) => {
  const treeHeight = forestMap[row][col];
  let [visTop, visDown, visRight, visLeft] = [0, 0, 0, 0];

  for (let j = row - 1; j >= 0; j--) {
    visTop++;
    if (forestMap[j][col] >= treeHeight) break;
  }
  for (let j = row + 1; j < forestMap.length; j++) {
    visDown++;
    if (forestMap[j][col] >= treeHeight) break;
  }
  for (let k = col - 1; k >= 0; k--) {
    visRight++;
    if (forestMap[row][k] >= treeHeight) break;
  }
  for (let k = col + 1; k < forestMap[row].length; k++) {
    visLeft++;
    if (forestMap[row][k] >= treeHeight) break;
  }
  const scenicScore = visTop * visDown * visRight * visLeft;
  if (scenicScore > MaxScenicScore) MaxScenicScore = scenicScore;
};

for (let row = 0; row < forestMap.length; row++) {
  for (let col = 0; col < forestMap[row].length; col++) {
    treeIsVisible(row, col);
  }
}
console.log(`Greatest scenic score: ${MaxScenicScore}`);
