import { FC } from 'react';
import { Container, Row } from 'react-bootstrap';
import ufo from '../../assets/images/ufo.png';

export const UFO: FC = () => {
  return (
    <Container>
      <Row>
        <h2 className="col">Page not found</h2>
      </Row>
      <Row className="b-fle justify-content-center">
        <img src={ufo} alt="Page not found" className="w-50" />
      </Row>
    </Container>
  );
};
