import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { userRoutes } from '../../routes/Routes';
import { logOut } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { openModal } from '../../redux/modalSlice';

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

  const handleClick = () => {
    dispatch(openModal({ name: 'addBoard', data: null }));
  };

  return (
    <>
      <li>
        <Button className="col-auto" variant="success" onClick={handleClick}>
          <i className="bi-plus-circle">
            <span className="m-2">{t('dashboard.addBoard')}</span>
          </i>
        </Button>
      </li>
      {userRoutes.map(({ title, path }) => (
        <li key={path} className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? `nav-link fw-bold text-${colorText}` : `nav-link text-${colorText}`
            }
            to={path}
          >
            {t(`routes.${title}`)}
          </NavLink>
        </li>
      ))}
      <li className="nav-item">
        <span onClick={() => logoutHandler()} className={`nav-link text-${colorText}`}>
          {t(`header.logout`)}
        </span>
      </li>
    </>
  );
};
