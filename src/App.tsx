import { FC } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { RootState } from './redux/store';
import { appRoutes, protectedRoutes } from './routes/Routes';

const App: FC = () => {
  const { login } = useSelector((state: RootState) => state.auth);
  return (
    <BrowserRouter>
      <h1>{login}</h1>
      <Header />
      <Routes>
        {appRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {login &&
          protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
