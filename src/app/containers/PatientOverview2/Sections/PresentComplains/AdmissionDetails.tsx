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

export const AdmissionDetails = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box mt={2}>
        <TableContainer component={TablePaper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle1">Admission</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">Reason</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">Discharge</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2">28-06-2021</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    High level text description
                  </Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    Expected 10-07-2021
                  </Typography>{' '}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2">13-05-2021</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    High level text description
                  </Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    15-05-2021 (2 days)
                  </Typography>{' '}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
