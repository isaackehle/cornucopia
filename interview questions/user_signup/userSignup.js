const { validate } = require('./validations');

// ---- Validation Functions ----
function userSignup(payload) {
  const errors = validate(payload);

  // If no errors came out of the above validations, then return true as per spec.
  if (errors.length === 0) return true;

  // At least one error was generated, therefore dump out all errors.
  return errors;
}

module.exports = userSignup;
