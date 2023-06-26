import React, { useEffect, useState } from 'react';

const SingleWorkout = ({ exercise }) => {

    return (
        <div>
            {exercise ? 
                <div className='SingleWorkout' style={{backgroundColor: 'white', border: '5px solid #2a2a2a', display: 'inline-block', color: '#2a2a2a', padding: '20px', margin: '10px 200px 10px 200px'}}>
                <div style={{display: 'inline-block'}}>
                    <h3>{exercise.exercise_name}</h3>
                    <p>Muscle Group: {exercise.target.Primary}</p>
                    <p>Instructions</p>
                    {exercise.steps.map(step => (
                        <li key={step}>{step}</li>
                    ))}
                </div>
                <video controls width="100%" style={{width: '50%', padding: '20px'}}>
                    <source src={exercise.videoURL[0]} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                </video>
            </div> : 
            <p style={{color: 'white'}}>Loading Exercise...</p>}
        </div>
        
    )
}

export default SingleWorkout