import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { userRoutes } from '../../routes/Routes';
import { logOut } from '../../redux/authSlice';
import { RootState } from '../../redux/store';

export const NavUser: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state: RootState) => state.setting);
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
              isActive
                ? `nav-link text-decoration-none text-${colorText}`
                : `nav-link text-${colorText}`
            }
            to={path}
          >
            {title}
          </NavLink>
        </li>
      ))}
      <li className="nav-item">
        <span onClick={() => logoutHandler()} className={`nav-link text-${colorText}`}>
          Log out
        </span>
      </li>
    </>
  );
};
