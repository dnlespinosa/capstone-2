Title: TrainTime workout app - Link - 

Features: Login/Logout - user information is saved to database. Browse Programs - we have pre-programmed workouts in the database that appear on the page. Users can select one of these and have them added to the user's calendar. Your Program - a calendar that is linked to the user which will take a look at the workout_id's saved to the user's profile and display the appropriate workout on the appropriate day of the week. 

Tests: The backend folder and workout (frontend) folder both contain tests on almost every component/file. To run tests on the backend "jest test". To run tests on the front end "npm test"

User Flow: First and foremost, a user needs to create an account. After they user creates their account, they are redirected to the home page where they can view how many workouts they've completed and follow a link for any workout scheduled for that day. They can select from pre programmed workouts that users can select and add to their calendars. From the calendar, they can select the workout they wish to complete. On the personal workout page, there is a detailed instruction of how to perform each exercise with a demonstration video. Users can log their sets and reps completed. After the user completes the workout, they will have an updated workouts completed tab

API - Built my own API for storing user login data and prebuilt programs. Also used https://rapidapi.com/rahulbanerjee26/api/musclewiki/ for Exercise information/videos

Technology Stack - React on the Front End/NodeJS on the Back End




