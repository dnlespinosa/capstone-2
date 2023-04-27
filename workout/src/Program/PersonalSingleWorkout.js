import React, { useEffect, useState } from 'react';


const PersonalSingleWorkout = ({ exercise, setFormData, addData }) => {
    const INTIALSTATE = {
        name: exercise.exercise_name,
        sets:0, 
        reps: 0,
    }

    const [formData2, setFormData2] = useState(INTIALSTATE)
    const [selected, setSelected] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData2(formData2 => ({
            ...formData2, 
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData2)
        addData(formData2)
        setSelected(true)
        setFormData2(INTIALSTATE)
    }

    return (
        <div>
            {exercise ? 
                <div>
                <h3>{exercise.exercise_name}</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='sets'>Sets</label>
                    <input 
                        type='number'
                        id='sets'
                        name='sets'
                        onChange={handleChange}></input>
                    <label htmlFor='reps'>Reps</label>
                    <input 
                        type='number'
                        id='reps'
                        name='reps'
                        onChange={handleChange}></input>
                    <button disabled={selected}>Complete Exercise</button>
                </form>
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

export default PersonalSingleWorkout