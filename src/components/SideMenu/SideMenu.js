import { FaChevronLeft, FaBookmark, FaClock, FaThList } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { tasksState } from '../../features/tasksSlice'
import moero from "../../assets/moero.jpeg";

const SideMenu = ({ toggleMenu }) => {
    const { tasks } = useSelector(tasksState)

    const getScore = () => {
        if (tasks.length) {
            const completed = tasks.filter(({ isComplete }) => isComplete)
            const percentage = completed.length / tasks.length
            if (percentage < 0.50) return 'Poor'
            if (percentage >= 0.50 && percentage <= 0.70) return 'Good'
            if (percentage > 0.70) return 'Excellent'
        }
        return (<span>Add tasks to show consistency</span>)
    }

    return (
        <aside className='side-menu'>
            <div className="inner-side">
                <button onClick={toggleMenu} className='pointer back-btn'>
                    <FaChevronLeft />
                </button>
                <div className="profile-img-container">
                    <img src={moero} alt="profile" className='profile-img' />
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

                <div className="performance">
                    <p>{getScore()}</p>
                    {tasks.length ? <h3>consistency</h3> : null}
                </div>
            </div>
        </aside>
    )
}

export default SideMenu