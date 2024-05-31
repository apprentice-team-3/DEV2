import { createSlice } from "@reduxjs/toolkit";

const pdcaLister = createSlice({
  name: "pdcaLister",
  initialState: {
    pdcaList: [{ plan: "", do: "", check: "", action: "" }],
  },
  reducers: {
    add(state, { type, payload }) {
      state.pdcaList = [...state.pdcaList, payload];
    },
    remove(state, { type, payload }) {
      state.pdcaList = state.pdcaList.filter((item) => item.id !== payload);
    },
    write(state, { type, payload }) {
      state.pdcaList = state.pdcaList.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload };
        }
        return item;
      });
    },
  },
});

const { add, remove, write } = pdcaLister.actions;

export { add, remove, write };
export default pdcaLister.reducer;
