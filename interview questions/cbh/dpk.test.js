const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when the input is a boolean false", () => {
    const trivialKey = deterministicPartitionKey(false);
    expect(trivialKey).toBe("0");
  });

  it("Returns the exact partitionKey when a given partitionKey is submitted", () => {
    const testcase = { partitionKey: "123" };
    const expectedOutput = "123";
    const trivialKey = deterministicPartitionKey(testcase);
    expect(trivialKey).toBe(expectedOutput);
  });

  it("Returns the stringified partitionKey when a given partitionKey integer is submitted", () => {
    const testcase = { partitionKey: "999" };
    const expectedOutput = "999";
    const trivialKey = deterministicPartitionKey(testcase);
    expect(trivialKey).toBe(expectedOutput);
  });

  it("Returns the stringified partitionKey when a given partitionKey object is submitted", () => {
    const testcase = { partitionKey: { value: "something stringified" } };
    const expectedOutput = '{"value":"something stringified"}';
    const trivialKey = deterministicPartitionKey(testcase);
    expect(trivialKey).toBe(expectedOutput);
  });

  it("Returns a generated sha3-512 when the input is a string", () => {
    const testcase = "abc";
    const expectedOutput =
      "47070e8f45799540c361c6d92c2df5b2a54f25ff2a19bc8d2da1ef70ddcff117137baf4e206e56528e9eca14aea6a3ea24e4dfa942447d4a92dce09078f93128";
    const trivialKey = deterministicPartitionKey(testcase);
    expect(trivialKey).toBe(expectedOutput);
  });

  it("Returns a generated sha3-512 when the input is longer than max", () => {
    const testcase =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    const expectedOutput =
      "2e35087ae79260751fec8c2e5c335570f52dabbaf1271da9fa897f3a3dcfc8bfe9a8a812b1ef7767bc160a45100e5b193341caa991d7bee2420685f83b4cc04b";
    const trivialKey = deterministicPartitionKey(testcase);
    expect(trivialKey).toBe(expectedOutput);
  });
});
