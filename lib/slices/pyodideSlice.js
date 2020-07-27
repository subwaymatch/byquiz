import { createSlice } from '@reduxjs/toolkit';

export const PyodideLoadStatus = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
};

export const PyodidePackagesLoadStatus = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
};

const initialState = {
  pyodideLoadStatus: PyodideLoadStatus.IDLE,
  pyodidePackagesLoadStatus: PyodidePackagesLoadStatus.IDLE,
  loadedPackages: [],
};

const pyodideSlice = createSlice({
  name: 'pyodide',
  initialState,
  reducers: {
    pyodideLoading: (state) => {
      console.log('pyodideLoading');
      state.pyodideLoadStatus = PyodideLoadStatus.LOADING;
    },
    pyodideLoaded: (state) => {
      console.log('pyodideLoaded');
      state.pyodideLoadStatus = PyodideLoadStatus.LOADED;
    },
    packageLoading: (state) => {
      console.log('packageLoading');
      state.isLoadingPackage = true;
    },
    packageLoaded: (state, payload) => {
      console.log('packageLoaded');
    },
  },
});

export const {
  pyodideLoading,
  pyodideLoaded,
  packageLoading,
  packageLoaded,
} = pyodideSlice.actions;

export const loadPyodide = () => async (dispatch) => {
  console.log('loadPyodide');
  dispatch(pyodideLoading());

  // set the pyodide files URL (packages.json, pyodide.asm.data etc)
  window.languagePluginUrl = 'https://pyodide-cdn2.iodide.io/v0.15.0/full/';

  console.log(window.languagePluginLoader);

  await window.languagePluginLoader;

  dispatch(pyodideLoaded());
};

export const selectIsPyodidedLoaded = (state) =>
  state.pyodide.pyodideLoadStatus === PyodideLoadStatus.LOADED;

export default pyodideSlice.reducer;
