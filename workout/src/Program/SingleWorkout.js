import React, { useEffect, useState } from 'react';


const SingleWorkout = ({ exercise }) => {

    return (
        <div>
            {exercise ? 
                <div>
                <h3>{exercise.exercise_name}</h3>
                <p>Muscle Group: {exercise.target.Primary}</p>
                <p>Instructions</p>
                {exercise.steps.map(step => (
                    <li key={step}>{step}</li>
                ))}
                <video controls width="100%">
                    <source src={exercise.videoURL[0]} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                </video>
            </div> : 
            <p>Loading Exercise...</p>}
        </div>
        
    )
}

export default SingleWorkout