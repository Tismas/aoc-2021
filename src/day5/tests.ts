import { part1, part2 } from "./solution";

const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

describe("day5", () => {
  it("part1", () => {
    expect(part1(input)).toEqual(5);
  });
  it("part2", () => {
    expect(part2(input)).toEqual(12);
  });
});
