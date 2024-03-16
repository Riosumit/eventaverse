import React from 'react'
import Eventlist from '../eventlist/Eventlist'
import Navbar from '../navbar/Navbar'
import { GiMusicalScore, GiDramaMasks} from "react-icons/gi";
import { BiSolidCableCar } from "react-icons/bi";
import { SiWorldhealthorganization } from "react-icons/si";
import { IoGameControllerOutline } from "react-icons/io5";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbBusinessplan } from "react-icons/tb";
import { MdNightlife } from "react-icons/md";
import './Main.css'

const Main = () => {
    return (
        <div className='main'>
            <Navbar/>
            <img src="cover.jpg" alt="" />
            <div className="genres">
                <a className="genre">
                    <GiMusicalScore className="logo"/>
                    <p>Music</p>
                </a>
                <a className="genre">
                    <MdNightlife className="logo"/>
                    <p>Nightlife</p>
                </a>
                <a className="genre">
                    <GiDramaMasks className="logo"/>
                    <p style={{textAlign:"center"}}>Performing & <br/> Visual Arts</p>
                </a>
                <a className="genre">
                    <BiSolidCableCar className="logo"/>
                    <p>Holidays</p>
                </a>
                <a className="genre">
                    <SiWorldhealthorganization className="logo"/>
                    <p>Health</p>
                </a>
                <a className="genre">
                    <IoGameControllerOutline className="logo"/>
                    <p>Hobbies</p>
                </a>
                <a className="genre">
                    <TbBusinessplan className="logo"/>
                    <p>Business</p>
                </a>
                <a className="genre">
                    <IoFastFoodOutline className="logo"/>
                    <p>Food & Drink</p>
                </a>
            </div>
            <Eventlist/>
        </div>
    )
}

export default Main
