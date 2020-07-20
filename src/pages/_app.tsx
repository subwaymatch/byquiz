import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from 'src/store';
import 'src/styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
