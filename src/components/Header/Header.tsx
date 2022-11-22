import { FC, useEffect, useState } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { RootState } from '../../redux/store';
import { NavCommon } from './Header.common';
import { NavUser } from './Header.user';
import { NavAuth } from './Header.auth';
import { LocaleSelector } from './Header.locale';
import { ThemeSelector } from './Header.theme';

export const Header: FC = () => {
  const {
    auth: { login },
    setting: { theme },
  } = useSelector((state: RootState) => state);
  const colorText = theme === 'dark' ? 'white' : 'black';
  const [isScrolling, setScrolling] = useState<boolean>(false);
  const scrollingTheme = theme === 'dark' ? 'secondary' : 'warning';
  const headerTheme = isScrolling ? scrollingTheme : theme;

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
      className={`bg-${headerTheme} text-${colorText} rounded shadow-sm mt-2 mb-3`}
      style={{ top: '.2rem' }}
    >
      <Container fluid>
        <Navbar.Brand className={`text-${colorText} nav-link`}>
          <NavLink className={`text-decoration-none text-${colorText}`} to="/">
            <i className="bi-kanban fs-3" />
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
            <Nav className="gap-3 justify-content-center w-100">
              <NavCommon />
              {!login && <NavAuth />}
              {login && <NavUser />}
            </Nav>
            <LocaleSelector />
            <ThemeSelector />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
