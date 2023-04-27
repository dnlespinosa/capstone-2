import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navigation = ({ currentUser, logout }) => {

    return (
        <>
            <ul>
                <li>
                    <NavLink to='/'>
                        Home
                    </NavLink>
                </li>

                {!currentUser ? 
                    <div>
                        <li>
                            <NavLink to='/login'>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/signup'>
                                Signup
                            </NavLink>
                        </li>                       
                        </div>:
                        <div>
                            <li>
                                <NavLink to='/browse'>
                                    Browse Programs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/your-program'>
                                    Your Program
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/' onClick={logout}>
                                    Logout
                                </NavLink>
                            </li>
                        </div>
                        }
                
                
                
            </ul>
        </>
    )
}

export default Navigation