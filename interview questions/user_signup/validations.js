const { isLowerCase, isUpperCase, isDigit, isSpecial } = require('./utils');
const { MIN_PASSWORD_LEN, MIN_USERNAME_LEN, MAX_USERNAME_LEN, SPECIALS } = require('./constants');

const validateUsernameLength = (str) => {
  if (str.length < MIN_USERNAME_LEN || str.length > MAX_USERNAME_LEN) {
    return `Username must be between ${MIN_USERNAME_LEN} and ${MAX_USERNAME_LEN} characters`;
  }
};

const validatePasswordLength = (str) => {
  if (str.length < MIN_PASSWORD_LEN) {
    return `Password must be greater or equal to ${MIN_USERNAME_LEN} characters`;
  }
};

const validatePasswordLowerCase = (str) => {
  if (!str.split('').some((x) => isLowerCase(x))) {
    return `Password must contain at least one lower case letter`;
  }
};

const validatePasswordUpperCase = (str) => {
  if (!str.split('').some((x) => isUpperCase(x))) {
    return `Password must contain at least one upper case letter`;
  }
};

const validatePasswordNumber = (str) => {
  if (!str.split('').some((x) => isDigit(x))) {
    return `Password must contain at least one number`;
  }
};

const validatePasswordSpecial = (str) => {
  if (!str.split('').some((x) => isSpecial(x))) {
    return `Password must contain at least one special character in this set: ${SPECIALS.join(',')}`;
  }
};

const validateUsernameNotInPassword = (u, p) => {
  if (p.toLowerCase().includes(u.toLowerCase())) {
    return `Password cannot include the username`;
  }
};

const validate = (payload) => {
  if (!payload) return ['Payload is not an object'];

  // User Name must contain at least 3 characters
  const { username, password } = payload;

  if (!username || !password) return ['Either username or password not supplied in payload'];

  return (errors = [
    validateUsernameLength(username),
    validatePasswordLength(password),
    validatePasswordLowerCase(password),
    validatePasswordUpperCase(password),
    validatePasswordNumber(password),
    validatePasswordSpecial(password),
    validateUsernameNotInPassword(username, password),
  ].filter((x) => !!x));
};

module.exports = { validate };
