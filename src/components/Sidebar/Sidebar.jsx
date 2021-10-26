import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiBarChartBoxFill } from 'react-icons/ri';
import { MdGroup } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { useState } from 'react';

const Sidebar = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    return (  
        <nav className={`sidebar ${openSidebar ? "open" : ""}`}>
            <div className="menu one-content" onClick = {() => setOpenSidebar(!openSidebar)}>
                <GiHamburgerMenu className="icon"/><span className="content-text">Menu</span>
            </div>
            <ul className="links">
                <li>                
                    <NavLink exact to="/" activeClassName="active" className="one-content">
                        <RiBarChartBoxFill className="icon"/><span className="content-text">Dashboard</span>
                    </NavLink>                    
                    <div className="tooltip">Dashboard</div>
                </li>
                <li>
                    <NavLink to="/about" activeClassName="active" className="one-content">
                        <MdGroup className="icon"/><span className="content-text">About Us</span>                        
                    </NavLink>
                    <div className="tooltip">About Us</div>
                </li>
                <li>
                    <NavLink to="/contact" activeClassName="active" className="one-content">
                        <BsFillTelephoneFill className="icon"/><span className="content-text">Contact Us</span>                        
                    </NavLink>
                    <div className="tooltip">Contact</div>
                </li>
                <li className="logout">
                    <div className="logout one-content">
                        <IoIosLogOut className="icon"/><span className="content-text">Log out</span>
                    </div>
                </li>                
            </ul>            
        </nav>
    );
}
 
export default Sidebar;