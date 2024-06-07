import { createSlice } from "@reduxjs/toolkit";

const pdcaLister = createSlice({
  name: "pdcaLister",
  initialState: {
    pdcaList: [{ isOpen: true, plan: "", do: "", check: "", action: "" }],
  },
  reducers: {
    add(state, { type, payload }) {
      state.pdcaList = state.pdcaList.map((item) => ({
        ...item,
        isOpen: false,
      }));
      state.pdcaList = [...state.pdcaList, { ...payload, isOpen: true }];
    },
    remove(state, { type, payload }) {
      if (state.pdcaList.length === 1) return;

      state.pdcaList = state.pdcaList
        .filter((item, index) => index !== payload)
        .map((item, index) => {
          if (index === payload - 1) return { ...item, isOpen: true };
          return item;
        });
    },
    write(state, { type, payload }) {
      state.pdcaList = state.pdcaList.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload, isOpen: true };
        }
        return { ...item, isOpen: false };
      });
    },
  },
});

const { add, remove, write } = pdcaLister.actions;

export { add, remove, write };
export default pdcaLister.reducer;
