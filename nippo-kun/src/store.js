import { configureStore } from "@reduxjs/toolkit";
import {
  rootReducer,
  setDigressionHTML,
  setDigressionMarkdown,
  setHelpHTML,
  setHelpMarkdown,
} from "./createMarkdownSlice";
import confirmReport from "./redux/store/modules/confirmReport";
import doneName from "./redux/store/modules/doneName";
import metaData from "./redux/store/modules/metaData";
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
    doneNamer: doneName,
    metaDater: metaData,
    pager: pageReducer,
    confirmReporter: confirmReport,
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
