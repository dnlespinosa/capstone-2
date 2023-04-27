'use strict';

const db = require('../db.js')
const { BadRequestError, NotFoundErrory } = require('../expressError.js')
const Workout = require('./program.js')
const { 
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require('./_testCommon.js')

beforeAll(commonBeforeAll);
afterAll(commonAfterAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe('findAll', function() {
    test('works', async function () {
        let workouts = await Workout.findAll()
        expect(workouts).toEqual([
            {
                workout_id: 2, 
                name: 'Back and Biceps', 
                day_of_month: 1, 
                exercise_names: ['Barbell Pronated Row', 'Chin Ups', 'Machine Pulldown', 'Dumbbell Curl']
            },
            {
                workout_id: 3, 
                name: 'Chest and Triceps', 
                day_of_month: 4, 
                exercise_names: ['Barbell Bench Press', 'Dumbbell Alternating Single Arm Press', 'Cable Pec Fly', 'Cable Overhead Tricep Extension', 'Push Up']
            },
            {
                workout_id: 4, 
                name: 'Legs', 
                day_of_month: 3, 
                exercise_names: ['Barbell Heels Up Back Squat', 'Barbell Stiff Leg Deadlift', 'Dumbbell Reverse Lunge', 'Barbell Hip Thrust']
            }
        ])
    })
})
