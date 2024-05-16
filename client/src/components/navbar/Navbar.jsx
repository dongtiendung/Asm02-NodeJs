import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/">
                    <span className="logo">Booking Website</span>
                </Link>

                {user ? (
                    <div className="navItems">
                        <p>{user.email}</p>
                        <button className="navButton" onClick={() => navigate('/transaction')}>
                            Transaction
                        </button>
                        <button className="navButton" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="navItems">
                        <button className="navButton" onClick={() => navigate('/register')}>
                            Register
                        </button>
                        <button className="navButton" onClick={() => navigate('/login')}>
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
