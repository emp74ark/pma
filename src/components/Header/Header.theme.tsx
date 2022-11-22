import DropdownItem from 'react-bootstrap/DropdownItem';
import { DropdownButton } from 'react-bootstrap';
import { toggleTheme } from '../../redux/settingsSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const ThemeSelector = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const selectThemeHandler = (key: string | null) => {
    const value = key ? key : 'light';
    dispatch(toggleTheme(value));
  };

  return (
    <DropdownButton
      id="theme"
      onSelect={(key) => selectThemeHandler(key)}
      title={t('header.theme.title')}
    >
      <DropdownItem eventKey={'light'}>{t('header.theme.light')}</DropdownItem>
      <DropdownItem eventKey={'dark'}>{t('header.theme.dark')}</DropdownItem>
    </DropdownButton>
  );
};
