import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

    const {logout} = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }
    return (
        <header className="navbar">
            <div className="logo">
                <p>Twenny</p>
            </div>
            <div className="navbar-links">
                {!user && (
                <Link to="/home" className="home">Home</Link>
                )}
                {!user && (
                <Link to="/about">About</Link>
                )}
                {!user && (
                <Link to="/services">Services</Link>
                )}
                <Link to="/projects">Projects</Link>
                {user && (
                    <span>{user.email}</span>
                )}
                {user && (
                    <button onClick={handleClick}>Logout</button>
                )}
            </div>
            <div className="contact-us">
                {!user && (
                <Link to="/contactus">Contact Us</Link>    
                )}
            </div>
        </header>
    )
}

export default Navbar;
