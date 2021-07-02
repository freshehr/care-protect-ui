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
import { Button } from 'components';
import styled from 'styled-components';

const TablePaper = ({ children }) => (
  <Paper
    color="inherit"
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

export const RecommendationsPreview = () => {
  return (
    <Box p={1}>
      <Typography
        gutterBottom
        align="center"
        variant="h6"
        color="textSecondary"
      >
        Recommendations
      </Typography>
      <Wrapper>
        <TableContainer component={TablePaper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle1">Name</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">Type</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">Requested by</Typography>
                </TableCell>
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle2">Monitoring</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">All</Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">Name</Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">13.30 2-06-21</Typography>{' '}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle2">Monitoring</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">All</Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">Name</Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">13.30 2-06-21</Typography>{' '}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle2">Monitoring</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">All</Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">Name</Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">13.30 2-06-21</Typography>{' '}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle2">Monitoring</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">All</Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">Name</Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">13.30 2-06-21</Typography>{' '}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle2">Monitoring</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">12.15 6-06-21</Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">Accepted</Typography>{' '}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>
      <Box width="100%" display="flex" justifyContent="center">
        <Button.Secondary onClick={() => console.log('maxi')} disabled={false}>
          Show more
        </Button.Secondary>
      </Box>
    </Box>
  );
};

const Wrapper = styled.div`
  height: 200px;
  overflow: hidden;
  @media (min-width: 1280px) {
    padding: 0px 24px;
    background: #fafafa;
    margin: 8px;
    border-radius: 35px;
  }
`;
