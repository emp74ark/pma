import { FC, Suspense, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ModalCommon } from './components/Modal/ModalCommon';
import { RootState } from './redux/store';
import { appRoutes } from './routes/Routes';
import { sessionIsExpired } from './services/session.service';
import { sessionCheckInterval } from './shared/environment';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback/ErrorFallback';

const App: FC = () => {
  const { auth } = useSelector((state: RootState) => state);

  useEffect(() => {
    let timerId: NodeJS.Timer;
    if (!auth.exp) timerId = setInterval(sessionIsExpired, sessionCheckInterval);
    return () => {
      clearInterval(timerId);
    };
  }, [auth]);

  return (
    <HashRouter>
      <ModalCommon />
      <Container fluid className="h-100 d-flex flex-column">
        <Header />
        <Suspense>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Routes>
              {appRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Footer />
      </Container>
    </HashRouter>
  );
};

export default App;
