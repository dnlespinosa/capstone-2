import React, { useEffect, useState } from 'react';
import WorkoutApi from '../api/api';
import ProgramCard from '../Program/ProgramCard'
import axios from 'axios';

const Browse = ({ programs }) => {
    // const options = {
    //     method: 'GET',
    //     url: 'https://musclewiki.p.rapidapi.com/exercises',
    //     params: {force: 'push'},
    //     headers: {
    //       'X-RapidAPI-Key': '1f4b3e251bmshb1df2538c036ddfp1c6675jsn19129a6f9614',
    //       'X-RapidAPI-Host': 'musclewiki.p.rapidapi.com'
    //     }
    //   };
      
    //   axios.request(options).then(function (response) {
    //       console.log(response.data);
    //   }).catch(function (error) {
    //       console.error(error);
    //   });



    return (
        <>
            <div>
                <h1>The Browsing Page</h1>
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