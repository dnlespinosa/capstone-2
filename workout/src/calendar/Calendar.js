import React, { useContext, useState, useEffect, useRef } from 'react';
import { format, parse, startOfWeek, endOfWeek, addDays, addMonths, subMonths, startOfMonth, endOfMonth, isSameMonth, isSameDay, isToday } from 'date-fns';
import './Calendar.css';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import WorkoutApi from '../api/api';
import Workout from '../Program/Workout';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isWorkout, setIsWorkout] = useState(false)
    const [workout, setWorkout] = useState([])

    const { currentUser, todaysWorkout } = useContext(UserContext)

    const myRef = useRef(null)

    useEffect(function getWorkoutForPage(){
        async function getWorkoutFor(){
            if (currentUser.workouts) {
                for (let i=0; i<currentUser.workouts.length; i++) {
                    let res = await WorkoutApi.getWorkoutById(currentUser.workouts[i].workout_id)
                    setWorkout( (workoutState) => {
                        return [...workoutState, res]
                    })
                }
             } else {
                console.log('loading?')
             }
        }
        getWorkoutFor()
    }, [])

    console.log(currentUser)

    

    const renderHeader = () => {
        const dateFormat = 'MMMM YYYYY';

        return (
            <div className ='header row flex-middle'>
                <div className='col col-start'>
                    <div className='icon' onClick={prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className='col col-center'>
                    <span>
                        {format(currentMonth, dateFormat)}
                    </span>
                </div>
                <div className='col col-end' onClick={nextMonth}>
                    <div className='icon'>chevron_right</div>
                </div>
            </div>
        )
    };

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
                if (workout.length > 1) {
                    for (let j=0; j<workout.length; j++) {
                        if (workout[j].day_of_month === i)
                            
                            displayWorkout = workout[j].name
                    }
                } else {
                    if (workout.day_of_month === i) {
                        displayWorkout = workout.name
                    }
                }

                // if (displayWorkout != undefined && isSameDay(day, selectedDate)) {
                //     todaysWorkout(displayWorkout)
                // }


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


    return (
        <>
            
            <div className='calendar'>
                {renderHeader()}
                {renderDays()}
                {renderCells()}
            </div>
            
        </>
    )
}

export default Calendar