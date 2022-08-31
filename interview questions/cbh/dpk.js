const crypto = require("crypto");

// Move hard constants like this to the top of the file for readability
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const hash = (val) => crypto.createHash("sha3-512").update(val).digest("hex");

/**
 * Return the partitionKey from the input if the input is an object with that property.
 *
 * @param {*} event
 * @returns
 */
const pluckKey = (event) => {
  if (typeof event !== "object") return null;

  const key = event.partitionKey;
  return typeof key === "string" ? key : JSON.stringify(key);
};

/**
 * Return a hashed stringified version of the input.
 * @param {*} val
 * @returns
 */
const stringifiedEvent = (val) => hash(JSON.stringify(val));

/**
 * Return a hashed key if the key size is longer than max
 * @param {*} key
 * @returns
 */
const clipKey = (key) => (key.length > MAX_PARTITION_KEY_LENGTH ? hash(key) : key);

/**
 * The actual function
 *
 * @param {*} event
 * @returns
 */
exports.deterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;

  const key = pluckKey(event) || stringifiedEvent(event);

  return clipKey(key);
};
