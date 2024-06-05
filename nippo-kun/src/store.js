import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './todoSlice';

const store = configureStore({
    reducer: rootReducer,
});

export default store;
