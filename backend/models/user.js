"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");


class User {

  static async authenticate(username, password) {
    const result = await db.query(
          `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  static async register(
      { username, password, firstName, lastName, email }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    
    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            completed_workout,
            email)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
        [
          username,
          hashedPassword,
          firstName,
          lastName,
          0,
          email
        ],
    );

    const user = result.rows[0];

    return user;
  }

  static async findAll() {
    const result = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  completed_workout,
                  email
           FROM users
           ORDER BY username`,
    );

    return result.rows;
  }


  static async get(username) {
    const userRes = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  completed_workout,
                  email
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    const userWorkouts = await db.query(
      `SELECT workout_id FROM workout_program WHERE username=$1`, [username]
    )
    
    if (userWorkouts) {
      user.workouts = userWorkouts.rows
    }
    
    return user;
  }

  static async updateWorkout(username) {
      const userRes = await db.query(
        `SELECT completed_workout FROM users WHERE username = $1`,
      [username],
      );

      const newValue = userRes.rows[0].completed_workout + 1;

      const res = await db.query(`UPDATE users SET completed_workout=$1 WHERE username=$2 RETURNING user_id,username,
          first_name AS "firstName",
          last_name AS "lastName",
          completed_workout,
          email`, [newValue, username])
      const user = res.rows[0];
      if (!user) throw new NotFoundError(`No user: ${username}`);

      const userWorkouts = await db.query(
        `SELECT workout_id FROM workout_program WHERE username=$1`, [username]
      )
      
      if (userWorkouts) {
        user.workouts = userWorkouts.rows
      }

      return user;
    }
}


module.exports = User;
