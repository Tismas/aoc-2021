const getPoints = (line: string): number => {
  const characters = Array.from(line);
  const que = [];
  for (const char of characters) {
    if (["(", "[", "{", "<"].includes(char)) {
      que.unshift(char);
    } else {
      if (char === ")" && que[0] !== "(") return 3;
      if (char === "]" && que[0] !== "[") return 57;
      if (char === "}" && que[0] !== "{") return 1197;
      if (char === ">" && que[0] !== "<") return 25137;
      que.shift();
    }
  }
  return 0;
};

const getScore = (line: string): number => {
  const characters = Array.from(line);
  const que = [];
  for (const char of characters) {
    if (["(", "[", "{", "<"].includes(char)) {
      que.unshift(char);
    } else {
      que.shift();
    }
  }

  let sum = 0;
  for (const char of que) {
    sum *= 5;
    if (char === "(") sum += 1;
    if (char === "[") sum += 2;
    if (char === "{") sum += 3;
    if (char === "<") sum += 4;
  }
  return sum;
};

export const part1 = (input: string) => {
  let points = 0;

  for (const line of input.split(/\r?\n/)) {
    points += getPoints(line);
  }

  return points;
};

export const part2 = (input: string) => {
  const correctLines = input.split(/\r?\n/).filter((line) => getPoints(line) === 0);

  const scores = correctLines.map((line) => getScore(line)).sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
};
