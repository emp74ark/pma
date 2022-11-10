import { FC } from 'react';
import { Container } from 'react-bootstrap';
import board from '../../assets/images/board.png';
import toyota from '../../assets/images/toyota.jpeg';

export const About: FC = () => {
  return (
    <Container>
      <h2>About</h2>
      <img src={board} alt="Kanban board" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt perferendis expedita hic quae
        illum eveniet corrupti fugit quia molestias dicta.
      </p>
      <img src={toyota} alt="Toyota" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam alias totam doloribus,
        ullam dolore id harum? Quo vel beatae velit sed deserunt nemo aperiam maxime veniam
        voluptatibus expedita, sunt odit!
      </p>
    </Container>
  );
};
