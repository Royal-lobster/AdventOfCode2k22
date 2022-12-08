const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

const forestMap = input
  .split("\n")
  .map((line) => line.split("").map((num) => parseInt(num)));

let visibleTrees = forestMap[0].length * 4 - 4;

const treeIsVisible = (row: number, col: number) => {
  const treeHeight = forestMap[row][col];
  let [visTop, visDown, visRight, visLeft] = [false, false, false, false];

  for (let j = row - 1; j >= 0; j--) {
    visTop = forestMap[j][col] < treeHeight;
    if (!visTop) break;
  }
  if (visTop) return true;

  for (let j = row + 1; j < forestMap.length; j++) {
    visDown = forestMap[j][col] < treeHeight;
    if (!visDown) break;
  }
  if (visDown) return true;

  for (let k = col - 1; k >= 0; k--) {
    visRight = forestMap[row][k] < treeHeight;
    if (!visRight) break;
  }
  if (visRight) return true;

  for (let k = col + 1; k < forestMap[row].length; k++) {
    visLeft = forestMap[row][k] < treeHeight;
    if (!visLeft) break;
  }
  if (visLeft) return true;
  return false;
};

for (let row = 1; row < forestMap.length - 1; row++) {
  for (let col = 1; col < forestMap[row].length - 1; col++) {
    visibleTrees += Number(treeIsVisible(row, col));
  }
}

console.log(`Visible trees: ${visibleTrees}`);
