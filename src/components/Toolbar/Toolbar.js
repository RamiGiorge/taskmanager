import { useState } from 'react'
import { FaBars, FaBell, FaSearch, FaBellSlash } from 'react-icons/fa'
import SearchForm from '../SearchForm/SearchForm'
import { CSSTransition } from 'react-transition-group'

const Toolbar = ({ toggleMenu }) => {
    const [searching, setSearching] = useState(false)
    const [notify, setNotify] = useState(false)

    const toggleSearch = () => {
        setSearching(!searching)
    }

    return (
        <div className='toolbar'>
            <CSSTransition in={searching} timeout={200} unmountOnExit classNames='search-form-transition'>
                <div className="search-form-container">
                    <SearchForm toggleSearch={toggleSearch} searching={searching} />
                </div>
            </CSSTransition>

            <div className='actions'>
                <div className="bars-container">
                    <FaBars className='pointer' onClick={toggleMenu} />
                </div>
                <FaSearch className='search pointer' onClick={toggleSearch} />
                {!notify && <FaBell className='bell pointer' onClick={() => setNotify(!notify)} />}
                {notify && <FaBellSlash className='bell pointer' onClick={(() => setNotify(!notify))} />}
            </div>
        </div>
    )
}

export default Toolbar