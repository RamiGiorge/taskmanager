import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { tasksState } from '../../features/tasksSlice'
import Tasks from '../Tasks/Tasks'

const Categories = ({ type, setType }) => {
    const [progress, setProgress] = useState(null)
    const { tasks } = useSelector(tasksState)

    useEffect(() => {
        let personal = {
            complete: 0,
            total: 0,
            percentage: 0
        }

        let business = {
            complete: 0,
            total: 0,
            percentage: 0
        }

        for (let task of tasks) {
            if (task.type === 'personal') personal.total += 1
            if (task.type === 'personal' && task.isComplete) personal.complete += 1
            personal.percentage = (personal.complete / personal.total) * 100

            if (task.type === 'business') business.total += 1
            if (task.type === 'business' && task.isComplete) business.complete += 1
            business.percentage = (business.complete / business.total) * 100
        }

        setProgress({ personal, business })

    }, [tasks, type])

    return (
        <div>
            <h4>CATEGORIES</h4>
            <div className='categories'>
                <div className={`category pointer ${type === 'personal' ? 'checked-category' : ''}`} onClick={() => setType('personal')}>
                    <p>{progress?.personal.total} tasks</p>
                    <h3>Personal</h3>
                    <div className="bar">
                        <div className="p-progress-bar" style={{ "width": `${progress?.personal.percentage}%` }}></div>
                    </div>
                </div>
                <div className={`category pointer ${type === 'business' ? 'checked-category' : ''}`} onClick={() => setType('business')}>
                    <p>{progress?.business.total} tasks</p>
                    <h3>Business</h3>
                    <div className="bar">
                        <div className="b-progress-bar" style={{ "width": `${progress?.business.percentage}%` }}></div>
                    </div>
                </div>
            </div>

            <Tasks type={type} />
        </div>
    )
}

export default Categories