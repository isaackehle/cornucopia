// Given an input string of characters, develop a method for encoding the string
// to indicate the run length of the string.  Characters can be alphanumeric, digits, or special characters.
// Format of the encoded string is arbitrary.

// encode:
//  aaaabbbbcccccaa -> 4a;4b;5c;2a
//  aaaaaaaaaaaa0000000000ccdddaaaaa -> 12a;100;2c;3d;5a;6;123

const DELIM = ";";

const encode = (inStr) => {
  const outArr = [];

  let ptr = 0;
  let lastChr = null;
  let chrCnt = 0;

  while (ptr < inStr.length) {
    const c = inStr[ptr];

    if (!lastChr || c != lastChr) {
      if (lastChr !== null) {
        outArr.push(`${chrCnt}${lastChr}`);
      }

      lastChr = c;
      chrCnt = 0;
    }

    chrCnt++;
    ptr++;
  }

  // last one
  outArr.push(`${chrCnt}${lastChr}`);

  return outArr.join(DELIM);
};

const getChunk = (str) => {
  if (!str) return null;

  const cPos = str.search(/[a-zA-A]/);
  const cnt = +str.substr(0, cPos);
  const c = str[cPos];
  const remainder = str.slice(cPos + 1);
  const out = { cnt, c, remainder };
  console.log({ out });
  return out;
};

const decode = (inStr) => {
  const arr = inStr.split(DELIM);

  const ret = arr.reduce((accum, tmp) => {
    const c = tmp[tmp.length - 1]; // null
    const cnt = tmp.substr(0, tmp.length - 1);
    const out = Array(+cnt).fill(c);

    // console.log({c, cnt, out});
    return `${accum}${out.join("")}`;
  }, "");

  return ret;
};

const encodeTestCases = [{ inStr: "aabbccdddaaaaa999909000", outStr: "2a;2b;2c;3d;5a;49;10;19;30" }];
const decodeTestCases = [{ inStr: "12a;100;2c;3d;5a;6;;123", outStr: "aaaaaaaaaaaa0000000000ccdddaaaaa333333333333" }];

for (const testCase of encodeTestCases) {
  const out = encode(testCase.inStr);
  console.log({ in: testCase.inStr, out, pass: out === testCase.outStr });
}

for (const testCase of decodeTestCases) {
  const out = decode(testCase.inStr);
  console.log({ in: testCase.inStr, out, pass: out === testCase.outStr });
}
