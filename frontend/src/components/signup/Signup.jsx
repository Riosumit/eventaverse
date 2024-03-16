import { React, useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            axios.defaults.withCredentials = true;
            const data = {
                "firstname": firstName,
                "lastname": lastName,
                "email": email,
                "password": password
            }
            const check_login = await axios.post("http://127.0.0.1:8000/api/signup", data)
            if (check_login.data.success === true) {
                alert("Signup Succesfull")
                navigate('/login');
            } else {
                setError(check_login.data);
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='signup'>
            <div className="section">
                <div className="box">
                    <Link to="/" className="title">EventaVerse</Link>
                    <div className="boxhead">Create an account</div>
                    <div className="boxcontent">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email"><p>Email</p>
                                <input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </label>
                            <label htmlFor="f_name"><p>First Name</p>
                                <input type="text" id='f_name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </label>
                            <label htmlFor="l_name"><p>Last Name</p>
                                <input type="text" id='l_name' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </label>
                            <label htmlFor="password"><p>Password</p>
                                <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </label>
                            <label htmlFor="cpassword"><p>Confirm Password</p>
                                <input type="password" id='cpassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </label>
                            <div className="err">{error}</div>
                            <button className='submitbtn' type="submit" onClick={handleSubmit}>SignUp</button>
                            <Link to="/login" className='login'>Log in</Link>
                        </form>
                    </div>
                </div>
            </div>
            <img src='https://cdn.evbstatic.com/s3-build/perm_001/1bab52/django/images/login/lateral-image-1.jpg' alt='background' className="background"/>
        </div>
    );
}

export default Signup;
