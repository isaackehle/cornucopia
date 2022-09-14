export enum AliveState {
  ALIVE = '+',
  DEAD = '.',
}

export interface Pos {
  r: number;
  c: number;
}

export class Cell {
  state: AliveState = AliveState.DEAD;
  constructor(public isAlive = false) {
    this.state = this.isAlive ? AliveState.ALIVE : AliveState.DEAD;
  }
}

export class Row {
  cells: Cell[];

  constructor(public state: string) {
    this.cells = state.split('').map((x) => {
      return new Cell((x as AliveState) === AliveState.ALIVE);
    });
  }

  getCell = (c: number) => (c <= this.cells.length ? this.cells[c] : null);
}

/**
 * input state is an array of strings of the same length, with the array size being the same length as the length of a string (ie a grid)
 */
export class Grid {
  size = 0;
  rows: Row[] = [];

  constructor(state: string[]) {
    this.rows = state.map((row) => new Row(row));
    this.size = this.rows.length;
  }

  getRow = (r: number): Row | null => (r <= this.rows.length ? this.rows[r] : null);

  getCell = (r: number, c: number): Cell | null => {
    const row = this.getRow(r);
    return row ? row.getCell(c) : null;
  };

  getNeighborIndexes = (pos: Pos): Pos[] => {
    const rows = [pos.r - 1, pos.r, pos.r + 1];
    const cols = [pos.c - 1, pos.c, pos.c + 1];

    return rows.reduce((a1, r: number) => {
      return a1.concat(
        ...cols.reduce((a2, c) => {
          // outside of the grid
          if (r < 0 || c < 0 || r >= this.size || c >= this.size) return a2;

          // the input position
          if (r == pos.r && c == pos.c) return a2;

          // return the neighbor
          const p: Pos = { r, c };
          return a2.concat(p);
        }, [] as Pos[]),
      );
    }, [] as Pos[]);
  };

  getNeighbors = (pos: Pos): Cell[] => {
    const indexes = this.getNeighborIndexes(pos);

    return indexes.reduce((accum, pos) => {
      const cell = this.getCell(pos.r, pos.c);
      return cell ? accum.concat(cell) : accum;
    }, [] as Cell[]);
  };

  getAliveNeighborCount = (pos: Pos): number => {
    const neighbors = this.getNeighbors(pos);
    return neighbors.reduce((sum, cell) => sum + (cell.isAlive ? 1 : 0), 0);
  };

  printState = () => {
    this.rows.forEach((row, r) =>
      row.cells.forEach((cell, c) => {
        console.log({ r, c, isAlive: cell.isAlive });
      }),
    );
  };

  print = () => {
    const strs = this.rows.map((row) => {
      const rowStr: string[] = row.cells.map((cell) => {
        return cell.state;
      });
      return rowStr.join('');
    });

    console.log(strs.join('\n') + '\n');
  };

  state = () => {
    const strs = this.rows.map((row) => {
      const rowStr: string[] = row.cells.map((cell) => {
        return cell.state;
      });
      return rowStr.join('');
    });

    return strs;
  };
}
