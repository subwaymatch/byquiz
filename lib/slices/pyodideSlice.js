import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLoading: false, pyodide: null };

const pyodideSlice = createSlice({
  name: 'pyodide',
  initialState,
  reducers: {
    pyodideLoading: (state) => {
      console.log('reducer.pyodideLoading');
      state.isLoading = true;
    },
    pyodideLoaded: (state) => {
      console.log('reducer.pyodideLoaded');
      state.isLoading = false;
    },
  },
});

export const { pyodideLoading, pyodideLoaded } = pyodideSlice.actions;

export const loadPyodide = () => async (dispatch) => {
  console.log('loadPyodide');
  dispatch(pyodideLoading());

  // set the pyodide files URL (packages.json, pyodide.asm.data etc)
  window.languagePluginUrl = 'https://pyodide-cdn2.iodide.io/v0.15.0/full/';

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  console.log('resolved!');

  console.log(window.languagePluginLoader);

  await window.languagePluginLoader;

  dispatch(pyodideLoaded());
};

export default pyodideSlice.reducer;
