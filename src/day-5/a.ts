const input = require("fs").readFileSync("./input.txt", "utf-8") as string;
const [cratesConfig, directions] = input.split("\n\n");

const crates = {};

cratesConfig
  .split("\n")
  .reverse()
  .forEach((row, i) => {
    if (i === 0)
      row.split(" ").forEach((crateNo) => crateNo && (crates[crateNo] = []));
    else {
      let [currentCrate, empCount] = [0, 0];
      row.split(" ").forEach((c) => {
        if (c !== "")
          ++currentCrate && crates[currentCrate].push(c.replace(/\[|\]/g, ""));
        else {
          empCount++;
          if (empCount === 4) currentCrate++ && (empCount = 0);
        }
      });
    }
  });

directions.split("\n").forEach((direction, i) => {
  const [_, amount, from, to] = direction.match(/(\d+) from (\d+) to (\d+)/);
  crates[to].push(...crates[from].splice(-amount).reverse());
});

let topCrates = "";

Object.keys(crates).map((crateNo) => {
  topCrates += crates[crateNo].splice(-1)[0];
});

console.log(`Top layer crates: ${topCrates}`);
