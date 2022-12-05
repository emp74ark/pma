import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { userRoutes } from '../../routes/Routes';
import { logOut } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { closeOffcanvas } from '../../redux/settingsSlice';

export const NavUser: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state: RootState) => state.setting);
  const { t } = useTranslation();
  const colorText = theme === 'dark' ? 'white' : 'black';

  const logoutHandler = () => {
    dispatch(logOut());
    navigate('/signin');
  };

  return (
    <>
      {userRoutes.map(({ title, path }) => (
        <li key={path} className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? `nav-link fw-bold text-${colorText}` : `nav-link text-${colorText}`
            }
            onClick={() => dispatch(closeOffcanvas())}
            to={path}
          >
            {t(`routes.${title}`)}
          </NavLink>
        </li>
      ))}
      <li className="nav-item">
        <span
          role="button"
          onClick={() => {
            logoutHandler();
            dispatch(closeOffcanvas());
          }}
          className={`nav-link text-${colorText}`}
        >
          {t(`header.logout`)}
        </span>
      </li>
    </>
  );
};
