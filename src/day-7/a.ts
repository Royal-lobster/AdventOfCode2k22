const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

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

const dirsLessThan100k = [];

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

for (const [path, _] of allDirs) {
  const size = getDirSize(path);
  if (size < 100000) dirsLessThan100k.push(path);
}

const totalSizeLessThan100k = dirsLessThan100k.reduce(
  (acc, cur) => acc + getDirSize(cur),
  0
);

console.log(
  `Sum of the total sizes of directories less than 100k: ${totalSizeLessThan100k}`
);
