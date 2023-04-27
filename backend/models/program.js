"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
} = require("../expressError");

class Workout {

    static async findAll() {
        const result = await db.query(
              `SELECT workout_id, name, day_of_month, exercise_names
               FROM workouts`,
        );
    
        return result.rows;
      }
    
      static async find(name) {
        const result  = await db.query(
          `SELECT workout_id, name, day_of_month, exercise_names FROM workouts WHERE name=$1`, [name]
        );

        return result.rows[0]
      }


      static async getByid(id) {
        const workoutRes = await db.query(
            `SELECT workout_id, name, day_of_month FROM workouts WHERE workout_id=$1`, [id]
        )
        const workout = workoutRes.rows[0]

        if (!workout) throw new NotFoundError(`No workout at: ${id}`)

        return workout
      }

}

module.exports = Workout;

