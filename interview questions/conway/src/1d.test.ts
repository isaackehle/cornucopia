import { assert } from 'chai';
import { AliveState, Grid } from './Grid';
import { transition } from './transition';

describe('1D', () => {
  it('alive -> dead', () => {
    const grid1 = new Grid([AliveState.ALIVE]);
    const grid2 = transition(grid1);

    assert.deepStrictEqual(grid2.state(), [AliveState.DEAD]);
  });

  it('dead -> dead', () => {
    const grid1 = new Grid([AliveState.DEAD]);
    const grid2 = transition(grid1);

    assert.deepStrictEqual(grid2.state(), [AliveState.DEAD]);
  });
});
