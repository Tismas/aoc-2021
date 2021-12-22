import { part1, part2 } from "./solution";

const input = `16,1,2,0,4,2,7,1,2,14`;

describe("day1", () => {
  it("part1", () => {
    expect(part1(input)).toEqual(37);
  });
  it("part2", () => {
    expect(part2(input)).toEqual(168);
  });
});
