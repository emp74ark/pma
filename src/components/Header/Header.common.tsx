import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { commonRoutes } from '../../routes/Routes';

export const NavCommon: FC = () => {
  return (
    <>
      {commonRoutes.map(({ title, path }) => (
        <li key={path} className="nav-item">
          <NavLink
            className='nav-link {({ isActive }) => (isActive ? "active" : undefined)}'
            to={path}
          >
            {title}
          </NavLink>
        </li>
      ))}
      <li className="nav-item">
        <NavLink
          className='nav-link {({ isActive }) => (isActive ? "active" : undefined)}'
          to="/auth"
        >
          Login
        </NavLink>
      </li>
    </>
  );
};
