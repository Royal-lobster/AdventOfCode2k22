const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let start: [number, number] = [0, 0];
let end: [number, number] = [0, 0];

const graph = input.split("\n").map((l, x) =>
  l.split("").map((c, i) => {
    if (c === "S") {
      start = [x, i];
      return 0;
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

let visited = graph.map((l) => l.map(() => false));
let queue = [{ node: start, dist: 0 }];
let pathLength = null;

while (queue.length > 0) {
  const { node, dist } = queue.sort((a, b) => a.dist - b.dist).shift();

  if (visited[node[0]][node[1]]) continue;
  visited[node[0]][node[1]] = true;

  if (node[0] === end[0] && node[1] === end[1]) {
    pathLength = dist;
    break;
  }

  for (const neighbor of getNeighbors(node))
    queue.push({ node: neighbor, dist: dist + 1 });
}

console.log(`Path length of trip: ${pathLength}`);
