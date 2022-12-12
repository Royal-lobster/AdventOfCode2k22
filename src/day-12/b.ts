const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let allStarts: [number, number][] = [[0, 0]];
let end: [number, number] = [0, 0];

const graph = input.split("\n").map((l, x) =>
  l.split("").map((c, i) => {
    if (c === "S" || c === "a") {
      allStarts.push([x, i]);
      if (c === "S") return 0;
    }
    if (c === "E") {
      end = [x, i];
      return 25;
    }
    return c.charCodeAt(0) - 97;
  })
);

const getNeighbors = ([x, y]: number[]) => {
  let neighbors = [];
  if (x > 0) neighbors.push([x - 1, y]);
  if (x < graph.length - 1) neighbors.push([x + 1, y]);
  if (y > 0) neighbors.push([x, y - 1]);
  if (y < graph[0].length - 1) neighbors.push([x, y + 1]);
  return neighbors.filter(([nx, ny]) => graph[nx][ny] - graph[x][y] <= 1) as [
    number,
    number
  ][];
};

let pathLength = null;

allStarts.forEach((start) => {
  let visited = graph.map((l) => l.map(() => false));
  let queue = [{ node: start, dist: 0 }];

  while (queue.length > 0) {
    const { node, dist } = queue.sort((a, b) => a.dist - b.dist).shift();

    if (visited[node[0]][node[1]]) continue;
    visited[node[0]][node[1]] = true;

    if (node[0] === end[0] && node[1] === end[1]) {
      if (pathLength === null || dist < pathLength) {
        pathLength = dist;
      }
      break;
    }

    for (const neighbor of getNeighbors(node))
      queue.push({ node: neighbor, dist: dist + 1 });
  }
});

console.log(`Path length of trip: ${pathLength}`);
