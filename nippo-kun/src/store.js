import { configureStore } from "@reduxjs/toolkit";
import {
  rootReducer,
  setDigressionHTML,
  setDigressionMarkdown,
  setHelpHTML,
  setHelpMarkdown,
} from "./createMarkdownSlice";
import allReview from "./redux/store/modules/all-review";
import confirmReport from "./redux/store/modules/confirmReport";
import doneName from "./redux/store/modules/doneName";
import loading from "./redux/store/modules/loading";
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
    loader: loading,
    allReviewer: allReview,
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
