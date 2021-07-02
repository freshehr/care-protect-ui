import React from 'react';
import { Box, Typography } from '@material-ui/core';

const Text: React.FC<{
  label: string;
  children?: string | null;
}> = ({ label, children }) => (
  <Typography variant="subtitle1" component="div">
    <Box component="div" display="inline" fontWeight="fontWeightBold" mr={1}>
      {label}:
    </Box>
    {children && (
      <Box component="div" display="inline" fontWeight="fontWeightRegular">
        {children}
      </Box>
    )}
  </Typography>
);
export default Text;
