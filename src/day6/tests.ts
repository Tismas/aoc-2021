import { part1, part2 } from "./solution";

const input = `3,4,3,1,2`;

describe("day6", () => {
  it("part1", () => {
    expect(part1(input)).toEqual(5934);
  });
  it("part2", () => {
    expect(part2(input)).toEqual(26984457539);
  });
});
