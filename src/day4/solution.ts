interface Bingos {
  value: number;
  checked: boolean;
}
type Board = Array<Array<Bingos>>;

interface PrasedInput {
  drawnNumbers: number[];
  boards: Board[];
}

const printBoard = (board: Board) => {};

const parseInput = (input: string): PrasedInput => {
  const lines = input.split("\n");
  const drawnNumbers = lines[0].split(",").map(Number);

  return {
    drawnNumbers,
    boards: lines
      .slice(2)
      .join("\n")
      .split("\n\n")
      .map((x) =>
        x.split("\n").map((x) =>
          x
            .trim()
            .replace(/\s+/g, " ")
            .split(" ")
            .map(Number)
            .map((value) => ({ value, checked: false }))
        )
      ),
  };
};

const queryBoardThatWon = (boards: Board[]): Board | null => {
  for (const board of boards) {
    const size = board.length;
    for (let y = 0; y < size; y++) {
      let rowWin = true;
      let colWin = true;
      for (let x = 0; x < size; x++) {
        rowWin = board[y][x].checked && rowWin;
        colWin = board[x][y].checked && colWin;
      }
      if (rowWin || colWin) return board;
    }
  }
  return null;
};

const drawNumber = (boards: Board[], drawnNumber: number) => {
  for (const board of boards) {
    for (const row of board) {
      for (const cell of row) {
        if (cell.value === drawnNumber) cell.checked = true;
      }
    }
  }
};

const getScore = (board: Board, drawnNumber: number) => {
  let sum = 0;
  for (const row of board) {
    for (const number of row) {
      if (!number.checked) {
        sum += number.value;
      }
    }
  }
  return sum * drawnNumber;
};

export const part1 = (input: string) => {
  const { boards, drawnNumbers } = parseInput(input);

  for (const drawnNumber of drawnNumbers) {
    drawNumber(boards, drawnNumber);
    const wonBoard = queryBoardThatWon(boards);
    if (wonBoard) {
      return getScore(wonBoard, drawnNumber);
    }
  }

  return "Not found";
};

export const part2 = (input: string) => {
  const { boards, drawnNumbers } = parseInput(input);

  for (const drawnNumber of drawnNumbers) {
    drawNumber(boards, drawnNumber);
    let wonBoard = queryBoardThatWon(boards);
    while (wonBoard && boards.length !== 1) {
      boards.splice(boards.indexOf(wonBoard), 1);
      wonBoard = queryBoardThatWon(boards);
    }
    if (boards.length === 1 && wonBoard === boards[0]) {
      return getScore(boards[0], drawnNumber);
    }
  }

  return "Not found";
};
