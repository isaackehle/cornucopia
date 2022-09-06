const arrayMaxIndex = (array) => array.indexOf(Math.max.apply(null, array));
const arrayMinIndex = (array) => array.indexOf(Math.min.apply(null, array));

const doSwap = (ratings, x, y) => {
  const tmp = ratings[x];
  ratings[x] = ratings[y];
  ratings[y] = tmp;
};

const minimumSwaps = (ratings) => {
  let ptr = ratings.length - 1;

  let swapCnt = 0;

  while (ptr > 0) {
    const x = ratings[ptr];
    const y = ratings[ptr - 1];

    if (x > y) {
      // Need to swap.  Find minimum rating on the left side of the array
      let iMin = arrayMinIndex(ratings.slice(0, ptr - 1));
      //       console.log(`test swap: ptr: ${ptr} x: ${x} y: ${y}, iMin: ${iMin}`)

      doSwap(ratings, iMin, ptr);
      ++swapCnt;
    }

    --ptr;
  }

  //   console.log({ratings, swapCnt})

  return swapCnt;
};

module.exports = minimumSwaps