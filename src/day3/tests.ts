import { part1, part2 } from "./solution";

const input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

describe("day1", () => {
  it("part1", () => {
    expect(part1(input)).toEqual(198);
  });
  it("part2", () => {
    expect(part2(input)).toEqual(230);
  });
});
