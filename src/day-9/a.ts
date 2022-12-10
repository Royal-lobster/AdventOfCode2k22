const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let tailMoveSet = new Set<string>();
let [hx, hy, tx, ty] = [0, 0, 0, 0];

let dirMap = {
  U: [0, 1],
  R: [1, 0],
  D: [0, -1],
  L: [-1, 0],
};

const isTouching = () => Math.abs(hx - tx) <= 1 && Math.abs(hy - ty) <= 1;

input.split("\n").forEach((step) => {
  const [direction, distance] = step.split(" ");
  for (let i = 0; i < parseInt(distance); i++) {
    hx += dirMap[direction][0];
    hy += dirMap[direction][1];

    if (!isTouching()) {
      const dx = Math.floor(hx - tx);
      const dy = Math.floor(hy - ty);
      const txInc = tx === hx ? 0 : dx / Math.abs(dx);
      const tyInc = ty === hy ? 0 : dy / Math.abs(dy);
      tx += txInc;
      ty += tyInc;
      tailMoveSet.add(`${tx} ${ty}`);
    }
  }
});

console.log(
  `Number of positions tail visited at least once: ${tailMoveSet.size}`
);
