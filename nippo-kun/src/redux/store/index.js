import { configureStore } from "@reduxjs/toolkit";
import pdcasListReducer from "./modules/pdcaList";

export default configureStore({
  reducer: {
    pdcaLister: pdcasListReducer,
  },
});
