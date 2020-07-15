import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'lib/slices/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
  devTools: true,
});
