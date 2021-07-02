import React, { Children } from 'react';
import {
  Typography,
  Box,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Table,
  Paper,
} from '@material-ui/core';
const TablePaper = ({ children }) => (
  <Paper
    variant="outlined"
    style={{
      borderColor: '#fafafa',
      width: '100%',
      backgroundColor: '#fafafa',
    }}
  >
    {children}
  </Paper>
);

export const Allergies = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="row"
        alignContent="center"
        alignItems="center"
      >
        <TableContainer component={TablePaper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  {' '}
                  <Typography variant="subtitle1">Name</Typography>
                </TableCell>
                <TableCell align="left">
                  {' '}
                  <Typography variant="subtitle1">Severity</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2">
                    Name of allergy or past reaction
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">Low</Typography>{' '}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
