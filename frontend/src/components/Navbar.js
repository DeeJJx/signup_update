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
            <div className="navbar-brand">
                <Link to="/">Homepage</Link>
            </div>
            <nav className="navbar-menu">
                <div className="navbar-links">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                    {user && (
                        <span>{user.email}</span>
                    )}
                    {user && (
                        <button onClick={handleClick}>Logout</button>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar;