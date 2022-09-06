const chai = require("chai");
const { assert } = chai;
const markdownParser = require('./markdownParser')
require("util").inspect.defaultOptions.depth = null;
chai.config.truncateThreshold = 0;



describe("basic tests", () => {
  it("basic valid cases", () => {
    assert.equal(markdownParser("# header"), "<h1>header</h1>");
    assert.equal(markdownParser("## smaller header"), "<h2>smaller header</h2>");
  });

  it("basic invalid cases", () => {
    assert.equal(markdownParser("#Invalid"), "#Invalid");
    assert.equal(markdownParser("Behind # The Scenes"), "Behind # The Scenes");
  });

  it("edge cases", () => {
    assert.equal(markdownParser("### ### Double Triple Header"), "<h3>### Double Triple Header</h3>");
    assert.equal(markdownParser("  #### Space Jam"), "<h4>Space Jam</h4>");
  });
});
