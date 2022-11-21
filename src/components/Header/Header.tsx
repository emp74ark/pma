import { FC, useEffect } from 'react';
import { Container, DropdownButton, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { toggleLocale, toggleTheme } from '../../redux/settingsSlice';
import { RootState } from '../../redux/store';
import { NavCommon } from './Header.common';
import { NavUser } from './Header.user';
import { useTranslation } from 'react-i18next';

export const Header: FC = () => {
  const {
    auth: { login },
    setting: { theme },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
                title={t('header.lang.title')}
              >
                <DropdownItem eventKey={'en'}>{t('header.lang.english')}</DropdownItem>
                <DropdownItem eventKey={'ru'}>{t('header.lang.russian')}</DropdownItem>
              </DropdownButton>
              <DropdownButton
                id="theme"
                onSelect={(key) => selectThemeHandler(key)}
                title={t('header.theme.title')}
              >
                <DropdownItem eventKey={'light'}>{t('header.theme.light')}</DropdownItem>
                <DropdownItem eventKey={'dark'}>{t('header.theme.dark')}</DropdownItem>
              </DropdownButton>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
