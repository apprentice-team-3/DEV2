import { createSlice } from '@reduxjs/toolkit';

const yesterdayTasks = localStorage.getItem('yesterday') ? JSON.parse(localStorage.getItem('yesterday')) : [];
const storedToday = localStorage.getItem('today') ? JSON.parse(localStorage.getItem('today')) : yesterdayTasks;

const initialState = {
    today: storedToday,
};

const todaySlice = createSlice({
    name: 'today',
    initialState,
    reducers: {
        addTodayTask: (state, action) => {
            state.today.push(action.payload);
            localStorage.setItem('today', JSON.stringify(state.today));
        },
        removeTodayTask: (state, action) => {
            state.today = state.today.filter((_, index) => index !== action.payload);
            localStorage.setItem('today', JSON.stringify(state.today));
        },
        updateTodayTask: (state, action) => {
            const { index, content } = action.payload;
            state.today[index] = content;
            localStorage.setItem('today', JSON.stringify(state.today));
        },
    },
});

export const { addTodayTask, removeTodayTask, updateTodayTask } = todaySlice.actions;
export default todaySlice.reducer;
