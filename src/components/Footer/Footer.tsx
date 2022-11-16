import { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { contacts } from './Footer.props';

export const Footer: FC = () => {
  const { theme } = useSelector((state: RootState) => state.setting);
  return (
    <footer className={`bg-${theme} d-flex justify-content-center`}>
      <ul className="nav d-flex flex-wrap justify-content-center">
        {contacts.map((contact) => (
          <li key={contact.title} className="nav-item">
            <a href={contact.url} className="nav-link">
              <img src={contact.icon} alt={contact.title} className="icon" />
              {contact.title}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};
