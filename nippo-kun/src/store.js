import { configureStore } from "@reduxjs/toolkit";
import pdcaListReducer from "./redux/store/modules/pdcaList";
import { rootReducer, setDigressionMarkdown, setDigressionHTML, setHelpMarkdown, setHelpHTML } from './createMarkdownSlice';
import todayReducer from './todaySlice';
import todoReducer from './todoSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
    pdcaLister: pdcaListReducer,
    today: todayReducer,
    ...rootReducer,
  },
});

export default store;
export * from './todoSlice';
export { setDigressionMarkdown, setDigressionHTML, setHelpMarkdown, setHelpHTML };
