const windowIncreased = (
  arr: number[],
  lastWindowIndex: number,
  window = 1
) => {
  if (lastWindowIndex <= window) return false;

  let sum = 0;
  let prevSum = 0;
  for (let i = lastWindowIndex - window; i < lastWindowIndex; i++) {
    sum += arr[i];
    prevSum += arr[i - 1];
  }

  return sum > prevSum;
};

export const part1 = (input: string) => {
  return input
    .split("\n")
    .map(Number)
    .reduce((acc, val, i, arr) => {
      if (windowIncreased(arr, i + 1)) return acc + 1;
      return acc;
    }, 0);
};

export const part2 = (input: string) => {
  const window = 3;
  return input
    .split("\n")
    .map(Number)
    .reduce((acc, val, i, arr) => {
      if (windowIncreased(arr, i + 1, window)) return acc + 1;
      return acc;
    }, 0);
};
