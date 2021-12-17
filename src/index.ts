import fs from "fs";
import path from "path";

import { Solution } from "./types/solution";

const getFilePathsForDay = (day: number) => {
  const inputPath = path.resolve(__dirname, `./day${day}/input.txt`);
  const solutionPath = path.resolve(__dirname, `./day${day}/solution.ts`);

  return { inputPath, solutionPath };
};

const runSolutionForDay = (day: number) => {
  const { inputPath, solutionPath } = getFilePathsForDay(day);
  if (fs.existsSync(inputPath) && fs.existsSync(solutionPath)) {
    const input = fs.readFileSync(inputPath).toString();
    const { part1, part2 } = require(solutionPath) as Solution;

    console.log(`---------------------------------`);
    console.log(`Day ${day}`);
    console.log(`Part 1: ${part1(input)}`);
    console.log(`Part 2: ${part2(input)}`);
    console.log(``);
  }
};

const dayToRun = process.argv[2];
if (dayToRun) {
  runSolutionForDay(Number(dayToRun));
} else {
  for (let i = 0; i < 25; i++) {
    runSolutionForDay(i);
  }
}
