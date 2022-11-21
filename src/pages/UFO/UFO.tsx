import { FC } from 'react';
import { Container, Row } from 'react-bootstrap';
import ufo from '../../assets/images/ufo.png';
import { useTranslation } from 'react-i18next';

export const UFO: FC = () => {
  const { t } = useTranslation();
  return (
    <Container className="flex-fill">
      <Row>
        <h2 className="col text-center pt-5">{t('ufo.notFound')}</h2>
      </Row>
      <Row className="b-fle justify-content-center">
        <img src={ufo} alt="Page not found" className="w-50" />
      </Row>
    </Container>
  );
};
