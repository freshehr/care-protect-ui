import React from 'react';
import { Label, IconButton } from '../IconButton';

const IornIcon = ({ iorn, label = false }) => {
  return (
    <IconButton onClick={() => console.log('a')}>
      G{label && <Label>ioRN</Label>}
    </IconButton>
  );
};

export default IornIcon;
