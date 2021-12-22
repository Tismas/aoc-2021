interface Entry {
  examples: string[];
  output: string[];
}

interface Possibilities {
  a: string[];
  b: string[];
  c: string[];
  d: string[];
  e: string[];
  f: string[];
  g: string[];
}
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type Possibility = keyof Possibilities;

const parseInput = (input: string): Entry[] => {
  const lines = input.split("\n").map((line) => line.trim());

  return lines.map((line) => {
    const [examples, output] = line.split(" | ");
    return {
      examples: examples.split(" "),
      output: output.split(" "),
    };
  });
};

export const part1 = (input: string) => {
  const entries = parseInput(input);
  let sum = 0;

  for (const { output } of entries) {
    sum += output.filter((segments) => [2, 3, 4, 7].includes(segments.length)).length;
  }

  return sum;
};

const narrowPossibilities = (possibitilies: Possibilities, segments: Possibility[], keys: Possibility[]) => {
  for (const key of keys) {
    possibitilies[key] = possibitilies[key].intersection(segments);
  }
};

const decode = (possibilities: Possibilities, segments: Possibility[]): Digit => {
  if (segments.length === 2) return "1";
  if (segments.length === 3) return "7";
  if (segments.length === 4) return "4";
  if (segments.length === 7) return "8";
  if (segments.length === 5) {
    if (segments.includes(possibilities["b"][0] as Possibility)) return "5";
    if (segments.includes(possibilities["e"][0] as Possibility)) return "2";
    return "3";
  }
  if (segments.length === 6) {
    if (!segments.includes(possibilities["d"][0] as Possibility)) return "0";
    if (!segments.includes(possibilities["c"][0] as Possibility)) return "6";
  }
  return "9";
};

export const part2 = (input: string) => {
  const entries = parseInput(input);
  const options = ["a", "b", "c", "d", "e", "f", "g"];

  let sum = 0;
  for (const { examples, output } of entries) {
    const possibilities: Possibilities = {
      a: options,
      b: options,
      c: options,
      d: options,
      e: options,
      f: options,
      g: options,
    };
    for (const segments of examples) {
      const segmentsArr = Array.from(segments) as Possibility[];
      if (segmentsArr.length === 2) {
        narrowPossibilities(possibilities, segmentsArr, ["c", "f"]);
      } else if (segmentsArr.length === 3) {
        narrowPossibilities(possibilities, segmentsArr, ["a", "c", "f"]);
      } else if (segmentsArr.length === 4) {
        narrowPossibilities(possibilities, segmentsArr, ["b", "c", "d", "f"]);
      } else if (segmentsArr.length === 5) {
        narrowPossibilities(possibilities, segmentsArr, ["a", "d", "g"]);
      } else if (segmentsArr.length === 6) {
        narrowPossibilities(possibilities, segmentsArr, ["a", "b", "f", "g"]);
      }
    }

    while (Object.values(possibilities).filter((value) => value.length > 1).length > 0) {
      const toRemove = Object.values(possibilities)
        .filter((value) => value.length === 1)
        .map((value) => value[0]);

      for (const k in possibilities) {
        let key = k as Possibility;
        if (possibilities[key].length > 1) {
          possibilities[key] = possibilities[key].subtract(toRemove);
        }
      }
    }

    let decodedOutput = "";
    for (const digit of output) {
      decodedOutput += decode(possibilities, Array.from(digit) as Possibility[]);
    }
    sum += Number(decodedOutput);
  }

  return sum;
};
