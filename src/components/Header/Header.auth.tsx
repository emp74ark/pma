import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { resetAuth } from '../../redux/authSlice';
import { useTranslation } from 'react-i18next';
import { authRoutes } from '../../routes/Routes';
import { closeOffcanvas } from '../../redux/settingsSlice';

export const NavAuth: FC = () => {
  const { setting } = useSelector((state: RootState) => state);
  const colorText = setting.theme === 'dark' ? 'white' : 'black';
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <>
      {authRoutes.map(({ title, path }) => (
        <NavLink
          key={path}
          className={({ isActive }) =>
            isActive ? `nav-link fw-bold text-${colorText}` : `nav-link text-${colorText}`
          }
          onClick={() => {
            dispatch(resetAuth()), dispatch(closeOffcanvas());
          }}
          to={path}
        >
          {t(`routes.${title}`)}
        </NavLink>
      ))}
    </>
  );
};
