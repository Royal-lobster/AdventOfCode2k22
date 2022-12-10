const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let tailMoveSet = new Set<string>();
let r: [number, number][] = [...Array(10).keys()].map(() => [0, 0]);

let dirMap = {
  U: [0, 1],
  R: [1, 0],
  D: [0, -1],
  L: [-1, 0],
};

const isTouching = (_hx: number, _hy: number, _tx: number, _ty: number) =>
  Math.abs(_hx - _tx) <= 1 && Math.abs(_hy - _ty) <= 1;

const moveTail = (hi: number, ti: number) => {
  if (!isTouching(r[hi][0], r[hi][1], r[ti][0], r[ti][1])) {
    const dx = Math.floor(r[hi][0] - r[ti][0]);
    const dy = Math.floor(r[hi][1] - r[ti][1]);
    const txInc = r[ti][0] === r[hi][0] ? 0 : dx / Math.abs(dx);
    const tyInc = r[ti][1] === r[hi][1] ? 0 : dy / Math.abs(dy);
    r[ti][0] += txInc;
    r[ti][1] += tyInc;
  }
};
input.split("\n").forEach((step) => {
  const [direction, distance] = step.split(" ");
  for (let i = 0; i < parseInt(distance); i++) {
    r[0][0] += dirMap[direction][0];
    r[0][1] += dirMap[direction][1];
    r.forEach((_, i) => {
      if (i !== r.length - 1) moveTail(i, i + 1);
      else tailMoveSet.add(`${r[i][0]} ${r[i][1]}`);
    });
  }
});

console.log(
  `Number of positions 9th tail visited at least once: ${tailMoveSet.size}`
);
