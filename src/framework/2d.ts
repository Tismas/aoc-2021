interface Neightbours<T> {
  bottom: T;
  top: T;
  left: T;
  right: T;
}
interface NeightboursWithDiagonals<T> extends Neightbours<T> {
  bottomLeft: T;
  bottomright: T;
  topLeft: T;
  topRight: T;
}

export const getNeighbours = <T, F, D extends boolean>(
  matrix: T[][],
  x: number,
  y: number,
  fallbackValue?: F,
  includeDiagonal?: D
): D extends true ? NeightboursWithDiagonals<T | F> : Neightbours<T | F> => {
  const bottom = matrix.get(y - 1, []).get(x, fallbackValue);
  const top = matrix.get(y + 1, []).get(x, fallbackValue);
  const left = matrix.get(y, []).get(x - 1, fallbackValue);
  const right = matrix.get(y, []).get(x + 1, fallbackValue);
  const bottomLeft = matrix.get(y - 1, []).get(x - 1, fallbackValue);
  const bottomright = matrix.get(y - 1, []).get(x + 1, fallbackValue);
  const topLeft = matrix.get(y + 1, []).get(x - 1, fallbackValue);
  const topRight = matrix.get(y + 1, []).get(x + 1, fallbackValue);

  const notDiagonal = { bottom, top, left, right };
  return (
    includeDiagonal
      ? {
          ...notDiagonal,
          bottomLeft,
          bottomright,
          topLeft,
          topRight,
        }
      : notDiagonal
  ) as D extends true ? NeightboursWithDiagonals<T | F> : Neightbours<T | F>;
};
