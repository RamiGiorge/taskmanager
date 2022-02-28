import React from 'react'
import { FaChevronLeft, FaBookmark, FaClock, FaThList, FaChartLine, } from 'react-icons/fa'

const SideMenu = ({ toggleMenu }) => {
    return (
        <div className='side-menu'>
            <div className="inner-side">
                <button onClick={toggleMenu} className='pointer back-btn'>
                    <FaChevronLeft />
                </button>
                <div className="profile-img-container">
                    <img src="./favicon.png" alt="profile" className='profile-img' />
                </div>
                <h1>Rami George</h1>
                <ul className="submenu">
                    <li className='pointer'>
                        <FaBookmark className='submenu-icon' />
                        <p>Templates</p>
                    </li>
                    <li className='pointer'>
                        <FaThList className='submenu-icon' />
                        <p>Categories</p>
                    </li>
                    <li className='pointer'>
                        <FaClock className='submenu-icon' />
                        <p>Analytics</p>
                    </li>
                </ul>

                <FaChartLine className='chart-line' />

                <div className="performance">
                    <p>Good</p>
                    <h3>Consistance</h3>
                </div>
            </div>

        </div>
    )
}

export default SideMenu