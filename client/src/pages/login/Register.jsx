import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './Register.css';
// import { useContext, useState } from 'react';
// import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    // const { isLoading, error, dispatch } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
        fullname: undefined,
        phoneNumber: undefined,
        email: undefined,
    });

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username: credentials.username,
                password: credentials.password,
                fullname: credentials.fullname,
                phoneNumber: credentials.phoneNumber,
                email: credentials.email,
            });
            console.log(res);
            // dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            navigate('/login');
        } catch (error) {
            setError(error.response.data);
        }
    };
    return (
        <>
            <Navbar />
            
            <div className="login">
                <div className="lContainer">
                <div className='titleRegister'><h2> Sign Up</h2></div>
                    <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" required />
                    <input
                        type="password"
                        placeholder="password"
                        id="password"
                        onChange={handleChange}
                        className="lInput"
                        required
                    />
                    <input
                        type="fullname"
                        placeholder="fullname"
                        id="fullname"
                        onChange={handleChange}
                        className="lInput"
                        required
                    />
                    <input
                        type="phoneNumber"
                        placeholder="phoneNumber"
                        id="phoneNumber"
                        onChange={handleChange}
                        className="lInput"
                    />
                    <input type="email" placeholder="email" id="email" onChange={handleChange} className="lInput" required />
                    <button className="lButton" onClick={handleClick}>
                        Register
                    </button>
                    <p>
                        <Link to="/login">Click here to Log In</Link>
                    </p>
                    {error && <span style={{ textAlign: 'center', color: 'red' }}>{error}</span>}
                </div>
            </div>
        </>
    );
}

export default Register;
