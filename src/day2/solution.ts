export const part1 = (input: string) => {
  let x = 0,
    y = 0;
  for (const instruction of input.split("\n")) {
    const [command, valueStr] = instruction.split(" ");
    const value = +valueStr;

    if (command === "forward") {
      x += value;
    } else if (command === "down") {
      y += value;
    } else if (command === "up") {
      y -= value;
    } else {
      throw new Error("invalid command");
    }
  }
  return x * y;
};

export const part2 = (input: string) => {
  let x = 0,
    y = 0,
    aim = 0;
  for (const instruction of input.split("\n")) {
    const [command, valueStr] = instruction.split(" ");
    const value = +valueStr;

    if (command === "forward") {
      x += value;
      y += value * aim;
    } else if (command === "down") {
      aim += value;
    } else if (command === "up") {
      aim -= value;
    } else {
      throw new Error("invalid command");
    }
  }
  return x * y;
};
