import { About } from '../pages/About/About';
import { Auth } from '../pages/Auth/Auth';
import { BoardPage } from '../pages/Board/Board';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import { UFO } from '../pages/UFO/UFO';
import { UserProfile } from '../pages/User/User';
import { Welcome } from '../pages/Welcome/Welcome';

export const commonRoutes = [
  { title: 'Welcome', path: '/', element: <Welcome /> },
  { title: 'About', path: '/about', element: <About /> },
];

export const userRoutes = [
  { title: 'Dashboard', path: '/user/dashboard', element: <Dashboard /> },
  { title: 'User', path: '/user/cabinet', element: <UserProfile /> },
];

const taskRoutes = [
  {
    title: 'Board',
    path: '/user/board/:boardId',
    element: <BoardPage />,
  },
];

export const appRoutes = [
  ...commonRoutes,
  { title: 'UFO', path: '/*', element: <UFO /> },
  { title: 'Sign Up', path: '/signup', element: <SignUp /> },
  { title: 'Sign In', path: '/signIn', element: <SignIn /> },
];

export const protectedRoutes = [...userRoutes, ...taskRoutes];
