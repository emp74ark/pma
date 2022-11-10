import { Button } from 'react-bootstrap';
import { CustomButtonProps } from '../../shared/interfaces';

const DeleteButton = (props: CustomButtonProps) => {
  const { onClick, className } = props;
  return (
    <Button onClick={onClick} className={className} variant="outline-danger" size="sm">
      <i className="bi-trash"></i>
    </Button>
  );
};

export default DeleteButton;
