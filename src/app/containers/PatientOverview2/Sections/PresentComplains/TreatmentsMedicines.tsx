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

export const TreatmentsMedicines = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box mt={2} mb={1} color="textSecondary">
        {' '}
        <Typography variant="subtitle1"> Treatments</Typography>
      </Box>
      <Box>
        <TableContainer component={TablePaper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle1">Name</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">Frequency</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2">Name of treatment</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    Frequency prescribed
                  </Typography>{' '}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mt={2} mb={1} color="textSecondary">
        {' '}
        <Typography variant="subtitle1"> Medicines</Typography>
      </Box>
      <Box>
        <TableContainer component={TablePaper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle1">Name</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">Frequency</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">Dosage</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2">Name of medicines</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    Frequency prescribed
                  </Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    Dosage of medicine
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
