import { part1, part2 } from "./solution";

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

describe("day9", () => {
  it("part1", () => {
    expect(part1(input)).toEqual(15);
  });
  it("part2", () => {
    expect(part2(input)).toEqual(1134);
  });
});
