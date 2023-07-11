import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { commonRoutes } from '../../routes/Routes';
import { RootState } from '../../redux/store';
import { resetAuth } from '../../redux/authSlice';
import { useTranslation } from 'react-i18next';
import { closeOffcanvas } from '../../redux/settingsSlice';

export const NavCommon: FC = () => {
  const { setting } = useSelector((state: RootState) => state);
  const colorText = setting.theme === 'dark' ? 'white' : 'black';
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      {commonRoutes.map(({ title, path }) => (
        <NavLink
          key={path}
          className={({ isActive }) =>
            isActive ? `nav-link fw-bold text-${colorText}` : `nav-link text-${colorText}`
          }
          onClick={() => {
            dispatch(resetAuth());
            dispatch(closeOffcanvas());
          }}
          to={path}
        >
          {t(`routes.${title}`)}
        </NavLink>
      ))}
    </>
  );
};
