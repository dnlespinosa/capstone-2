import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const Homepage = ({ currentUser, today }) => {


    return (
        <>
            
            {currentUser ? 
                <div id='Homepage' style={{color: 'white'}}>
                    <h1>WELCOME {currentUser.username}</h1>
                    <h2>LETS TAKE A LOOK AT WHAT YOU'VE DONE</h2>
        
                    <div id='completed-activies' style={{backgroundColor: 'white', border: '5px solid #2a2a2a', display: 'inline-block', color: '#2a2a2a', padding: '20px', margin: '10px 100px 10px 10px'}}>
                        <h3>COMPLETED ACTIVITIES</h3>
                        <p>{currentUser.completed_workout} WORKOUTS COMPLETED</p>
                    </div>

                    {today ? 
                        <div style={{backgroundColor: 'white', border: '5px solid #2a2a2a', display: 'inline-block', color: '#2a2a2a',padding: '20px', margin: '10px 100px 10px 10px'}}>
                            <h3>TODAY'S ACTIVITIES</h3>
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