interface Point {
  x: number;
  y: number;
}
interface Line {
  start: Point;
  end: Point;
  id: number;
}

interface Cell {
  values: Array<Line["id"]>;
}
type Board = Array<Array<Cell>>;

const parseInput = (input: string): Line[] => {
  return input
    .split("\n")
    .map((line) => line.split(" -> "))
    .map(([start, end], i) => {
      const [sx, sy] = start.split(",").map(Number);
      const [ex, ey] = end.split(",").map(Number);
      return {
        id: i,
        start: { x: sx, y: sy },
        end: { x: ex, y: ey },
      };
    });
};

const getBoard = (lines: Line[]): Board => {
  let maxWidth = Math.max(
    ...lines.flatMap((line) => [line.start.x, line.end.x])
  );
  let maxHeight = Math.max(
    ...lines.flatMap((line) => [line.start.y, line.end.y])
  );

  const board = new Array(maxHeight + 1)
    .fill(0)
    .map(() => new Array(maxWidth + 1).fill(0).map(() => ({ values: [] })));

  return board;
};

const printBoard = (board: Board): void => {
  for (const row of board) {
    for (const cell of row) {
      process.stdout.write(
        cell.values.length ? cell.values.length.toString() : "."
      );
    }
    console.log("");
  }
};

const drawLines = (board: Board, lines: Line[], includeDiagonal = false) => {
  for (const line of lines) {
    const startY = Math.min(line.start.y, line.end.y);
    const endY = Math.max(line.start.y, line.end.y);
    const startX = Math.min(line.start.x, line.end.x);
    const endX = Math.max(line.start.x, line.end.x);
    if (line.start.x === line.end.x) {
      for (let y = startY; y <= endY; y++) {
        board[y][line.start.x].values.push(line.id);
      }
    } else if (line.start.y === line.end.y) {
      for (let x = startX; x <= endX; x++) {
        board[line.start.y][x].values.push(line.id);
      }
    } else if (includeDiagonal) {
      const delta = Math.abs(line.start.y - line.end.y);
      const signX = Math.sign(line.end.x - line.start.x);
      const signY = Math.sign(line.end.y - line.start.y);
      for (let diff = 0; diff <= delta; diff++) {
        board[line.start.y + diff * signY][
          line.start.x + diff * signX
        ].values.push(line.id);
      }
    }
  }
};

export const part1 = (input: string) => {
  const lines = parseInput(input);
  const board = getBoard(lines);

  drawLines(board, lines);

  return board.flatMap((line) => line).filter((cell) => cell.values.length >= 2)
    .length;
};

export const part2 = (input: string) => {
  const lines = parseInput(input);
  const board = getBoard(lines);

  drawLines(board, lines, true);

  return board.flatMap((line) => line).filter((cell) => cell.values.length >= 2)
    .length;
};
