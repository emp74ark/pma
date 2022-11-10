import { Button } from 'react-bootstrap';
import { CustomButtonProps } from '../../shared/interfaces';

const CreateButton = (props: CustomButtonProps) => {
  const { onClick, className } = props;
  return (
    <Button className={className} onClick={onClick} variant="outline-success" size="sm">
      <i className="bi-plus-lg"></i>
    </Button>
  );
};

export default CreateButton;
