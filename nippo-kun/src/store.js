import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

const store = configureStore({
    reducer: {
        todor: todoReducer,
    },
});

export default store;
