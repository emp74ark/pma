import { About } from "../pages/About/About";
import { Auth } from "../pages/Auth/Auth";
import { Board } from "../pages/Board/Board";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { UFO } from "../pages/UFO/UFO";
import { User } from "../pages/User/User";
import { Welcome } from "../pages/Welcome/Welcome";

export const commonRoutes = [
  {title: 'Welcome', path: '/', element: <Welcome />},
  {title: 'About', path: '/about', element: <About />},
  {title: 'Authentication', path: '/auth', element: <Auth />},
]

export const userRoutes = [
  {title: 'User', path: '/user/cabinet', element: <User />},
  {title: 'Dashboard', path: '/user/dashboard', element: <Dashboard />},
]

const taskRoutes = [
  {title: 'Board', path: '/user/board/:boardId', element: <Board />},
]

export const appRoutes = [
  ...commonRoutes,
  ...userRoutes,
  ...taskRoutes,
  {title: 'UFO', path: '/*', element: <UFO />},
]