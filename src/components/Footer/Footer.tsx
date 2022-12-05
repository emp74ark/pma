import { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { contacts } from './Footer.props';

export const Footer: FC = () => {
  const { theme } = useSelector((state: RootState) => state.setting);

  return (
    <footer className={`bg-${theme} rounded shadow-sm mt-3 mb-2`}>
      <ul className="nav justify-content-center">
        {contacts.map((contact) => (
          <li key={contact.title} className="nav-item col-auto small">
            <a
              href={contact.url}
              target={'_blank'}
              rel={'noopener noreferrer'}
              className="nav-link"
            >
              <img src={contact.icon} alt={contact.title} className="icon" />
              {contact.title}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};
