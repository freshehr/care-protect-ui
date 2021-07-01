import React from 'react';
import { BoxWrapper } from 'components';
import { Box } from '@material-ui/core';

interface Props {
  children: React.ReactNode[];
}
export const ToolBar: React.FC<Props> = ({ children }) => {
  return (
    <BoxWrapper>
      <Box display="flex" flexWrap="nowrap" alignItems="center" p={1}>
        <Box width="80%">{children[0]}</Box>
        <Box width="20%">{children[1]}</Box>
      </Box>
    </BoxWrapper>
  );
};
