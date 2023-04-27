import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

const Homepage = ({ currentUser, today }) => {


    return (
        <>
            {currentUser ? 
                <div>
                    <h1>Welcome {currentUser.username}</h1>
                    <h2>Let's Take a look at what you've done</h2>
        
                    <div>
                        <h3>Completed Activities</h3>
                        <p>{currentUser.completed_workout} Workouts Completed</p>
                    </div>

                    {today ? 
                        <div>
                            <h3>Today's Activities</h3>
                            <Link to={`/personal-workout/${today}`}>
                                    <p >{today}</p>
                            </Link> 
                        </div> : <div></div>}
                </div> : 
                <div>
                    <h1>Welcome To The Workout App</h1>
                    <h2>Don't forget to login or signup!</h2>
                </div>  
                }
            
        </>
    )
}

export default Homepage