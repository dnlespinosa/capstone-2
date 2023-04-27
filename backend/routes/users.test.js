"use strict"

const request = require('supertest')

const db = require('../db.js')
const app = require('../app')
const User = require('../models/user')

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token
} = require('./_testCommon')

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll)

describe('GET /users', function () {
    test('displays all users', async function () {
        const resp = await request(app).get('/users');
        expect(resp.body).toEqual({
            users: [
                {
                    username: 'u1', 
                    firstName: 'U1F', 
                    lastName: 'U1L',
                    completed_workout: 0,
                    email: 'user1@user.com',
                },
                {
                    username: 'u2', 
                    firstName: 'U2F', 
                    lastName: 'U2L',
                    completed_workout: 0, 
                    email: 'user2@user.com',
                },
            ]
        });
    })
});