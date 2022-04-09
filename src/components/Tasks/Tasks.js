import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tasksState, removeTask, toggleStatus, edit, update, setText, store } from '../../features/tasksSlice'
import { FaTimes, FaCheck, FaRedo, FaEdit } from 'react-icons/fa'

const Tasks = ({ type }) => {
    const [isEditing, setIsEditing] = useState(false)
    const { tasks, text } = useSelector(tasksState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(store())
    }, [tasks, dispatch])

    const inputRef = useCallback(input => {
        input && input.focus()
    }, []);

    const editTask = (id) => {
        dispatch(edit(id))
        setIsEditing(true)
    }

    const updateTask = (e, id) => {
        e.preventDefault()
        dispatch(update(id))
        setIsEditing(false)
    }

    const cancelEditing = (id) => {
        dispatch(edit(id))
        setIsEditing(false)
    }

    return (
        <div>
            <h4>TODAY'S TASKS</h4>
            <div className='tasks'>
                {tasks?.map((task) => (
                    task.type === type ?
                        <div className={`task show ${task.isComplete ? 'complete' : ''}`} key={task.id}>
                            {task.isEditing && <form className='edit-field-container' onSubmit={(e) => updateTask(e, task.id)}>
                                <input ref={inputRef} type="text" className="edit-field" value={text} onChange={(e) => dispatch(setText(e.target.value))} />
                                <FaTimes className='cancel-action pointer' onClick={() => cancelEditing(task.id)} />
                                <FaCheck className='check-icon pointer' onClick={(e) => updateTask(e, task.id)} />
                            </form>}
                            <span>{task.task}</span>
                            <FaTimes className='pointer cancel-action' onClick={() => dispatch(removeTask(task.id))} />
                            <button disabled={isEditing ? true : false} onClick={() => editTask(task.id)}><FaEdit className='edit-icon' /></button>
                            {!task.isComplete && <FaCheck className='pointer check-icon' onClick={() => dispatch(toggleStatus(task.id))} />}
                            {task.isComplete && <FaRedo className='pointer check-icon' onClick={() => dispatch(toggleStatus(task.id))} />}
                        </div> : null
                ))}
            </div>
        </div >
    )
}

export default Tasks