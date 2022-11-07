import { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export const SpinnerComponent: FC = () => {
  return (
    <div>
      <Spinner
        animation="border"
        variant="primary"
        className="position-fixed top-50 start-50 translate-middle"
      />
      <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-secondary opacity-50" />
    </div>
  );
};
