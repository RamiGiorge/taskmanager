import { useEffect, useRef, useState } from 'react'
import { FaSearch, FaChevronLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { tasksState } from '../../features/tasksSlice'

const SearchForm = ({ toggleSearch, searching }) => {
    const { tasks } = useSelector(tasksState)
    const inputRef = useRef(null)
    const [inputText, setInputText] = useState('')
    const [show, setShow] = useState(false)
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const handleClick = (e) => {
            typeof e.target.className === 'string' && !e.target.className.includes('search-input') && setShow(false)
        }
        window.addEventListener('click', handleClick)
        return () => window.removeEventListener('click', handleClick)
    }, [])

    const handleChange = (e) => {
        setInputText(e.target.value)
        const results = tasks.filter(({ task }) => task.includes(e.target.value))
        if (results.length) {
            setSuggestions(results)
            setShow(true)
        } else {
            setShow(false)
        }
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (inputText) setInputText('')
    }

    function handleClick(task) {
        setInputText(task.task)
        setSuggestions([task])
    }

    return (
        <form className='search-form' onSubmit={handleSearch}>
            <FaChevronLeft onClick={toggleSearch} className={`pointer ${searching ? 'show' : 'hide'}`} />
            <div className='input-container'>
                <input className='search-input' ref={inputRef} type="text" value={inputText} onChange={handleChange} onClick={() => setShow(!show)} />
                {show && inputText && <ul className='suggestions'>
                    {suggestions.map((task) => (
                        <li key={task.id} className='pointer' onClick={() => handleClick(task)}>{task.task} - <em>{task.type}</em></li>
                    ))}
                </ul>}
            </div>
            <FaSearch onClick={handleSearch} className={`pointer ${searching ? 'show' : 'hide'}`} />
        </form>
    )
}

export default SearchForm