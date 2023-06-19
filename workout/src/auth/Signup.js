import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ signup }) => {
    const history  = useNavigate()
    const [formData, setFormData] = useState({
        username: '', 
        password: '',
        firstName: '', 
        lastName: '',
        email: ''
    })

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await signup(formData)
        if (res.success) {
            history('/your-program')
        } else {
            console.log(res.errors)
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value}))
    }

    return (
        <>
            <div style={{color: 'white'}}>
            <h2>Signup Form</h2>

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

                <label>First Name</label>
                <input 
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange} 
                />

                <label>Last Name</label>
                <input 
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange} 
                />

                <label>Email</label>
                <input 
                    name='email'
                    value={formData.email}
                    onChange={handleChange} 
                />

                <button type='submit' onSubmit={handleSubmit}>Sign Up!</button>
            </form>
            </div>
        </>
    )
}

export default Signup