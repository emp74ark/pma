import React from 'react';
import { Button } from 'react-bootstrap';
import { CustomButtonProps } from '../../shared/interfaces';

const EditButton = (props: CustomButtonProps) => {
  const { onClick, className } = props;
  return (
    <Button onClick={onClick} className={className} variant="outline-primary" size="sm">
      <i className="bi-pencil-square" style={{ fontSize: '15px', color: 'blue' }}></i>
    </Button>
  );
};

export default EditButton;
