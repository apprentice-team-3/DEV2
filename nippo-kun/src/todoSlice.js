import { createSlice } from '@reduxjs/toolkit';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const yesterdayTasks = localStorage.getItem('yesterday') ? JSON.parse(localStorage.getItem('yesterday')) : [];
const storedTomorrow = localStorage.getItem('tomorrow') ? JSON.parse(localStorage.getItem('tomorrow')) : [];

const initialState = {
    todo: yesterdayTasks[0],
    tomorrow: storedTomorrow,
};

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        setTodo: (state, action) => {
            state.todo = action.payload;
        },
        addTodo: (state, action) => {
            state.tomorrow.push(action.payload);
            localStorage.setItem('tomorrow', JSON.stringify(state.tomorrow));
        },
        removeTodo: (state, action) => {
            state.tomorrow = state.tomorrow.filter((_, index) => index !== action.payload);
            localStorage.setItem('tomorrow', JSON.stringify(state.tomorrow));
        },
        updateTodo: (state, action) => {
        const { index, content } = action.payload;
        state.tomorrow[index] = content;
        localStorage.setItem('tomorrow', JSON.stringify(state.tomorrow));
        }
    },
});

export const { setTodo, addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
