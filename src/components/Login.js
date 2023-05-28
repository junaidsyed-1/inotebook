import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const HOST1 = "https://inotebookbackend-y8kj.onrender.com"
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    let navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`${HOST1}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        // console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/')
        }
        else {
            alert('Invalid')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-5" >
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" onChange={onChange} value={credentials.email} id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} value={credentials.password} id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
