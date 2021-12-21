type Fish = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type Counter = Record<Fish, number>;

const getFishesAfterDays = (fishes: Fish[], days: number): number => {
  const counter: Counter = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };

  for (const fish of fishes) {
    counter[fish] = counter[fish] + 1;
  }

  for (let day = 0; day < days; day++) {
    const spawning = counter[0];
    for (let i = 1; i <= 8; i++) {
      counter[(i - 1) as Fish] = counter[i as Fish];
    }
    counter[8] = spawning;
    counter[6] += spawning;
  }

  return Object.values(counter).reduce((acc, x) => acc + x);
};

export const part1 = (input: string) => {
  let fishes = input.split(",").map(Number) as Fish[];

  return getFishesAfterDays(fishes, 80);
};

export const part2 = (input: string) => {
  let fishes = input.split(",").map(Number) as Fish[];

  return getFishesAfterDays(fishes, 256);
};
