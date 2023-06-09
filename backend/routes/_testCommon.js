"use strict";

const db = require('../db.js')
const User = require('../models/user')
const { createToken } = require('../helpers/token')

async function commonBeforeAll() {
    await db.query('DELETE FROM users');
    
    await User.register({
        username: 'u1', 
        firstName: 'U1F', 
        lastName: 'U1L',
        completed_workout: 0,
        email: 'user1@user.com', 
        password: 'password1'
    });
    await User.register({
        username: 'u2', 
        firstName: 'U2F', 
        lastName: 'U2L',
        completed_workout: 0, 
        email: 'user2@user.com', 
        password: 'password2'
    })
}

async function commonBeforeEach() {
    await db.query('BEGIN');
}

async function commonAfterEach() {
    await db.query('ROLLBACK')
}

async function commonAfterAll() {
    await db.end();
}

// const u1Token = createToken({ username: 'u1'})

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach, 
    commonAfterAll, 
    // u1Token
}
