/**
 *
 * Any live cell at time T with < 2 live neighbors dies (by underpopulation)
 * Any live cell at time T  with exactly 2 or 3 live neighbors survives
 * Any live cell at time T with > 3 live neighbors dies (by overpopulation)
 * Any dead cell with exactly 3 live neighbors becomes alive (by reproduction)
 *
 * @param cnt
 * @param isAlive
 * @returns
 */

export const determineNewState = (cnt: number, isAlive: boolean): boolean => {
  if (isAlive) {
    if (cnt < 2) return false;
    if (cnt > 3) return false;
    return true;
  }

  if (cnt === 3) return true;
  return false;
};
