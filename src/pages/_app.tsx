import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from 'src/store';
import 'src/styles/global.scss';
import UserProvider from 'src/context/userContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </Provider>
  );
}
