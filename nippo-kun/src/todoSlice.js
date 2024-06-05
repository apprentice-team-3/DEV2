import { configureStore, createSlice } from '@reduxjs/toolkit';

const yesterdayTasks = localStorage.getItem('yesterday') ? JSON.parse(localStorage.getItem('yesterday')) : [];
const storedTomorrow = localStorage.getItem('tomorrow') ? JSON.parse(localStorage.getItem('tomorrow')) : [];

const initialState = {
    todo: yesterdayTasks[0],
    tomorrow: storedTomorrow,
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

const digressionSlice = createSlice({
    name: 'digression',
    initialState: { text: ''},
    reducers: {
        setText: (state, action) => {
            state.text = action.payload;
        },
    },
});

export const { setTodo, addTodo, removeTodo, updateTodo } = todoSlice.actions;
export const { setText } = digressionSlice.actions;

const rootReducer = {
        todo: todoSlice.reducer,
        digression: digressionSlice.reducer,
};

export default rootReducer;
