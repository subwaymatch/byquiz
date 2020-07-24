import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import counterReducer from 'lib/slices/counterSlice';
import {
  getFirebase,
  firebaseReducer,
  actionTypes as rrfActionTypes,
} from 'react-redux-firebase';
import { firestoreReducer, constants as rfConstants } from 'redux-firestore';

const extraArgument = {
  getFirebase,
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        // just ignore every redux-firebase and react-redux-firebase action type
        ...Object.keys(rfConstants.actionTypes).map(
          (type) => `${rfConstants.actionsPrefix}/${type}`
        ),
        ...Object.keys(rrfActionTypes).map(
          (type) => `@@reactReduxFirebase/${type}`
        ),
      ],
      ignoredPaths: ['firebase', 'firestore'],
    },
    thunk: {
      extraArgument,
    },
  }),
];

const store = configureStore({
  reducer: {
    counter: counterReducer,
    firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
  },
  middleware,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

export default store;
