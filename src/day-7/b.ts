const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

const TOTAL_STORAGE_SPACE = 70000000;
const REQUIRED_FREE_SPACE = 30000000;
const allDirs = new Map<string, Array<number | string>>();
const currentLocation = [];

input.split("\n").forEach((line) => {
  if (line.startsWith("$")) {
    if (line.includes("ls")) return;
    const location = line.split(" ")[2];
    if (location === "..") currentLocation.pop();
    else currentLocation.push(location);
  } else {
    let path = currentLocation.join("/");
    const prevState = allDirs.get(path) || [];
    const [size, content] = line.split(" ");
    if (size === "dir") allDirs.set(path, [...prevState, `${path}/${content}`]);
    else allDirs.set(path, [...prevState, parseInt(size)]);
  }
});

const dirsGreaterThanRequired = [];
let requiredSizeToDel = 0;

const getDirSize = (path: string): number => {
  const dir = allDirs.get(path);
  let size = 0;
  for (const item of dir) {
    if (typeof item === "number") {
      size += item;
      continue;
    }
    const dirSize = getDirSize(item);
    size += dirSize;
    allDirs.set(
      path,
      allDirs.get(path)?.map((i) => (i === item ? dirSize : i))
    );
  }
  return size;
};

for (const [path] of allDirs) {
  const size = getDirSize(path);
  if (path === "/") {
    let currentFreeSpace = TOTAL_STORAGE_SPACE - size;
    requiredSizeToDel = REQUIRED_FREE_SPACE - currentFreeSpace;
  } else if (size > requiredSizeToDel) dirsGreaterThanRequired.push(size);
}

const minSizeToDel = Math.min(...dirsGreaterThanRequired);

console.log(`Minimum size of directory to be removed: ${minSizeToDel}`);
