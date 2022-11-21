import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { commonRoutes } from '../../routes/Routes';
import { RootState } from '../../redux/store';
import { Button } from 'react-bootstrap';
import { mode, resetAuth } from '../../redux/authSlice';
import { useTranslation } from 'react-i18next';

export const NavCommon: FC = () => {
  const { setting, auth } = useSelector((state: RootState) => state);
  const colorText = setting.theme === 'dark' ? 'white' : 'black';
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
          {t(`routes.${title}`)}
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
          {t(`header.signUp`)}
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
          {t(`header.signIn`)}
        </Button>
      </NavLink>
    </>
  );
};
