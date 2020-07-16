import { createSlice } from '@reduxjs/toolkit';

const initialState: { value: number } = { value: 4 };

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const selectCount = (state) => state.counter.value;

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;
