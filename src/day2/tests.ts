import { part1, part2 } from "./solution";

const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

describe("day1", () => {
  it("part1", () => {
    expect(part1(input)).toEqual(150);
  });
  it("part2", () => {
    expect(part2(input)).toEqual(900);
  });
});
