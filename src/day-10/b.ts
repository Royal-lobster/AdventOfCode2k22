const input = require("fs").readFileSync("./input.txt", "utf-8") as string;

const r = (n: number) => [...Array(n).keys()];

let [clk, reg] = [0, 0];
let lightSource = r(40).map((i) => (i < 3 ? "#" : "."));
let screen = r(6).map((_) => r(40).map((_) => ""));

input.split("\n").forEach((line) => {
  const opTime = line === "noop" ? 1 : 2;
  for (let i = 0; i < opTime; i++) {
    screen[Math.floor(clk / 40)][clk % 40] = lightSource[clk % 40];
    clk++;
    if (i === opTime - 1 && line.includes("addx")) {
      reg += parseInt(line.split(" ")[1]);
      lightSource = r(40).map((i) => (i > reg - 1 && i < reg + 3 ? "#" : "."));
    }
  }
});

const crtOutput = screen.map((line) => line.join("")).join("\n");
console.log(`CRT SCREEN OUTPUT : \n${crtOutput}`);
