import React from 'react';
import { Button } from 'reactstrap';

const CustomButton = ({ children, inverted, ...otherProps }) => (
  <Button className={`${inverted ? 'inverted' : ''} custom-button`} {...otherProps}>
    {children}
  </Button>
);

export default CustomButton;
