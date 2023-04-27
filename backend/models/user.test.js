"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('register', function () {
  const newUser = {
    username: 'new', 
    firstName: 'test', 
    lastName: 'tester', 
    email: 'test@test.com'
  }

  test('works', async function() {
    let user = await User.register({...newUser, password:'harhar'})
    expect(user).toEqual(newUser)
  })
})