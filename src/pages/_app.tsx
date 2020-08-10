import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import firebase from 'src/firebase/clientApp';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { IconContext } from 'react-icons';

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
        <IconContext.Provider
          value={{
            className: 'react-icon',
            style: { verticalAlign: 'middle' },
          }}
        >
          <Component {...pageProps} />
        </IconContext.Provider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
