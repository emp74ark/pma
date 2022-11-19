import { FC } from 'react';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { commonRoutes } from '../../routes/Routes';
import { RootState } from '../../redux/store';

export const NavCommon: FC = () => {
  const { theme } = useSelector((state: RootState) => state.setting);
  const colorText = theme === 'dark' ? 'white' : 'black';

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
          to={path}
        >
          {title}
        </NavLink>
      ))}
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `nav-link text-decoration-none text-${colorText}`
            : `nav-link text-${colorText}`
        }
        to="/auth"
      >
        Login
      </NavLink>
    </>
  );
};
