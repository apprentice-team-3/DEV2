import { configureStore } from "@reduxjs/toolkit";
import pdcaListReducer from "./redux/store/modules/pdcaList";
import todoReducer from "./todoSlice";
import todayReducer from './todaySlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
    pdcaLister: pdcaListReducer,
    today: todayReducer,
  },
});

export default store;
