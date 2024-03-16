import React, { useState } from 'react';
import './Event.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Event = () => {
    const [eventName, setEventName] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitButton = document.querySelector('.submitbtn');
        submitButton.disabled = true;
        try {
            const form = new FormData();
            form.append('name', eventName);
            form.append('datetime', dateTime);
            form.append('location', location);
            form.append('image', image);
            const Token = sessionStorage.getItem('token');
            const postEvent = await axios.post("http://127.0.0.1:8000/api/events", form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${Token}`,
                }
            });
                setEventName('');
                setDateTime('');
                setLocation('');
                setImage('');
                setError("Event Posted Successfully");
        } catch (error) {
            console.log(error);
            setError("Error posting event");
        }
        submitButton.disabled = false;
    };

    return (
        <div className='addevent'>
            <div className="section">
                <div className="box">
                    <Link to="/" className="title">EventaVerse</Link>
                    <div className="boxhead">Create an Event</div>
                    <div className="boxcontent">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="eventName"><p>Event Name</p>
                                <input type="text" id='eventName' value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                            </label>
                            <label htmlFor="dateTime"><p>Date & Time</p>
                                <input type="datetime-local" id='dateTime' value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
                            </label>
                            <label htmlFor="location"><p>Location</p>
                                <input type="text" id='location' value={location} onChange={(e) => setLocation(e.target.value)} required />
                            </label>
                            <label htmlFor="image"><p>Image</p>
                                <input type="file" id='image' onChange={(e) => setImage(e.target.files[0])} required />
                            </label>
                            <div className="err">{error}</div>
                            <button className='submitbtn' type="submit">Post Event</button>
                        </form>
                    </div>
                </div>
            </div>
            <img src='https://cdn.evbstatic.com/s3-build/perm_001/1bab52/django/images/login/lateral-image-1.jpg' alt='background' className="background" />
        </div>
    );
};

export default Event;
