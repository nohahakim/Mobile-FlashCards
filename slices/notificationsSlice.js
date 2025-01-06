// notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastQuizCompletedDate: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setLastQuizCompletedDate: (state, action) => {
      state.lastQuizCompletedDate = action.payload.date;
    },
  },
});

export const { setLastQuizCompletedDate } = notificationsSlice.actions;
export default notificationsSlice.reducer;
