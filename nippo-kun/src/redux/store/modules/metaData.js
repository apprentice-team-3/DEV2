import { createSlice } from "@reduxjs/toolkit";

// 本日の日付を取得
const today = new Date();

const metaDater = createSlice({
  name: "metadater",
  initialState: {
    metaData: {
      date: new Date(),
      learningTime: 11,
      mind: "まあまあ",
    },
  },
  reducers: {
    setDate(state, { type, payload }) {
      state.metaData.date = payload;
    },
  },
});

export const { setDate } = metaDater.actions;
export default metaDater.reducer;
