// Write a function that takes an array of arrays and a function as inputs.
// Sub-arrays are of the same size

const numberArrayModify = (arr, { fn, start }) => {
  const out = [];

  while (arr[0].length > 0) {
    const result = arr.reduce((accum, inner) => {
      return fn(accum, inner.shift());
    }, start);

    out.push(result);
  }

  return out;
};

const sumFn = { fn: (a, b) => a + b, start: 0 };
const multFn = { fn: (a, b) => a * b, start: 1 };

console.log(
  numberArrayModify(
    [
      [1, 2, 3],
      [10, 20, 30],
      [100, 200, 300],
    ],
    sumFn
  )
); //[111, 222, 333]

console.log(
  numberArrayModify(
    [
      [1, 2, 3],
      [10, 20, 30],
      [100, 200, 300],
    ],
    multFn
  )
); //[1000, 8000, 27000]
