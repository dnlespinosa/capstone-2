\echo 'Delete and recreate workout db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE workout;
CREATE DATABASE workout;
\connect workout

\i workout-schema.sql
\i workout-seed.sql

\echo 'Delete and recreate workout_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE workout_test;
CREATE DATABASE workout_test;
\connect workout_test

\i workout-schema.sql
