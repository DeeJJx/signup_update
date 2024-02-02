import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hamburgerRef.current && 
          !hamburgerRef.current.contains(event.target) &&
          !event.target.closest('.hamburger-links')) {
        setHamburgerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hamburgerRef, setHamburgerOpen]);

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/"> 
         <img src={logoImage} alt="logo" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          Home
        </Link>
        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
          About
        </Link>
        {/* <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>
          Services
        </Link>
        <Link to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}>
          Projects
        </Link> */}
        <Link to="/templates" className={`nav-link ${location.pathname === '/templates' ? 'active' : ''}`}>
          Templates
        </Link>
        {user ? <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link> : ''}
      </div>
      <div className='login-container'>
      {user ? <div  className="login"><button onClick={handleLogout}>Logout</button></div> : <div className="login"><Link to="/login">Log in</Link></div> }
      {user ? '' : <div className='login signup'><Link to="/signup">Sign Up</Link></div> }
      </div>
      <div className={`hamburger ${hamburgerOpen ? 'open' : ''}`} ref={hamburgerRef} onClick={toggleHamburger}>
        <FontAwesomeIcon icon={hamburgerOpen ? faTimes : faBars} />
      </div>
      {hamburgerOpen && (
        <div className="hamburger-links">
          <Link to="/" className="home">
            Home
          </Link>
          <Link to="/about">About</Link>
          {/* <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link> */}
          <Link to="/templates" className={`nav-link ${location.pathname === '/templates' ? 'active' : ''}`}>
          Templates
          </Link>
          {user ? <button className='logout' onClick={handleLogout}>Logout</button> : 
          <>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
          </> }
        </div>
      )}
      <div className="nav-line"></div>
    </header>
  );
};

export default Navbar;
