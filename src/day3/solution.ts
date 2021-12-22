const getMostCommonBitAtPosition = (numbers: string[], i: number): string => {
  let numberOfZeros = 0;
  for (const num of numbers) {
    if (num[i] === "0") {
      numberOfZeros += 1;
    }
  }
  return numberOfZeros > numbers.length / 2 ? "0" : "1";
};

const getMostCommonBits = (numbers: string[]): string => {
  let gamma = "";
  for (let i = 0; i < numbers[0].length; i++) {
    gamma += getMostCommonBitAtPosition(numbers, i);
  }
  return gamma;
};

const filterBySomething = (numbers: string[], predicate: (digit: string, mostCommon: string) => boolean): string => {
  let pointer = 0;
  while (numbers.length > 1) {
    const mostCommonBit = getMostCommonBitAtPosition(numbers, pointer);
    const numbersToRemove: string[] = [];
    for (let i = 0; i < numbers.length; i++) {
      if (!predicate(numbers[i][pointer], mostCommonBit)) {
        numbersToRemove.push(numbers[i]);
      }
    }
    numbers = numbers.filter((num) => !numbersToRemove.includes(num));
    pointer = (pointer + 1) % numbers[0].length;
  }
  return numbers[0];
};

export const part1 = (input: string) => {
  const numbers = input.split("\n");
  let gamma = getMostCommonBits(numbers);

  const epsilon = gamma
    .split("")
    .map((digit) => (digit === "0" ? "1" : "0"))
    .join("");

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

export const part2 = (input: string) => {
  let numbers = input.split("\n");

  const oxygen = filterBySomething(numbers, (digit, mostCommon) => digit === mostCommon);
  const co2 = filterBySomething(numbers, (digit, mostCommon) => digit !== mostCommon);

  return parseInt(oxygen, 2) * parseInt(co2, 2);
};
