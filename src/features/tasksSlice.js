import { createSlice } from '@reduxjs/toolkit'

const storedTasks = JSON.parse(localStorage.getItem('tasks'))

const initialState = {
    tasks: storedTasks ? storedTasks : [],
    text: ''
}

const tasksSlice = createSlice(
    {
        name: 'tasks',
        initialState,
        reducers: {
            addTask: (state, action) => {
                state.tasks.push(action.payload)
            },
            removeTask: (state, action) => {
                state.tasks = state.tasks.filter(({ id }) => id !== action.payload)
            },
            toggleStatus: (state, { payload }) => {
                state.tasks.forEach((task) => {
                    if (task.id === payload) task.isComplete = !task.isComplete
                })
            },
            store: (state) => {
                localStorage.setItem('tasks', JSON.stringify(state.tasks))
            },
            edit: (state, action) => {
                state.tasks.forEach((task) => {
                    if (task.id === action.payload) {
                        task.isEditing = !task.isEditing
                        state.text = task.task
                    }
                })
            },
            setText: (state, { payload }) => {
                state.text = payload
            },
            update: (state, { payload }) => {
                state.tasks.forEach((task) => {
                    if (task.id === payload) {
                        task.task = state.text
                        task.isEditing = false
                    }
                })
            }
        }
    }
)

export const tasksState = state => state.tasks
export const { addTask, removeTask, toggleStatus, store, edit, update, setText } = tasksSlice.actions;
export default tasksSlice.reducer;