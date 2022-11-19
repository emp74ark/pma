import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { commonRoutes } from '../../routes/Routes';
import { RootState } from '../../redux/store';
import { Button, Nav } from 'react-bootstrap';
import { mode, resetAuth } from '../../redux/authSlice';

export const NavCommon: FC = () => {
  const { setting, auth } = useSelector((state: RootState) => state);
  const colorText = setting.theme === 'dark' ? 'white' : 'black';
  const dispatch = useDispatch();
  return (
    <>
      {commonRoutes.map(({ title, path }) => (
        <NavLink
          key={path}
          className={({ isActive }) =>
            isActive
              ? `nav-link text-decoration-none text-${colorText}`
              : `nav-link text-${colorText}`
          }
          onClick={() => dispatch(resetAuth())}
          to={path}
        >
          {title}
        </NavLink>
      ))}
      <NavLink
        className={({ isActive }) =>
          isActive ? `text-decoration-none text-${colorText}` : `text-${colorText}`
        }
        to="/signup"
      >
        <Button
          variant={auth.mode === 'login' ? 'primary' : 'secondary'}
          onClick={() => dispatch(mode('login'))}
        >
          Sign Up
        </Button>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `text-decoration-none text-${colorText}` : `text-${colorText}`
        }
        to="/signin"
      >
        <Button
          variant={auth.mode === 'registration' ? 'primary' : 'secondary'}
          onClick={() => dispatch(mode('registration'))}
        >
          Sign In
        </Button>
      </NavLink>
    </>
  );
};
