import { part1, part2 } from "./solution";

const input = `199
200
208
210
200
207
240
269
260
263`;

describe("day1", () => {
  it("part1", () => {
    expect(part1(input)).toEqual(7);
  });
  it("part2", () => {
    expect(part2(input)).toEqual(5);
  });
});
