import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./redux/store/modules/page";
import pdcaListReducer from "./redux/store/modules/pdcaList";
import todayReducer from "./todaySlice";
import todoReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    pdcaLister: pdcaListReducer,
    pdcaExtraLister: pdcaListReducer,
    today: todayReducer,
    pager: pageReducer,
  },
});

export default store;
