import { createSlice } from '@reduxjs/toolkit';

const yesterdayTasks = localStorage.getItem('yesterday') ? JSON.parse(localStorage.getItem('yesterday')) : [];

const initialState = {
    tasks: yesterdayTasks,
    selectedTask: yesterdayTasks[0] || '',
};

const todoSlice = createSlice({
    name: 'todor',
    initialState,
    reducers: {
        setTodo: (state, action) => {
            state.selectedTask = action.payload;
        },
        updateTask: (state, action) => {
            const { index, newTask } = action.payload;
            state.tasks[index] = newTask;
            state.selectedTask = newTask;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
    },
});

export const { setTodo, updateTask, setTasks } = todoSlice.actions;
export default todoSlice.reducer;
