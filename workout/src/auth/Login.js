import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ login }) => {
    const history  = useNavigate()
    const [formData, setFormData] = useState({
        username: '', 
        password: ''
    })

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await login(formData)
        if (res.success) {
            history('/')
        } else {
            console.log(res.errors)
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value}))
    }

    return (
        <>
            <h2>Login Form</h2>

            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    name='username'
                    value={formData.username}
                    onChange={handleChange} 
                />

                <label>Password</label>
                <input 
                    name='password'
                    value={formData.password}
                    onChange={handleChange} 
                />

                <button type='submit' onSubmit={handleSubmit}>Login!</button>
            </form>
        </>
    )
}

export default Login