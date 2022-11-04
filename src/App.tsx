import { FC } from 'react';
import { Provider } from 'react-redux';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { store } from './redux/store';

interface AppProps {
  children: JSX.Element
}

const App: FC<AppProps> = (props) => {

  return (
    <Provider store={store}>
      <Header />
      {props.children}
      <Footer />
    </Provider>
  );
}

export default App;
