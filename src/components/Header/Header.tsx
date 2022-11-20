import { FC, useEffect, useState } from 'react';
import { Container, DropdownButton, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { toggleLocale, toggleTheme } from '../../redux/settingsSlice';
import { RootState } from '../../redux/store';
import { NavCommon } from './Header.common';
import { NavUser } from './Header.user';

export const Header: FC = () => {
  const {
    auth: { login },
    setting: { theme },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const colorText = theme === 'dark' ? 'white' : 'black';
  const [isScrolling, setScrolling] = useState<boolean>(false);
  const headerTheme = isScrolling ? 'secondary' : theme;
  const selectLocaleHandler = (key: string | null) => {
    const value = key ? key : 'en';

    dispatch(toggleLocale(value));
  };

  const selectThemeHandler = (key: string | null) => {
    const value = key ? key : 'light';
    dispatch(toggleTheme(value));
  };

  const handleScroll = () => {
    if (window.scrollY >= 8) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      className={`bg-${headerTheme} text-${colorText} shadow`}
    >
      <Container fluid>
        <Navbar.Brand className={`text-${colorText} nav-link`}>
          <NavLink className={`text-decoration-none text-${colorText}`} to="/">
            PMA
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle className={`bg-light`} aria-controls="responsive-navbar-nav" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          className={`bg-${theme} text-${colorText}`}
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="gap-3 justify-content-end w-100">
              {!login && <NavCommon />}
              {login && <NavUser />}
              <DropdownButton
                id="locale"
                onSelect={(key) => selectLocaleHandler(key)}
                title="Language"
              >
                <DropdownItem eventKey={'en'}>English</DropdownItem>
                <DropdownItem eventKey={'ru'}>Russian</DropdownItem>
              </DropdownButton>
              <DropdownButton id="theme" onSelect={(key) => selectThemeHandler(key)} title="Theme">
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
