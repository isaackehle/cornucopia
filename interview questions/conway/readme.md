
# Conway's Game of Life

## References

* [wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
* [conwaylife.com](https://conwaylife.com/)

## Problem

The cells exist in a 2 dimensional grid. For our purposes, it will be finite. Each cell has 8 neighbors (except possibly at the edges).

At time-step T+1, the following transitions occur:

* Any live cell at time T with < 2 live neighbors dies (by underpopulation)
* Any live cell at time T  with exactly 2 or 3 live neighbors survives
* Any live cell at time T with > 3 live neighbors dies (by overpopulation)
* Any dead cell with exactly 3 live neighbors becomes alive (by reproduction)

The interface to implement is

```python
# Transition exactly one timestep
#    Grid is a 2D array
def transition(old_state: Grid) -> Grid
```
