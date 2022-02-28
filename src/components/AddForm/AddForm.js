import { useEffect, useRef, useState } from 'react'
import { FaCheck, FaTimes, FaPlusCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { addTask, store } from '../../features/tasksSlice'
import { v4 as uuidv4 } from 'uuid';
import { CSSTransition } from 'react-transition-group';

const Form = ({ type, setType }) => {
    const [inputText, setInputText] = useState('')
    const [show, setShow] = useState(false)
    const inputRef = useRef(null)
    const formRef = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {
        if (show) {
            inputRef.current.focus()
        }
    }, [show])

    const handleChange = (e) => {
        setInputText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputText) {
            const task = {
                task: inputText,
                id: uuidv4(),
                isComplete: false,
                type,
                isEditing: false
            }
            dispatch(addTask(task))
            dispatch(store())
            setInputText('')
        }
    }

    const checkRadio = (e) => {
        setType(e.target.value);
    }

    return (
        <>
            <CSSTransition in={show} timeout={100} classNames='add-form-transition' nodeRef={formRef} unmountOnExit>
                <form onSubmit={handleSubmit} className='add-form' ref={formRef}>
                    <div className='type-container'>
                        <div className={`type-group ${type === 'personal' ? 'checked' : ''}`}>
                            <label htmlFor="personal" className='pointer'>Personal</label>
                            <input type="radio" id='personal' value={'personal'} onClick={checkRadio} />
                        </div>

                        <div className={`type-group ${type === 'business' ? 'checked' : ''}`}>
                            <label htmlFor="business" className='pointer'>Business</label>
                            <input type="radio" id='business' value={'business'} onClick={checkRadio} />
                        </div>
                    </div>

                    <div className='input-container'>
                        <input ref={inputRef} type="text" placeholder='Add task' onChange={handleChange} value={inputText} />
                        <FaTimes className='cancel-action pointer' onClick={() => setShow(false)} />
                        <FaCheck className='check-icon pointer' onClick={handleSubmit} />
                    </div>
                </form>
            </CSSTransition>
            <button className={`add-btn pointer ${show && 'slide'}`}><FaPlusCircle className='add-icon' onClick={() => setShow(!show)} /></button>
        </>
    )
}

export default Form