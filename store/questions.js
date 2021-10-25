import { createSlice } from '@reduxjs/toolkit';

const questionsInitialState = {
  questions: [],
};

const questions = createSlice({
  name: 'questions',
  initialState: questionsInitialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
  },
});

export const questionsActions = { ...questions.actions };

export default questions;
