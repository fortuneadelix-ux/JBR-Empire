import '../../styles/sideBar.css';
import Header from './header.jsx';
import Dashboard from '../pages/dashboard.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BsDash } from './icons.js';

export default function SideBar(){
    const [butClicked, setButClicked] = useState("");
    const usersOptions = ['UsersList', 'Profile', 'Notification', 'Account'];
    return(
        <div className="sideBar">
            <Header/>
            <nav className='nav'>
                <Link to="/app" className='Link'>
                    <button className={`${butClicked === 'dashboard' ? "navButClicked" : "navBut"}`} onClick={() => setButClicked("dashboard") }>
                        Dashboard
                    </button>
                </Link>
                
                <Link className="Link">
                    <button className={`${butClicked === 'order' ? "navButClicked" : "navBut"}`} onClick={() => setButClicked("order") }>
                        Order
                    </button>
                </Link>

                
                <button className={`${butClicked === 'users' ? "navButClicked" : "navBut"}`} onClick={() => setButClicked("users") }>
                    Users
                </button>
                {butClicked === 'users' && 
                    <div className='options'>
                        {usersOptions.map((option, id) => (
                            <Link key={id} className="option" to={option.toLowerCase()}> <span className="icon"><BsDash/></span> {option}</Link>
                        ))}
                    </div>
                }

                
            </nav>
        </div>
    );
}