import { assert } from 'chai';
import { Grid } from './Grid';
import { transition } from './transition';

describe('3D', () => {
  it('9 alives should move to corners', () => {
    const state1 = ['+++', '+++', '+++'];
    const grid1 = new Grid(state1);
    const grid2 = transition(grid1);

    assert.deepStrictEqual(grid2.state(), ['+.+', '...', '+.+']);
  });

  it('partials, case 1', () => {
    /*
      ++.     +.+
      +++ to  +.+
      ...     .+.
    */

    const state1 = ['++.', '+++', '...'];
    const state2 = ['+.+', '+.+', '.+.'];
    const grid1 = new Grid(state1);
    const grid2 = transition(grid1);

    assert.deepStrictEqual(grid2.state(), state2);
  });

  it('partials, case 2', () => {
    /*
      ++.     ++.
      +.+ to  +..
      +..     .+.
    */

    const state1 = ['++.', '+.+', '+..'];
    const state2 = ['++.', '+..', '.+.'];
    const grid1 = new Grid(state1);
    const grid2 = transition(grid1);

    // grid1.print();
    // grid2.print();

    assert.deepStrictEqual(grid2.state(), state2);
  });

  it('partials, case 3', () => {
    /*
      ...     ...
      .++ to  .+.
      +..     .+.
    */

    const state1 = ['...', '.++', '+..'];
    const state2 = ['...', '.+.', '.+.'];
    const grid1 = new Grid(state1);
    const grid2 = transition(grid1);

    // grid1.print();
    // grid2.print();

    assert.deepStrictEqual(grid2.state(), state2);
  });
});
