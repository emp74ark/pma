import { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { AddBoard } from './components/Modal/AddBoard';
import { EditBoard } from './components/Modal/EditBoard';
import { ModalSession } from './components/Modal/ModalSession';
import { RemoveBoard } from './components/Modal/RemoveBoard';
import { SpinnerComponent } from './components/Spinner/Spinner';
import { RootState } from './redux/store';
import { appRoutes, protectedRoutes } from './routes/Routes';
import { sessionIsExpired } from './services/session.service';
import { sessionCheckInterval } from './shared/environment';

const App: FC = () => {
  const { auth, setting, modal } = useSelector((state: RootState) => state);

  useEffect(() => {
    let timerId: NodeJS.Timer;
    if (!auth.exp) timerId = setInterval(sessionIsExpired, sessionCheckInterval);
    return () => {
      clearInterval(timerId);
    };
  }, [auth]);

  return (
    <BrowserRouter>
      {setting.loading && <SpinnerComponent />}
      <ModalSession />
      {modal.visible.addBoard && <AddBoard />}
      {modal.visible.editBoard && <EditBoard />}
      {modal.visible.remove && <RemoveBoard />}
      <Container fluid className="h-100 d-flex flex-column">
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
      </Container>
    </BrowserRouter>
  );
};

export default App;
