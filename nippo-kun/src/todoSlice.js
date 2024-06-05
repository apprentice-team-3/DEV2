import { configureStore, createSlice } from '@reduxjs/toolkit';

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

const digressionsSlice = createSlice({
    name: 'digression',
    initialState: { text: ''},
    reducers: {
        setText: (state, action) => {
            state,text = action.payload;
        },
    },
});

export const { setTodo } = todoSlice.actions;
export const { setText } = digressionSlice.actions;

export const store = configureStore({
    reducer: {
        todo: todoSlice.reducer,
        digression: digressionsSlice.reducer,
    },
});
