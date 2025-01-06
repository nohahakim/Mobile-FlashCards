// quizSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDeckId: null,
  correctAnswersCount: 0,
  answeredQuestionsCount: 0,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz: (state, action) => {
      state.currentDeckId = action.payload.deckId;
      state.correctAnswersCount = 0;
      state.answeredQuestionsCount = 0;
    },
    answerQuestion: (state, action) => {
      const { isCorrect } = action.payload;
      if (isCorrect) state.correctAnswersCount += 1;
      state.answeredQuestionsCount += 1;
    },
    resetQuiz: (state) => {
      state.currentDeckId = null;
      state.correctAnswersCount = 0;
      state.answeredQuestionsCount = 0;
    },
  },
});

export const { startQuiz, answerQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
