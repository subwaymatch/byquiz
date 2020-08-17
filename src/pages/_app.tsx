import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { IconContext } from 'react-icons';
import { AnimatePresence } from 'framer-motion';
import firebase from 'src/firebase/clientApp';
import { useRouter } from 'next/router';

import store from 'src/store';
import 'src/styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';

function handleExitComplete() {}

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
  const router = useRouter();

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <IconContext.Provider
          value={{
            className: 'react-icon',
            style: { verticalAlign: 'middle' },
          }}
        >
          <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </IconContext.Provider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
