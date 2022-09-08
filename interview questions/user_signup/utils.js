const { SPECIALS } = require('./constants');

// ---- Helper Functions ----
// returns true if c is an upper case character, false otherwise
function isUpperCase(c) {
  return c !== c.toLowerCase();
}
// returns true if c is a lower case character, false otherwise
function isLowerCase(c) {
  return c !== c.toUpperCase();
}
// returns true if c is a number, false otherwise
function isDigit(c) {
  return c >= '0' && c <= '9';
}

// returns true if c is a special character, false otherwise
function isSpecial(c) {
  return SPECIALS.includes(c);
}

module.exports = { isUpperCase, isLowerCase, isDigit, isSpecial };
