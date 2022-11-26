import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const DeveloperCard = (props: { name: string; text: string; src: string }) => {
  const { name, text, src } = props;
  const {
    setting: { theme },
  } = useSelector((state: RootState) => state);
  const colorText = theme === 'dark' ? 'white' : 'black';
  return (
    <Card
      style={{ width: '20rem', height: 'auto' }}
      className={`developer bg-${theme} text-${colorText}`}
    >
      <div className="developer-image">
        <Card.Img src={src} />
      </div>
      <Card.Body className="developer-body">
        <Card.Title className="developer-title">{name}</Card.Title>
        <Card.Text className="developer-text">{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};
