import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { useJwt, decodeToken } from 'react-jwt'
import useLocalStorage from './hooks/useLocalStorage';
import Navigation from './routes-nav/Navigation';
import Routess from './routes-nav/Routes';
import WorkoutApi from './api/api';
import UserContext from './auth/UserContext';
import { format, parse, startOfWeek, endOfWeek, addDays, addMonths, subMonths, startOfMonth, endOfMonth, isSameMonth, isSameDay, isToday } from 'date-fns';
export const token_storage_id = 'workout-token'

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY


function App() {
  const [exercises, setExercises] = useState()
  const [workout, setWorkout] = useState()
  const [workoutId, setWorkoutId] = useState(new Set([]))
  const [today, setToday] = useState()
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useLocalStorage(token_storage_id)
  const [programs, setPrograms] = useState(null)
  const [calendarWorkout, setCalendarWorkout] = useState([])

  // ****LOAD USER INFORMATION****
  useEffect(function loadUser() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = decodeToken(token);
          WorkoutApi.token = token;
          let currentUser = await WorkoutApi.getCurrentUser(username);
          setCurrentUser(currentUser)
        } catch (e) {
          console.log('loadUser', e)
          setCurrentUser(null)
        }
      }
    }
    getCurrentUser();
  }, [token])

  // ****LOAD EXERCISE DATA****
  useEffect(function getPremadeProgramsOnMount() {
    search();
  }, []);

  async function search() {
      let workouts = await WorkoutApi.getPrograms()
      setPrograms(workouts)
  }

  useEffect(function test(){
    async function testMessage(){
        if (workout){
            let exerciseDetails = []
            for (let exercise of workout.exercise_names) {
                const options = {
                    method: 'GET',
                    url: 'https://musclewiki.p.rapidapi.com/exercises',
                    params: {name: exercise},
                    headers: {
                    'X-RapidAPI-Key': SECRET_KEY,
                    'X-RapidAPI-Host': 'musclewiki.p.rapidapi.com'
                    }
                };
                
                await axios.request(options).then(function (response) {
                    exerciseDetails.push(response.data[0]);
                }).catch(function (error) {
                    console.error(error);
                });
            }
            setExercises(exerciseDetails)
        }
    }
    testMessage(workout)
  }, [workout])

  function hasSelectedWorkout(id) {
    return workoutId.has(id)
  }

  function selectWorkout(id) {
    if (hasSelectedWorkout(id)) return;
    WorkoutApi.selectProgram(currentUser.username, id);
    setWorkoutId(new Set([...workoutId, id]))
  }

  function todaysWorkout(exercise) {
    setToday(exercise)
  }
  
  // ****AUTH FUNCTIONS*****
  async function signup(signupData) {
    try {
      let token = await WorkoutApi.signup(signupData)
      setToken(token);
      return { success: true}
    } catch (e) {
      console.log('signup failed', e);
      return { success: false, e}
    }
  }

  async function login(loginData) {
    try {
      let token = await WorkoutApi.login(loginData);
      setToken(token)
      return { success: true};
    } catch (e) {
      console.error('login failed', e);
      return { success: false, e};
    }
  }

  function logout() {
    setCurrentUser(null)
    setToken(null);
  }


  // checking for currentDay workout
  useEffect(function getWorkoutForPage(){
    async function getWorkoutFor(){
        if (currentUser) {
              for (let i=0; i<currentUser.workouts.length; i++) {
                  let res = await WorkoutApi.getWorkoutById(currentUser.workouts[i].workout_id)
                  setCalendarWorkout( (workoutState) => {
                      return [...workoutState, res]
                  })
              }
          } 
      }
      getWorkoutFor()
    }, [currentUser])


    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    useEffect(function loadTodaysWorkout() {
      if (calendarWorkout) {
      const renderDays = () => {
        const dateFormat = 'dddd';
        const days = [];
    
        let startDate = startOfWeek(currentMonth);
        for (let i=0; i< 7; i++) {
            days.push(
                <div className='col col-center' key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            )
            return <div className='days row'>{days}</div>
        }
    }
      const renderCells = () => {
        const monthStart = startOfMonth(currentMonth)
        const monthEnd = endOfMonth(monthStart)
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
    
        const dateFormat = 'd';
        const rows = [];
    
        let days = [];
        let day = startDate;
        let formattedDate = "";
    
        
        while (day <= endDate) {
            for (let i=0; i<7; i++){
    
                let displayWorkout
                if (calendarWorkout.length > 1) {
                    for (let j=0; j<calendarWorkout.length; j++) {
                        if (calendarWorkout[j].day_of_month === i)
                            
                            displayWorkout = calendarWorkout[j].name
                    }
                } else {
                    if (calendarWorkout.day_of_month === i) {
                        displayWorkout = calendarWorkout.name
                    }
                }
    
                if (displayWorkout != undefined && isSameDay(day, selectedDate)) {
                    todaysWorkout(displayWorkout)
                }
    
    
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div className={`col cell ${!isSameMonth(day, monthStart)
                        ? 'disabled'
                        : isSameDay(day, selectedDate) ? 'selected' : ''}`}
                        key={day}
                        onClick={() => onDateClick(cloneDay)}>
                            <div>
                                <Link to={`/personal-workout/${displayWorkout}`}>
                                    <p id='displayedWorkout'>{displayWorkout}</p>
                                </Link> 
                                
                            </div>
                            <span className='number'>{formattedDate}</span>
                            {/* <span className='bg'>{formattedDate}</span> */}
                        </div>
                );
                day = addDays(day, 1)
            }
            rows.push(
                <div className='row' key={day}>
                    {days}
                </div>
            )
            days = [];
        }
        return <div className='body'>{rows}</div>
    }
    
      const onDateClick = (day) => {
          setSelectedDate(day)
      }
      const nextMonth = () => {
          setCurrentMonth(addMonths(currentMonth, 1))
      }
      const prevMonth= () => {
          setCurrentMonth(subMonths(currentMonth, 1))
      }
      
      renderCells()
    }
  }, [calendarWorkout])
  
  

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, hasSelectedWorkout, selectWorkout, todaysWorkout, workout, exercises, setWorkout }}>
        <div className="App">
          
          <Navigation currentUser={currentUser} logout={logout}/>
          <Routess login={login} signup={signup} currentUser={currentUser} programs={programs} today={today}/>
        </div>
        </UserContext.Provider> 
    </BrowserRouter>
  );
}

export default App;
