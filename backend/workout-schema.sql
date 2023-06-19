CREATE TABLE users (
    user_id SERIAL,
    username VARCHAR(25) PRIMARY KEY , 
    password TEXT NOT NULL, 
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL, 
    completed_workout INT DEFAULT 0,
    email TEXT NOT NULL CHECK(position('@' IN email) > 1)
);

CREATE TABLE workouts (
    workout_id SERIAL PRIMARY KEY,
    name TEXT,
    day_of_month INT, 
    exercise_names TEXT ARRAY
);

CREATE TABLE workout_program (
    username VARCHAR(25)
        REFERENCES users ON DELETE CASCADE, 
    workout_id INT 
        REFERENCES workouts
);



