import { getNeighbours } from "../framework/2d";

interface Location {
  x: number;
  y: number;
  height: number;
}
type Area = number[][];

const parseInput = (input: string): Area => {
  return input.split(/\r?\n/).map((line) => Array.from(line).map(Number));
};
const getLowPoints = (area: Area): Location[] => {
  const lowPoints = [];

  for (let y = 0; y < area.length; y++) {
    const row = area[y];
    for (let x = 0; x < row.length; x++) {
      const height = row[x];
      const { bottom, top, left, right } = getNeighbours(area, x, y, 10);
      if (Math.min(bottom, top, left, right) > height) {
        lowPoints.push({ x, y, height });
      }
    }
  }

  return lowPoints;
};
const getBasinSize = (area: Area, { x, y, height }: Location, locations: Set<string> = new Set()): Set<string> => {
  locations.add(`${x},${y}`);

  const { bottom, top, left, right } = getNeighbours(area, x, y, 10);
  if (bottom < 9 && bottom > height) {
    getBasinSize(area, { height: bottom, x, y: y - 1 }, locations);
  }
  if (top < 9 && top > height) {
    getBasinSize(area, { height: top, x, y: y + 1 }, locations);
  }
  if (left < 9 && left > height) {
    getBasinSize(area, { height: left, x: x - 1, y }, locations);
  }
  if (right < 9 && right > height) {
    getBasinSize(area, { height: right, x: x + 1, y }, locations);
  }

  return locations;
};

export const part1 = (input: string) => {
  const area = parseInput(input);
  const lowPoints = getLowPoints(area);
  return lowPoints.reduce((acc, lowPoint) => acc + lowPoint.height + 1, 0);
};

export const part2 = (input: string) => {
  const area = parseInput(input);
  const lowPoints = getLowPoints(area);
  const basins = lowPoints.map((lowPoint) => {
    return getBasinSize(area, lowPoint);
  });
  basins.sort((a, b) => b.size - a.size);
  return basins[0].size * basins[1].size * basins[2].size;
};
