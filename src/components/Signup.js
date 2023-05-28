import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const HOST1 = "https://inotebookbackend-y8kj.onrender.com"
    const [details, setDetails] = useState({ name: '', email: '', password: '' })
    let navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`${HOST1}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: details.name, email: details.email, password: details.password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authToken)
            navigate('/')
        }
        else {
            alert('Invalid Details')
        }
    }

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-5" >
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} value={details.name} name="name" id="name" aria-describedby="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={details.email} name="email" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={details.password} name="password" id="password" required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
