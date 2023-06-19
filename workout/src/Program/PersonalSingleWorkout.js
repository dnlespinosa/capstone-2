import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select'


const PersonalSingleWorkout = ({ exercise, setFormData, addData }) => {
    const INTIALSTATE = {
        name: exercise.exercise_name,
        sets:0, 
        reps: 0,
    }

    const myRef = useRef(null)

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
        
        myRef.current.nextSibling.scrollIntoView()

        addData(formData2)
        setSelected(true)
        setFormData2(INTIALSTATE)
    }

    return (
        <div id={exercise.exercise_name} ref={myRef}>
            {exercise ? 
                <div style={{backgroundColor: 'white', border: '5px solid #2a2a2a', display: 'inline-block', color: '#2a2a2a', padding: '20px', margin: '10px 200px 10px 200px'}}  >
                    <div >
                        <h3>{exercise.exercise_name}</h3>
                        <form onSubmit={handleSubmit} >
                            <label htmlFor='sets' style={{margin: '5px'}}>Sets</label>
                            <input 
                                type='number'
                                id='sets'
                                name='sets'
                                onChange={handleChange} style={{margin: '5px 20px 5px 0px'}}></input>
                            <label htmlFor='reps' style={{margin: '5px'}}>Reps</label>
                            <input 
                                type='number'
                                id='reps'
                                name='reps'
                                onChange={handleChange} style={{margin: '5px 20px 5px 0px'}}></input>
                            <button disabled={selected}>Complete Exercise</button>
                        </form>
                        <p>Muscle Group: {exercise.target.Primary}</p>
                        <p>Instructions</p>
                        <div style={{display: 'block', margin: '10px', padding: '10px', textAlign: 'center'}}>
                            
                            {exercise.steps.map(step => (
                                <li key={step}>{step}</li>
                            ))}

                            <video controls width="50%" style={{padding: '20px'}}>
                            <source src={exercise.videoURL[0]} type="video/mp4" />
                            Sorry, your browser doesn't support embedded videos.
                            </video>
                        </div>
                        
                        
                    </div>
            </div> : 
            <p style={{color: 'white'}}>Loading Exercise...</p>}
        </div>
        
    )
}

export default PersonalSingleWorkout