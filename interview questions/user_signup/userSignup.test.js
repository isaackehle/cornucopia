const chai = require('chai');
const { assert } = chai;

const userSignup = require('./userSignup');
const good_user = 'test_user';
const good_password = 'Password1!';

require('util').inspect.defaultOptions.depth = null;
chai.config.truncateThreshold = 0;

describe('userSignup', () => {
  // console.error('\n\nValidation failed:');
  // errors.forEach((e) => console.error(e));
  it('should return true when given valid username and password', () => {
    const payload = { username: good_user, password: good_password };
    assert.equal(userSignup(payload), true);
  });

  it('should return false when a non-object is passed in', () => {
    const payload = '';

    const errors = userSignup(payload);
    assert.notEqual(errors, false);
    assert.include(errors[0], 'Payload is not an object');
  });

  it('should return false no password is passed in', () => {
    const payload = { username: good_user };

    const errors = userSignup(payload);
    assert.notEqual(errors, false);
    assert.include(errors[0], 'Either username or password not supplied in payload');
  });

  it('should return false no username is passed in', () => {
    const payload = { password: good_password };

    const errors = userSignup(payload);
    assert.notEqual(errors, false);
    assert.include(errors[0], 'Either username or password not supplied in payload');
  });

  it('should return false with too short username', () => {
    const payload = { username: 's', password: good_password };

    const errors = userSignup(payload);
    assert.notEqual(errors, false);
    assert.include(errors[0], 'Username must be between 3 and 20 characters');
  });

  it('should return false with too long username', () => {
    const payload = { username: 'abcabcabcabcabcabcabcabcabcabcabcabc', password: good_password };

    const errors = userSignup(payload);
    assert.notEqual(errors, false);
    assert.include(errors[0], 'Username must be between 3 and 20 characters');
  });

  it('should return false with password no lower case', () => {
    const payload = { username: good_user, password: 'ZYXWVUTS1*' };

    const errors = userSignup(payload);
    assert.notEqual(errors, false);
    assert.include(errors[0], 'one lower case letter');
  });

  it('should return false with password no upper case', () => {
    const payload = { username: good_user, password: 'abcdefghij1*' };

    const errors = userSignup(payload);
    assert.notEqual(errors, false);
    assert.include(errors[0], 'one upper case letter');
  });

  it('should return false with password no numbers', () => {
    const payload = { username: good_user, password: 'abcdEFGH*' };

    const errors = userSignup(payload);
    assert.notEqual(errors, false);
    assert.include(errors[0], 'one number');
  });

  it('should return false with password no special characters', () => {
    const payload = { username: good_user, password: 'abcdEFGH92' };

    const errors = userSignup(payload);
    assert.notEqual(errors, false);
    assert.include(errors[0], 'special character');
  });

  it('should return false with a few errors', () => {
    const payload = { username: good_user, password: 'abcdefgh' };

    const errors = userSignup(payload);
    assert.notEqual(errors, false);
    assert.include(errors[0], 'upper case');
    assert.include(errors[1], 'number');
    assert.include(errors[2], 'special character');
  });

  it('should return false with username as part of password', () => {
    const payload = { username: good_user, password: `abC123@${good_user}` };

    const errors = userSignup(payload);
    assert.notEqual(errors, false);
    assert.include(errors[0], 'Password cannot include the username');
  });
});
