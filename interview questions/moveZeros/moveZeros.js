// Given an array of numbers, move all zeros to the end of the array
// The order of the non-zero elements of the array does not have to be preserved
// The solution should be linear time and constant space

const moveZeros = (arr) => {
  let start = 0;
  let last = arr.length - 1;
  //   console.log({ arr, start, last });

  while (start < last) {
    console.log({ eh: 1, start, last, arr: arr.join(","), tmp: arr[start] });
    if (arr[start] == 0) {
      while (arr[last] == 0) last--;

      if (last > start) {
        arr[start] = arr[last];
        arr[last] = 0;
        console.log({ chg: 1, start, last, arr: arr.join(",") });
      }
    }
    console.log({ start, last, arr: arr.join(",") });
    start++;
  }

  return arr;
};

/*** Just the test logs here. ***/
const tests = [
  [1, 2, 0, 3, 0, 1, 2],
  [1, 2, 0, 0, 0, 1, 0],
  [0, 2, 0, 3, 0, 1, 2],
  [1, 2, 3, 1, 2],
  [0, 0, 0, 1],
];
console.table(tests.map(moveZeros));
