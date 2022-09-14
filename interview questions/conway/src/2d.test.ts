import { assert } from 'chai';
import { Grid } from './Grid';
import { transition } from './transition';

describe('2D', () => {
  it('4 alives should stay alive (all have 3 alive neighbors)', () => {
    const state1 = ['++', '++'];
    const grid1 = new Grid(state1);
    const grid2 = transition(grid1);

    assert.deepStrictEqual(grid2.state(), ['++', '++']);
  });

  it('4 deads should stay dead (all have 3 dead neighbors)', () => {
    const state1 = ['..', '..'];
    const grid1 = new Grid(state1);
    const grid2 = transition(grid1);

    assert.deepStrictEqual(grid2.state(), ['..', '..']);
  });

  it('2 deads and 2 alives should become all dead', () => {
    const state1 = ['.+', '+.'];
    const grid1 = new Grid(state1);
    const grid2 = transition(grid1);

    assert.deepStrictEqual(grid2.state(), ['..', '..']);
  });

  it('3 alives and 1 dead should become all alive', () => {
    const state1 = ['++', '+.'];
    const grid1 = new Grid(state1);
    const grid2 = transition(grid1);

    assert.deepStrictEqual(grid2.state(), ['++', '++']);
  });
});
