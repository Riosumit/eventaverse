import { React, useEffect, useState } from 'react';
import './Card.css'
import axios from 'axios'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const Card = ({ details }) => {
  const [detail, setDetail] = useState(details)
  useEffect(() => {

  }, [detail])
  // Parse the datetime string into a Date object
  const dateTime = new Date(detail.datetime);
  console.log(detail)

  // Array to map month names
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Format date and time separately
  const day = dateTime.getDate(); // Get the day of the month
  const month = months[dateTime.getMonth()]; // Get the month name
  const year = dateTime.getFullYear(); // Get the full year
  const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get the formatted time
  const Token = sessionStorage.getItem("token");
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${Token}`,
    },
  }
  const like = async () => {
    try {
      const updatedDetail = { ...detail, is_like: true, likes: detail.likes + 1 };
      setDetail(updatedDetail);
      const l = await axios.get(`http://127.0.0.1:8000/api/events/${details.id}/like`, config)
    }
    catch (error) {
      console.log(error)
    }
  }
  const unlike = async () => {
    try {
      const updatedDetail = { ...detail, is_like: false, likes: detail.likes - 1 };
      setDetail(updatedDetail);
      const ul = await axios.get(`http://127.0.0.1:8000/api/events/${details.id}/unlike`, config)
    }
    catch (error) {
      console.log(error)
    }
  }
  const try_like = () => {
    alert("Log In to Like any Event");
  }
  return (
    <div className='card'>
      <img src={"http://localhost:8000" + detail.image} alt="" />
      <div className="mainCdTx">
        <div className="title">{detail.name}</div>
        <div className="det">
          <div className="date">{month} {day}, {year} - {time}</div>
          <div className="lc">{detail.location}</div>
        </div>
        <div className="like">
          <p>Likes {detail.likes}</p>
          {Token ? (
            detail.is_like ? (
              <span onClick={unlike}><AiFillHeart size={25} className='redHeart' /></span>
            ) : (
              <span onClick={like}><AiOutlineHeart size={25} /></span>
            )
          ) : (
            <span><AiOutlineHeart size={25} onClick={try_like}/></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
