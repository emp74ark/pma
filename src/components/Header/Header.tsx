import { FC } from 'react';
import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLocale, toggleTheme } from '../../redux/settingsSlice';
import { RootState } from '../../redux/store';
import { NavCommon } from './Header.common';
import { NavUser } from './Header.user';

export const Header: FC = () => {
  const { login } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const selectLocaleHandler = (key: string | null) => {
    const value = key ? key : 'en';
    dispatch(toggleLocale(value));
  };

  const selectThemeHandler = (key: string | null) => {
    const value = key ? key : 'light';
    dispatch(toggleTheme(value));
  };

  return (
    <nav className="row bg-light align-items-center">
      <h2 className="col">PMA</h2>
      <ul className="nav col-6">
        {!login && <NavCommon />}
        {login && <NavUser />}
      </ul>
      <DropdownButton
        className="col"
        id="locale"
        onSelect={(key) => selectLocaleHandler(key)}
        title="Language"
      >
        <DropdownItem eventKey={'en'}>English</DropdownItem>
        <DropdownItem eventKey={'ru'}>Russian</DropdownItem>
      </DropdownButton>
      <DropdownButton
        className="col"
        id="theme"
        onSelect={(key) => selectThemeHandler(key)}
        title="Theme"
      >
        <DropdownItem eventKey={'light'}>Light</DropdownItem>
        <DropdownItem eventKey={'dark'}>Dark</DropdownItem>
      </DropdownButton>
    </nav>
  );
};
