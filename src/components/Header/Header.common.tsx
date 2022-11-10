import { FC } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { commonRoutes } from '../../routes/Routes';

export const NavCommon: FC = () => {
  return (
    <>
      {commonRoutes.map(({ title, path }) => (
        <NavLink
          key={path}
          className={({ isActive }) => (isActive ? 'nav-link text-decoration-none' : 'nav-link')}
          to={path}
        >
          {title}
        </NavLink>
      ))}
      <NavLink
        className={({ isActive }) => (isActive ? 'nav-link text-decoration-none' : 'nav-link')}
        to="/auth"
      >
        Login
      </NavLink>
    </>
  );
};
