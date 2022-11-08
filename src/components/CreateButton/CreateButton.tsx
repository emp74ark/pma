import { Button } from 'react-bootstrap';
import { CustomButtonProps } from '../../shared/interfaces';

const CreateButton = (props: CustomButtonProps) => {
  const { onClick, className } = props;
  return (
    <Button className={className} onClick={onClick} variant="outline-success" size="sm">
      <i className="bi-bookmark-plus" style={{ fontSize: '15px', color: 'green' }}></i>
    </Button>
  );
};

export default CreateButton;
