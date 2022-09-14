import { determineNewState } from './determineNewState';
import { AliveState, Grid } from './Grid';

export const transition = (old_state: Grid) => {
  const newState = old_state.rows.map((row, r) => {
    const rowState = row.cells.map((cell, c) => {
      const cnt = old_state.getAliveNeighborCount({ r, c });
      const wasAlive = cell.isAlive;

      return determineNewState(cnt, wasAlive) ? AliveState.ALIVE : AliveState.DEAD;
    });

    return rowState.join('');
  });

  return new Grid(newState);
};
