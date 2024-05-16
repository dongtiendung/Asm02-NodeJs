import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import './login.scss';

function Login() {
    const navigate = useNavigate();
    const { isLoading, error, dispatch } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ username: undefined, password: undefined });

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('/auth/login', credentials);
            if (res.data.details.isAdmin) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
                navigate('/');
            } else {
                dispatch({ type: 'LOGIN_FAILURE', payload: { message: 'You are not allowed!' } });
            }
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
        }
    };

    return (
        <>
            {/* <Navbar /> */}
            <div className="login">
                <div className="lContainer">
                    <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
                    <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
                    <button className="lButton" onClick={handleClick} disabled={isLoading}>
                        Login
                    </button>
                    <p style={{ textAlign: 'center' }}>
                        If you don't have an account <Link to="/register">Click here to Register</Link>
                    </p>
                    {error && <span style={{ textAlign: 'center', color: 'red' }}>{error.message}</span>}
                </div>
            </div>
        </>
    );
}

export default Login;
