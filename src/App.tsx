import { FC } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

interface AppProps {
  children: JSX.Element
}

const App: FC<AppProps> = (props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default App;
