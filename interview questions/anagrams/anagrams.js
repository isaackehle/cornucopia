/**
 *
 * for each word:
 *   sort letters
 *   count letters
 *   build hash (json -> hashcode)
 *   store in Map( hash, [words] )
 *
 *   star:  { a: 1, r: 1, s: 1, t: 1} -> hashcode (str). a1r1s1t1
 *
 */

const toHash = (obj) => {
  return Object.keys(obj)
    .sort()
    .reduce((accum, key) => `${accum}${key}${obj[key]}`, "");
};

const toObj = (str) => {
  return str
    .split("")
    .sort()
    .reduce((accum, chr) => {
      accum[chr] = accum[chr] === undefined ? 1 : accum[chr] + 1;
      return accum;
    }, {});
};

const wordMap = new Map();

const in1 = ["star", "rats", "ever", "veer", "apple"];

for (const x of in1) {
  const y = toObj(x);
  const hash = toHash(y);

  if (!wordMap.has(hash)) {
    wordMap.set(hash, [x]);
  } else {
    wordMap.set(hash, wordMap.get(hash).concat(x));
  }
}

console.log({ wordMap });
