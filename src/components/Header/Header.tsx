import { FC } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { NavLink } from "react-router-dom";
import { commonRoutes, userRoutes } from "../../routes/Routes";

export const Header: FC = () => {
  const authenticated = true;

  return (
    <nav className="row bg-light">
      <h2 className="col">Header</h2>
      <ul className="nav col-6">
        {commonRoutes.map(({ title, path }) => (
          <li key={path} className='nav-item'>
            <NavLink
              end
              className='nav-link {({ isActive }) => (isActive ? "active" : undefined)}'
              to={path}
            >
              {title}
            </NavLink>
          </li>
        ))}
        {authenticated && userRoutes.map(({title, path}) => (
          <li key={path} className='nav-item'>
          <NavLink
            end
            className='nav-link {({ isActive }) => (isActive ? "active" : undefined)}'
            to={path}
          >
            {title}
          </NavLink>
        </li>
        ))}
      </ul>
      <Dropdown className="col">
        <DropdownToggle variant="secondary" id='locale'>
          Language
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>English</DropdownItem>
          <DropdownItem>Russian</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </nav>
  );
};
