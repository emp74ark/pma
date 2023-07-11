import { FC } from 'react';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { DropdownButton } from 'react-bootstrap';
import { closeOffcanvas, toggleLocale } from '../../redux/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../redux/store';

export const LocaleSelector: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    setting: { locale },
  } = useSelector((state: RootState) => state);

  const selectLocaleHandler = (key: string | null) => {
    const value = key ? key : 'en';
    dispatch(toggleLocale(value));
    dispatch(closeOffcanvas());
  };

  return (
    <DropdownButton
      id="locale"
      variant="secondary"
      onSelect={(key) => selectLocaleHandler(key)}
      title={locale.toUpperCase()}
      className="pe-3"
      size="sm"
    >
      <DropdownItem eventKey={'en'}>{t('header.lang.english')}</DropdownItem>
      <DropdownItem eventKey={'ru'}>{t('header.lang.russian')}</DropdownItem>
    </DropdownButton>
  );
};
