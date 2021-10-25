import { createSlice } from '@reduxjs/toolkit';

const correctCountInitialState = {
  correctCount: [0, 0],
};

const correctCount = createSlice({
  name: 'correctCount',
  initialState: correctCountInitialState,
  reducers: {
    setCorrectCount(state, action) {
      state.correctCount = action.payload;
    },
  },
});

export const correctCountActions = { ...correctCount.actions };

export default correctCount;
