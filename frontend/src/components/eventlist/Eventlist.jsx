import { React, useState, useEffect } from 'react';
import axios from 'axios'
import Card from '../card/Card';
import './Eventlist.css';


const Eventlist = () => {
  // const events = [
  //   {
  //     "image": "blog.avif",
  //     "title": "Music Festival",
  //     "description": "Join us for a weekend of live music performances from top artists.",
  //     "datetime": "2024-06-15T18:00:00",
  //     "islike": true,
  //     "ticket_price": 50.00
  //   },
  //   {
  //     "image": "blog.avif",
  //     "title": "Food Expo",
  //     "description": "Discover the latest culinary trends and taste delicious dishes from around the world.",
  //     "datetime": "2024-07-20T11:00:00",
  //     "islike": false,
  //     "ticket_price": 25.00
  //   }
  // ];
  const [section, setSection] = useState('all');
  const Token = sessionStorage.getItem('token');
  const handleSectionChange = async (newSection) => {
    setSection(newSection);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${Token}`,
      },
    }
    if (newSection === "my") {
      if (Token){
        const event_list = await axios.get("http://127.0.0.1:8000/api/myevents", config)
        setEvents(event_list.data)
      }
      else{
        const event_list = await axios.get("http://127.0.0.1:8000/api/myevents")
        setEvents(event_list.data)
      }
    }
    else {
      if (Token){
        const event_list = await axios.get("http://127.0.0.1:8000/api/events", config)
        setEvents(event_list.data)
      }
      else{
        const event_list = await axios.get("http://127.0.0.1:8000/api/events")
        setEvents(event_list.data)
      }
    }
  };
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
        if (Token){
          const event_list = await axios.get("http://127.0.0.1:8000/api/events",config)
          setEvents(event_list.data)
        }
        else{
          const event_list = await axios.get("http://127.0.0.1:8000/api/events")
          console.log(event_list)
          setEvents(event_list.data)
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    getAllEvent()
  }, [])
  return (
    <div className='eventlist'>
      <div className="nav">
        <span onClick={() => handleSectionChange('all')} style={section === 'all' ? { borderBottom: "2px solid black" } : {}}>
          All Events
        </span>
        {Token?
        <span onClick={() => handleSectionChange('my')} style={section === 'my' ? { borderBottom: "2px solid black" } : {}}>
          My Events
        </span>:<span></span>}
      </div>
      {events ?
        <div className="list">
          {
            events.map((event, index) => {
              return <Card key={index} details={event} />;
            })
          }
        </div> :
        <h1 style={{textAlign:"center", width:"100%"}}>No Events</h1>
      }
    </div>
  );
};

export default Eventlist;
