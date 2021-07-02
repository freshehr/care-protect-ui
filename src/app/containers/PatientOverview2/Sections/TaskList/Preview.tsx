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

export const TaskListPreview = () => {
  return (
    <Box p={1}>
      <Typography
        gutterBottom
        align="center"
        variant="h6"
        color="textSecondary"
      >
        Task List
      </Typography>
      <Wrapper>
        <TableContainer component={TablePaper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle1">Task</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">Time Due</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">Status</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle2">Monitoring</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">13.30 2-06-21</Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" flexDirection="row">
                    <Badge color="#029244" />
                    <Box mr={1} />
                    <Typography variant="subtitle2">Complete</Typography>
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle2">
                    Delegate into a senior nurse
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2">13.15 6-06-21</Typography>{' '}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" flexDirection="row">
                    <Badge color="#F7931F" />
                    <Box mr={1} />
                    <Typography variant="subtitle2">
                      Awaiting outcome
                    </Typography>
                  </Box>{' '}
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
                  <Box display="flex" flexDirection="row">
                    <Badge color="#FEFF02" />
                    <Box mr={1} />
                    <Typography variant="subtitle2">Accepted</Typography>
                  </Box>
                  <Typography variant="subtitle2"></Typography>{' '}
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
  height: 250px;
  overflow: hidden;
  @media (min-width: 1280px) {
    padding: 0px 24px;
    background: #fafafa;
    margin: 8px;
    border-radius: 35px;
  }
`;
const Badge = styled.div`
  background-color: ${({ color }) => color};
  height: 25px;
  width: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 38%;
`;
