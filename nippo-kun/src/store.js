import { configureStore } from "@reduxjs/toolkit";
import doneName from "./redux/store/modules/doneName";
import pdcaListReducer from "./redux/store/modules/pdcaList";
import todayReducer from "./todaySlice";
import todoReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    pdcaLister: pdcaListReducer,
    today: todayReducer,
    doneNamer: doneName,
  },
});

export default store;
