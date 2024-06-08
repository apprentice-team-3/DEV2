import { createSlice } from "@reduxjs/toolkit";

const pdcaLister = createSlice({
  name: "pdcaLister",
  initialState: {
    pdcaList: [
      {
        doneName: "",
        isOpen: true,
        plan: "",
        do: "",
        check: "",
        action: "",
        isTruncated: false,
      },
    ],
  },
  reducers: {
    add(state, { type, payload }) {
      const { doneName } = payload;
      if (state.pdcaList.some((item) => item.doneName === doneName)) return;

      state.pdcaList = state.pdcaList.map((item) => ({
        ...item,
        isOpen: false,
      }));

      state.pdcaList = [
        ...state.pdcaList,
        {
          ...payload,
          isOpen: true,
          plan: "",
          do: "",
          check: "",
          action: "",
          isTruncated: false,
        },
      ];
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
        if (item.isOpen) {
          return { ...item, ...payload, isOpen: true };
        }
        return { ...item, isOpen: false };
      });

      console.log(state.pdcaList);
    },

    change(state, { type, payload }) {
      const { doneName } = payload;
      state.pdcaList = state.pdcaList.map((item) => {
        if (item.doneName === doneName) {
          return { ...item, isOpen: true };
        }
        return { ...item, isOpen: false };
      });
      console.log(state.pdcaList);
    },
  },
});

const { add, remove, write, change } = pdcaLister.actions;

export { add, change, remove, write };
export default pdcaLister.reducer;
