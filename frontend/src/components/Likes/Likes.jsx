import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Card from '../card/Card';
import './Likes.css';
import Navbar from '../navbar/Navbar';


const Likes = () => {
  const navigate = useNavigate()
  const Token = sessionStorage.getItem('token');
  if (!Token){
    navigate("/");
  }
  const [events, setEvents] = useState([])
  useEffect(() => {
    async function getAllEvent() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Token}`,
        },
      }
      try {
        const event_list = await axios.get("http://127.0.0.1:8000/api/events/like",config)
        setEvents(event_list.data.data)
        console.log(event_list.data.data)
      }
      catch (error) {
        console.log(error)
      }
    }
    getAllEvent()
  }, [])
  return (
    <div className='likes'>
      <Navbar/>
      <div className="content">
        <h1>Likes</h1>
        {events ?
          <div className="list">
            {
              events.map((event, index) => {
                return <Card key={index} details={event} />;
              })
            }
          </div> :
          <h1 style={{textAlign:"center", width:"100%"}}>No Liked Events</h1>
        }
      </div>
    </div>
  );
};

export default Likes;
