import { configureStore } from "@reduxjs/toolkit";
import {
  rootReducer,
  setDigressionHTML,
  setDigressionMarkdown,
  setHelpHTML,
  setHelpMarkdown,
} from "./createMarkdownSlice";
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
