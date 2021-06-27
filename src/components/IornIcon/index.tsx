import React from 'react';
import { Label, IconButton } from '../IconButton';
import Iorn from './Iorn';

const IornIcon = ({ iorn, label = false }) => {
  const color = iorn?.value === 0 ? 'grey' : iorn?.value > 4 ? 'red' : 'green';
  return (
    <IconButton onClick={() => console.log('a')}>
      <Iorn stroke={color} value={iorn?.value} trend={iorn?.trend} />
      {label && <Label>IORN</Label>}
    </IconButton>
  );
};

export default IornIcon;
