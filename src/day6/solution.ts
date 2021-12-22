const getFishesAfterDays = (fishes: number[], days: number): number => {
  const counter = new Array(9).fill(0);

  for (const fish of fishes) {
    counter[fish] = counter[fish] + 1;
  }

  for (let day = 0; day < days; day++) {
    counter.push(counter.shift());
    counter[6] += counter[8];
  }

  return counter.reduce((acc, x) => acc + x, 0);
};

export const part1 = (input: string) => {
  let fishes = input.split(",").map(Number);

  return getFishesAfterDays(fishes, 80);
};

export const part2 = (input: string) => {
  let fishes = input.split(",").map(Number);

  return getFishesAfterDays(fishes, 256);
};
