import { configureStore } from "@reduxjs/toolkit";
import pdcaListReducer from "./redux/store/modules/pdcaList";
import { rootReducer } from "./todoSlice";
import todayReducer from './todaySlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
    pdcaLister: pdcaListReducer,
    today: todayReducer,
    reducer: rootReducer,
  },
});

export default store;
export * from './todoSlice';
