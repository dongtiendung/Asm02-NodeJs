import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';
import './Login.css';
import Navbar from '../../components/navbar/Navbar';

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
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
            navigate('/');
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
        }
    };

    return (
        <>
            <Navbar />
            <div className="login">
                <div className="lContainer">
                <div className='titleLogin'><h2> Login</h2></div>
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
