import React, { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../homepages/Homepage';
import Browse from '../browse/Browse';
import Program from '../Program/Program';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Workout from '../Program/Workout';
import PersonalWorkout from '../Program/PersonalWorkout';

const Routess = ({ login, signup, currentUser, programs, today }) => {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<Homepage currentUser={currentUser} today={today}/>}/>
                <Route exact path='/login' element={<Login login={login}/>}/>
                <Route exact path='/signup' element={<Signup  signup={signup}/>}/>
                <Route exact path='/browse' element={<Browse programs={programs}/>}/>
                <Route exact path='/browse/:name' element={<Workout programs={programs} />}/>
                <Route exact path='/your-program' element={<Program />}/>
                <Route exact path='/personal-workout/:name' element={<PersonalWorkout />} />
                
            </Routes>
        </div>
    )
}

export default Routess