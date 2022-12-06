const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

let charCountForMarker = 0;
let slidingWindow = [];
const WINDOW_SIZE = 14;

input.split("").every((char, i) => {
  if (slidingWindow.length === WINDOW_SIZE) {
    if (new Set(slidingWindow).size === WINDOW_SIZE)
      return !(charCountForMarker = i);
    slidingWindow.shift();
  }
  return slidingWindow.push(char);
});

console.log(`Count till marker character: ${charCountForMarker}`);
