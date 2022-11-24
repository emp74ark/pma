import { FC } from 'react';
import { Container } from 'react-bootstrap';
import kanban from '../../assets/images/kanban.png';
import monitoring from '../../assets/images/monitoring.png';
import { useTranslation } from 'react-i18next';

export const Welcome: FC = () => {
  const { t } = useTranslation();
  return (
    <Container className="flex-fill">
      <h2 className="col text-center">{t('welcome.title')}</h2>
      <img src={kanban} className="img-fluid" alt="Kanban" />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod dolor temporibus sed quasi
        repudiandae dignissimos quis suscipit assumenda dolore quae!
      </p>
      <img src={monitoring} className="img-fluid" alt="Monitoring" />
      <img src={kanban} className="img-fluid" alt="Kanban" />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod dolor temporibus sed quasi
        repudiandae dignissimos quis suscipit assumenda dolore quae!
      </p>
      <img src={monitoring} className="img-fluid" alt="Monitoring" />
    </Container>
  );
};
