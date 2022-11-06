import { FC } from 'react';
import { Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { NavCommon } from './Header.common';
import { NavUser } from './Header.user';

export const Header: FC = () => {
  const { login } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="row bg-light align-items-center">
      <h2 className="col">PMA</h2>
      <ul className="nav col-6">
        {!login && <NavCommon />}
        {login && <NavUser />}
      </ul>
      <Dropdown className="col">
        <DropdownToggle variant="secondary" id="locale">
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
