const parseInput = (input: string): number[] => {
  return input
    .split(",")
    .map(Number)
    .sort((a, b) => a - b);
};

const getDistance = (numbers: number[], average: number): number => {
  return numbers.reduce((acc, x) => {
    const n = Math.abs(x - average);
    const sum = (n / 2) * (1 + n);
    return acc + sum;
  }, 0);
};

export const part1 = (input: string) => {
  const sorted = parseInput(input);
  const median = sorted[Math.floor(sorted.length / 2)];
  return sorted.reduce((acc, x) => acc + Math.abs(x - median), 0);
};

export const part2 = (input: string) => {
  const sorted = parseInput(input);
  const average = Math.round(sorted.reduce((acc, x) => acc + x) / sorted.length);

  return Math.min(getDistance(sorted, average), getDistance(sorted, average - 1), getDistance(sorted, average + 1));
};
