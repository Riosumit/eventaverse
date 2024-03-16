import React, { useState } from 'react';
import './LoginUser.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginUser = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            const data = {
                "email": email,
                "password": password
            };
            const check_login = await axios.post("http://127.0.0.1:8000/api/login", data);
            console.log(check_login.data)
            if (check_login.data.success === true) {
                sessionStorage.setItem("token",check_login.data.token)
                navigate("/");
            } else {
                setError(check_login.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='login'>
            <div className="section">
                <div className="box">
                    <Link to="/" className="title">EventaVerse</Link>
                    <div className="boxhead">Log in</div>
                    <div className="boxcontent">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">
                                <p>Email address</p>
                                <input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </label>
                            <label htmlFor="password">
                                <p>Password</p>
                                <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </label>
                            <div className="err">{error}</div>
                            <button className='submitbtn' type="submit" onClick={handleSubmit}>Log in</button><br />
                            <Link to='/signup' className='signup'>SignUp</Link>
                        </form>
                    </div>
                </div>
            </div>
            <img src='https://cdn.evbstatic.com/s3-build/perm_001/1bab52/django/images/login/lateral-image-1.jpg' alt='background' className="background"/>
        </div>
    );
}

export default LoginUser;
