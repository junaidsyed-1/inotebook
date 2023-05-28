import React from 'react'
import Proptypes from 'prop-types'
import { Link, useLocation, useNavigate } from 'react-router-dom'


export default function Navbar(props) {
    let navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    let location = useLocation();

    return (
        <nav className={`navbar navbar-expand-lg bg-${props.mode}`} data-bs-theme={`${props.mode}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{props.title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">{props.homePage}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">{props.aboutPage}</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? (<form className="d-flex"> <Link to="/login" className="btn btn-outline-info mx-1" role="button">Login</Link>
                        <Link to="/signup" className="btn btn-info mx-1" role="button"> Sign Up</Link></form>) : (
                        <button className="btn btn-outline-info" onClick={handleLogout}>Logout</button>
                    )}

                </div>
            </div >
        </nav >
    )
}

Navbar.prototype = {
    title: Proptypes.string.isRequired,
    homePage: Proptypes.string.isRequired,
    aboutPage: Proptypes.string.isRequired
}

Navbar.defaultProps = {
    title: 'Text Utils Web',
    homePage: 'Enter Home Page',
    aboutPage: 'Enter About Page'
}