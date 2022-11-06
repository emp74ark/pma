import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { userRoutes } from '../../routes/Routes';
import { logOut } from '../../redux/authSlice';

export const NavUser: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logOut());
    navigate('/auth');
  };

  return (
    <>
      {userRoutes.map(({ title, path }) => (
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
        <span onClick={() => logoutHandler()} className="nav-link">
          Log out
        </span>
      </li>
    </>
  );
};
