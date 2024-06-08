import { configureStore } from "@reduxjs/toolkit";
import {
  rootReducer,
  setDigressionHTML,
  setDigressionMarkdown,
  setHelpHTML,
  setHelpMarkdown,
} from "./createMarkdownSlice";
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
    ...rootReducer,
  },
});

export default store;
export * from "./todoSlice";
export {
  setDigressionHTML,
  setDigressionMarkdown,
  setHelpHTML,
  setHelpMarkdown,
};
