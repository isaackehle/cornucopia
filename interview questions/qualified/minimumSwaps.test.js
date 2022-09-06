const chai = require("chai");
const { assert } = chai;
const minimumSwaps = require('./minimumSwaps')
require("util").inspect.defaultOptions.depth = null;
chai.config.truncateThreshold = 0;

describe("minimum swaps", () => {
  it("should handle single swap", () => {
    assert.equal(minimumSwaps([3, 1, 2]), 1);
  });

  it("should handle multiple swaps", () => {
    assert.equal(minimumSwaps([3, 1, 2, 4]), 2);
  });
});
