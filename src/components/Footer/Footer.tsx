import { FC } from 'react';
import { contacts } from './Footer.props';

export const Footer: FC = () => {
  return (
    <footer className="bg-light d-flex justify-content-center">
      <ul className="nav">
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
