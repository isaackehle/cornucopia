const toPairs = (integers) => {
  const out = [];

  for (let i = 0; i < integers.length; i += 2) {
    out.push(integers.slice(i, i + 2));
  }

  return out;
};

const pairSum = (entries) => entries.map((x) => x[0] + x[1]);
const pairMult = (entries) => entries.map((x) => x[0] * x[1]);

const doIteration = (integers, doMult) => {
  const entries = toPairs(integers);
  const out = doMult ? pairMult(entries) : pairSum(entries);
  //   console.log({out})
  return out;
};

const packArray = (integers) => {
  // normally wouldn't do this in production, and instead would have checks to
  // ensure this isn't an endless loop.  But, it's good enough for this.
  let itCnt = 0;

  // Slice the integers to prime out so as to not destroy the input.
  // This would be a memory consideration.
  let out = integers.slice();
  while (out.length > 1) {
    const doMult = itCnt % 2 == 1;
    out = doIteration(out, doMult);
    // console.log({ out, len: out.length });
    ++itCnt;
    //     if (++itCnt > 2) break;
  }

  return out[0];
};

module.exports = packArray