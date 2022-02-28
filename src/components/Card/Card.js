import Categories from '../Categories/Categories'
import AddForm from '../AddForm/AddForm'
import Toolbar from '../Toolbar/Toolbar'
import { useState } from 'react'
import SideMenu from '../SideMenu/SideMenu'
import { CSSTransition } from 'react-transition-group'

const Card = () => {
    const [type, setType] = useState('personal')
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => setShowMenu(!showMenu)

    return (
        <>
            <div className={`card ${showMenu && 'slide'}`}>
                <Toolbar toggleMenu={toggleMenu} />
                <h1>What's up, Rome!</h1>
                <Categories type={type} setType={setType} />
                <AddForm type={type} setType={setType} />
            </div>
            <CSSTransition in={showMenu} timeout={400} classNames='side-slide'>
                <SideMenu toggleMenu={toggleMenu} />
            </CSSTransition>
        </>
    )
}

export default Card