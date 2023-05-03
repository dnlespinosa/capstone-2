import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css'

const Navigation = ({ currentUser, logout }) => {

    return (
        <>
        <div className='Navigation'>
            <div style={{display: 'inline-flex', margin: '0 10px'}}>
            <h1 className='Headline'>TrainTime</h1>
            <ul >
                    <li className='list-item' >
                        <NavLink to='/' className='list-item'>
                            Home
                        </NavLink>
                    </li>

                {!currentUser ? 
                    <div >
                        <li className='list-item'>
                            <NavLink to='/login'>
                                Login
                            </NavLink>
                        </li>
                        <li className='list-item'>
                            <NavLink to='/signup'>
                                Signup
                            </NavLink>
                        </li>                       
                        </div>:
                        <div>
                            <li className='list-item'>
                                <NavLink to='/browse'>
                                    Browse Programs
                                </NavLink>
                            </li>
                            <li className='list-item'>
                                <NavLink to='/your-program'>
                                    Your Program
                                </NavLink>
                            </li>
                            <li className='list-item'>
                                <NavLink to='/' onClick={logout}>
                                    Logout
                                </NavLink>
                            </li>
                        </div>
                        }
                
                
                
            </ul>
            </div>
        </div>
        </>
    )
}

export default Navigation