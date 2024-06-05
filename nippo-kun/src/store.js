import { configureStore } from "@reduxjs/toolkit";
import pdcaListReducer from "./redux/store/modules/pdcaList";
import todoReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    pdcaLister: pdcaListReducer,
  },
});

export default store;
