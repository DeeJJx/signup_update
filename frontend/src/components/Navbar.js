import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Hamburger from './Hamburger';
import React, { useState } from "react";

const Navbar = () => {

    const {logout} = useLogout();
    const { user } = useAuthContext();
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () =>{
        setHamburgerOpen(!hamburgerOpen)
    }

    const handleClick = () => {
        logout();
    }
    return (
        <header className="navbar">
            <div className="logo">
                <p>Twenny</p>
            </div>
            <div className="navbar-links">
                <Link to="/home" className="home">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
                <Link to="/projects">Projects</Link>
            </div>
            <div className="contact-us">
                <Link to="/contactus">Contact Us</Link>    
            </div>
            <div className={`hamburger ${hamburgerOpen ? 'open' : ''}`} onClick={toggleHamburger}>
                <Hamburger />
            </div>
            {hamburgerOpen && (
                <div className="hamburger-links">
                <Link to="/home" className="home">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/contactus">Contact Us</Link>
                </div>
            )}
        </header>
    )
}

export default Navbar;
