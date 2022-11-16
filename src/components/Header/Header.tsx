import { FC, useEffect } from 'react';
import { Container, DropdownButton, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLocale, toggleTheme } from '../../redux/settingsSlice';
import { RootState } from '../../redux/store';
import { NavCommon } from './Header.common';
import { NavUser } from './Header.user';

export const Header: FC = () => {
  const { login } = useSelector((state: RootState) => state.auth);
  const { theme } = useSelector((state: RootState) => state.setting);
  const dispatch = useDispatch();
  const colorText = theme === 'dark' ? 'white' : 'black';
  const selectLocaleHandler = (key: string | null) => {
    const value = key ? key : 'en';
    dispatch(toggleLocale(value));
  };

  const selectThemeHandler = (key: string | null) => {
    const value = key ? key : 'light';
    dispatch(toggleTheme(value));
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Navbar collapseOnSelect expand="lg" className={`bg-${theme} text-${colorText}`}>
      <Container fluid>
        <Navbar.Brand className={`text-${colorText}`}>PMA</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand"
          placement="end"
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="ms-auto">
              {!login && <NavCommon />}
              {login && <NavUser />}
            </Nav>
            <Nav className="d-flex gap-2 ms-auto">
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
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
