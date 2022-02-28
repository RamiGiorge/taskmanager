import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tasksState, removeTask, toggleStatus, edit, update, setText } from '../../features/tasksSlice'
import { FaTimes, FaCheck, FaRedo, FaEdit } from 'react-icons/fa'

const Tasks = ({ type }) => {
    let inputRef = useRef(null)
    const { tasks, text } = useSelector(tasksState)
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    })

    const updateTask = (e, id) => {
        e.preventDefault()
        dispatch(update(id))
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
                                <FaTimes className='cancel-action pointer' onClick={() => dispatch(edit(task.id))} />
                                <FaCheck className='check-icon pointer' onClick={(e) => updateTask(e, task.id)} />
                            </form>}
                            <span>{task.task}</span>
                            <FaTimes className='pointer cancel-action' onClick={() => dispatch(removeTask(task.id))} />
                            <FaEdit className='edit-icon pointer' onClick={() => dispatch(edit(task.id))} />
                            {!task.isComplete && <FaCheck className='pointer check-icon' onClick={() => dispatch(toggleStatus(task.id))} />}
                            {task.isComplete && <FaRedo className='pointer check-icon' onClick={() => dispatch(toggleStatus(task.id))} />}
                        </div> : null
                ))}
            </div>
        </div >
    )
}

export default Tasks