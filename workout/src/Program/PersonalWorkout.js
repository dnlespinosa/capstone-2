import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import WorkoutApi from '../api/api';
import PersonalSingleWorkout from './PersonalSingleWorkout';
import UserContext from '../auth/UserContext';




const PersonalWorkout = ({ programs } ) => {
    const { name } = useParams()
    const history = useNavigate()
    const { hasSelectedWorkout, selectWorkout, currentUser, workout, setWorkout, exercises, setCurrentUser } = useContext(UserContext)
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

    // form data
    const [formData, setFormData] = useState()
    const [dataItem, setDataItem] = useState([])
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(formData => ({
            ...formData, 
            [name]: value
        }))
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await WorkoutApi.completeWorkout(currentUser.username, 0)
        setCurrentUser(res)
        setSelected(true)
        history('/')
    }

    const addData = (newData) => {
        setDataItem(dataItem => ([
            ...dataItem,
            newData
        ]))
    }


    return (
        <>
            {workout && exercises ? 
                <div>
                    
                        <h1 style={{color: 'white'}}>{workout.name}</h1>
                    
                        {exercises.map(exercise => (
                            <PersonalSingleWorkout key={exercise.exercise_name} exercise={exercise} setFormData={setFormData} addData={addData}/>
                        ))}
                    <form onSubmit={handleSubmit}>
                        <button disabled={selected} style={{ backgroundColor: '#aaaaaa', 
                                                            border: 'none',
                                                            color: 'white',
                                                            padding: '15px 32px',
                                                            textAlign: 'center',
                                                            textDecoration: 'none',
                                                            borderRadius: '5px',
                                                            display: 'inline-block',
                                                            fontSize: '16px'}}
                        >Complete workout</button>
                    </form>
                </div>
                : <h1 style={{color: 'white'}}>Loading</h1>    
            }
            
            

        </>
    )
}

export default PersonalWorkout