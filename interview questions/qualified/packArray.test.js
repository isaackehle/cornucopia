const chai = require("chai");
const { assert } = chai;
const packArray = require('./packArray')
require("util").inspect.defaultOptions.depth = null;
chai.config.truncateThreshold = 0;

describe("pack array", () => {
  it("should handle single swap", () => {
    assert.equal(packArray([1, 2, 3, 4, 5, 6, 7, 8]), 186);
  });
});
