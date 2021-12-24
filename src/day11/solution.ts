import { getNeighbours } from "../framework/2d";

interface Octopus {
  flashed: boolean;
  value: number;
}

const parseInput = (input: string): Octopus[][] => {
  return input.split(/\r?\n/).map((line) => Array.from(line).map((v) => ({ flashed: false, value: Number(v) })));
};

const tick = (grid: Octopus[][]): number => {
  let flashesThisTick = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      grid[y][x].value += 1;
    }
  }
  let flashed = grid.flat().some((octo) => octo.value > 9);
  while (flashed) {
    flashed = false;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const octopus = grid[y][x];
        if (!octopus.flashed && octopus.value > 9) {
          octopus.flashed = true;
          flashesThisTick += 1;
          flashed = true;
          const neighbours = getNeighbours(grid, x, y, null, true);
          Object.values(neighbours)
            .filter((octo): octo is Octopus => octo)
            .forEach((octo) => (octo.value += 1));
        }
      }
    }
  }
  grid.flat().forEach((octo) => {
    if (octo.value > 9) octo.value = 0;
    octo.flashed = false;
  });

  return flashesThisTick;
};

export const part1 = (input: string) => {
  const grid = parseInput(input);
  const iterations = 100;
  let flashes = 0;

  for (let i = 0; i < iterations; i++) {
    flashes += tick(grid);
  }

  return flashes;
};

export const part2 = (input: string) => {
  const grid = parseInput(input);
  let lastFlashes = 0;
  let iteration = 0;

  for (; lastFlashes < 100; iteration++) {
    lastFlashes = tick(grid);
  }

  return iteration;
};
