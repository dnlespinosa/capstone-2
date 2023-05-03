import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import WorkoutApi from '../api/api';
import SingleWorkout from './SingleWorkout';
import UserContext from '../auth/UserContext';




const Workout = ({ programs } ) => {
    const { name } = useParams()
    // const [workout, setWorkout] = useState(null)
    // const [exercises, setExercises] = useState(null)
    const history = useNavigate()
    const { hasSelectedWorkout, selectWorkout, workout, exercises, setWorkout } = useContext(UserContext)
    const [selected, setSelected] = useState();
    
    useEffect(function getWorkoutForPage(){
        async function getWorkoutFor(){
            setWorkout(await WorkoutApi.getWorkout(name))

        }
        getWorkoutFor()
    }, [])


    React.useEffect(function updateSelected() {
        if (workout) {
            setSelected(hasSelectedWorkout(workout.workout_id))
        }
        
    }, [workout, hasSelectedWorkout])

    async function handleSelect(evt) {
        if (hasSelectedWorkout(workout.workout_id)) return;
        selectWorkout(workout.workout_id)
        setSelected(true)
        history('/')
    }


    return (
        <>
            {workout && exercises ? 
                <div style={{color: 'white'}}>
                    <h1>{workout.name}</h1>
                    <button onClick={handleSelect} disabled={selected}>{selected ? 'Selected' : 'Select Program'}</button>
                    {exercises.map(exercise => (
                        <SingleWorkout exercise={exercise}/>
                    ))}
                </div>
                : <h1 style={{color: 'white'}}>Loading</h1>    
            }
            
            

        </>
    )
}

export default Workout