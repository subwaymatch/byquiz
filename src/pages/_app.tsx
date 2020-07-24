import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import firebase from 'src/firebase/clientApp';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import store from 'src/store';
import 'src/styles/global.scss';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Component {...pageProps} />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
