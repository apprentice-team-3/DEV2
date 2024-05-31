import { createSlice } from '@reduxjs/toolkit';

const yesterdayTasks = localStorage.getItem('yesterday') ? JSON.parse(localStorage.getItem('yesterday')) : [];

const initialState = {
    todo: yesterdayTasks[0],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodo: (state, action) => {
            state.todo = action.payload;
        },
    },
});

export const { setTodo } = todoSlice.actions;
export default todoSlice.reducer;
