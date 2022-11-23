import { FC } from 'react';
import { Container } from 'react-bootstrap';
import board from '../../assets/images/board.png';
import toyota from '../../assets/images/toyota.jpeg';
import { useTranslation } from 'react-i18next';

export const About: FC = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <h2>{t('about.title')}</h2>
      <img src={board} className="img-fluid" alt="Kanban board" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt perferendis expedita hic quae
        illum eveniet corrupti fugit quia molestias dicta.
      </p>
      <img src={toyota} className="img-fluid" alt="Toyota" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam alias totam doloribus,
        ullam dolore id harum? Quo vel beatae velit sed deserunt nemo aperiam maxime veniam
        voluptatibus expedita, sunt odit!
      </p>
    </Container>
  );
};
