import { FC } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { SpinnerComponent } from './components/Spinner/Spinner';
import { RootState } from './redux/store';
import { appRoutes, protectedRoutes } from './routes/Routes';

const App: FC = () => {
  const { auth, setting } = useSelector((state: RootState) => state);
  return (
    <BrowserRouter>
      {setting.loading && <SpinnerComponent />}
      <Header />
      <Routes>
        {appRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {auth.login &&
          protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
