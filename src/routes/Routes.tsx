import { BoardPage } from '../pages/Board/Board';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import { UFO } from '../pages/UFO/UFO';
import { UserProfile } from '../pages/User/User';
import { Welcome } from '../pages/Welcome/Welcome';
import { Protected } from './Protected';

export const commonRoutes = [{ title: 'welcome', path: '/', element: <Welcome /> }];

export const authRoutes = [
  { title: 'signIn', path: '/signin', element: <SignIn /> },
  { title: 'signUp', path: '/signup', element: <SignUp /> },
];

export const userRoutes = [
  {
    title: 'dashboard',
    path: '/user/dashboard',
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
  {
    title: 'user',
    path: '/user/cabinet',
    element: (
      <Protected>
        <UserProfile />
      </Protected>
    ),
  },
];

const taskRoutes = [
  {
    title: 'board',
    path: '/user/board/:boardId',
    element: (
      <Protected>
        <BoardPage />
      </Protected>
    ),
  },
];

export const appRoutes = [
  ...commonRoutes,
  ...authRoutes,
  ...userRoutes,
  ...taskRoutes,
  { title: 'ufo', path: '*', element: <UFO /> },
];
