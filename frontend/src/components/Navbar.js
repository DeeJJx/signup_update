import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logoImage from '../images/LogoMakr-8w9wRe.png'

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const hamburgerRef = useRef(null);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        setHamburgerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/"> 
         <img src={logoImage} alt="logo" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="home">
          Home
        </Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/templates">Templates</Link>
      </div>
      <div className="login">
      {user ? <button onClick={handleLogout}>Logout</button> : <div><Link to="/login">Log in</Link><br></br><Link to="/signup">Sign Up</Link></div> }
      </div>
      <div className={`hamburger ${hamburgerOpen ? 'open' : ''}`} ref={hamburgerRef} onClick={toggleHamburger}>
        <FontAwesomeIcon icon={hamburgerOpen ? faTimes : faBars} />
      </div>
      {hamburgerOpen && (
        <div className="hamburger-links">
          <Link to="/home" className="home">
            Home
          </Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          {user ? <button onClick={handleLogout}>Logout</button> : <Link to="/login">Sign up / Log in</Link> }
        </div>
      )}
      <div className="nav-line"></div>
    </header>
  );
};

export default Navbar;
