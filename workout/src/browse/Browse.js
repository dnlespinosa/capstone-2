import React, { useEffect, useState } from 'react';
import WorkoutApi from '../api/api';
import ProgramCard from '../Program/ProgramCard'
import axios from 'axios';

const Browse = ({ programs }) => {



    return (
        <>
            <div>
                <h1 style={{color: 'white'}}>BROWSE WORKOUTS</h1>
                {programs ? 
                
                    <div>
                        {programs.workouts.map(p => (
                            <ProgramCard 
                                key={p.name}
                                id={p.workout_id}
                                name={p.name}
                                exercises ={p.exercise_names} />

                        ))}
                    </div>
                 : <p>Sorry not results found</p>}
            </div>
        </>
    )
}

export default Browse