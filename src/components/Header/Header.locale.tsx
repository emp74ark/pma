import { FC } from 'react';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { DropdownButton } from 'react-bootstrap';
import { toggleLocale } from '../../redux/settingsSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const LocaleSelector: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectLocaleHandler = (key: string | null) => {
    const value = key ? key : 'en';
    dispatch(toggleLocale(value));
  };
  return (
    <DropdownButton
      id="locale"
      onSelect={(key) => selectLocaleHandler(key)}
      title={t('header.lang.title')}
      className="pe-3"
    >
      <DropdownItem eventKey={'en'}>{t('header.lang.english')}</DropdownItem>
      <DropdownItem eventKey={'ru'}>{t('header.lang.russian')}</DropdownItem>
    </DropdownButton>
  );
};
