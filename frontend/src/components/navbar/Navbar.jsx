import {React} from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { IoSearch, IoLocationSharp } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  const navigate = useNavigate();
  const loggedin = sessionStorage.getItem('token')
  const dropdown = () =>{
    let logout = document.getElementsByClassName('logout')[0];
    logout.style.display = "flex";
  }
  const dropup = () => {
    let logout = document.getElementsByClassName('logout')[0];
    logout.style.display = "none";
  }
  const logout = () => {
    sessionStorage.removeItem('token');
    navigate("/");
  }
  return (
    <div className="nav">
      <Link to="/" className="title">EventaVerse</Link>
      <div className="search">
        <IoSearch className='icon'/>
        <input type="text" className="search_event" placeholder='Search' />
        <hr style={{height:"35px"}}/>
        <IoLocationSharp className='icon'/>
        <input type="text" className="location" placeholder='Location'/>
      </div>
      {loggedin?<div className="options loggedin_nav">
        <Link to="/event"><GoPlus size={30}/>Create an Event</Link>
        <Link to="/likes"><FiHeart size={25}/>Likes</Link>
        <Link  style={{flexDirection:"row", cursor:"pointer", width: "215px"}} onMouseEnter={dropdown} onMouseLeave={dropup}><CgProfile size={30}/>rajsumit22032003@gmail.com</Link>
        <Link className='logout' onClick={logout} onMouseEnter={dropdown} onMouseLeave={dropup}>Logout</Link>
      </div>
      :
      <div className="options">
        <Link to="#eventlist">Find Events</Link>
        <Link to="/login">Create Events</Link>
        <Link to="">Help Center</Link>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>}
    </div>
  )
}

export default Navbar
