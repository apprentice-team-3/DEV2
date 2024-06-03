import { createSlice } from '@reduxjs/toolkit';

const yesterdayTasks = localStorage.getItem('yesterday') ? JSON.parse(localStorage.getItem('yesterday')) : [];

const initialState = {
    todo: yesterdayTasks[0],
    tomorrow: [],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodo: (state, action) => {
            state.todo = action.payload;
        },
        addTodo: (state, action) => {
            state.tomorrow.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.tomorrow = state.tomorrow.filter((_, index) => index !== action.payload);
        },
    },
});

export const { setTodo, addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
