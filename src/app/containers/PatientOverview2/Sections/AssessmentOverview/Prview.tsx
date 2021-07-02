import React, { Children } from 'react';
import {
  Typography,
  Box,
  Grid,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Table,
  Paper,
  Divider,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  Button,
  News2Icon,
  DenwisIcon,
  SepsisIcon,
  CovidIcon,
} from 'components';
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

export const AssessmentOverviewPreview = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints?.up('md'));
  return (
    <Box p={1} display="flex" flexDirection="column">
      <Typography
        gutterBottom
        align="center"
        variant="h6"
        color="textSecondary"
      >
        Assessment Overview
      </Typography>
      <Wrapper
        display="flex"
        flexDirection={md ? 'row' : 'column'}
        height={md ? '300px' : '480px'}
      >
        <Box display="flex" flexDirection="column" width={md ? '50%' : '100%'}>
          <Typography
            gutterBottom
            align="center"
            variant="subtitle2"
            color="textSecondary"
          >
            Last Assessment
          </Typography>
          <TableContainer component={TablePaper}>
            <Table aria-label="simple table" padding="checkbox">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Box display="flex" flexDirection="row">
                      <Typography variant="subtitle1">Assessor:</Typography>
                      <Box mr={1} />
                      <Typography variant="subtitle1">Name</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      p={1}
                    >
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Typography variant="subtitle1">Date:</Typography>
                        <Box mr={1} />
                        <Typography variant="subtitle1">02-06-2021</Typography>
                      </Box>{' '}
                      <Button.Primary variant="contained">
                        View all
                      </Button.Primary>
                      {/* </Box> */}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <News2Icon
                      label
                      news2={{
                        value: 3,
                        trend: 'first',
                        clinicalRisk: 'at0057',
                      }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Box
                      width="100%"
                      display="flex"
                      // flexShrink="1"
                      flexDirection="column"
                    >
                      <Typography variant="body1">
                        Key Item/ Recommendation1
                      </Typography>
                      <Typography variant="body1">
                        Key Item/ Recommendation2
                      </Typography>
                      <Typography variant="body1">
                        Key Item/ Recommendation3
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <SepsisIcon value={{ value: 'red' }} label />
                  </TableCell>
                  <TableCell align="left">
                    <Box
                      width="100%"
                      display="flex"
                      // flexShrink="1"
                      flexDirection="column"
                    >
                      <Typography variant="body1">
                        Key Item/ Recommendation1
                      </Typography>
                      <Typography variant="body1">
                        Key Item/ Recommendation2
                      </Typography>
                      <Typography variant="body1">
                        Key Item/ Recommendation3
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <DenwisIcon
                      label
                      denwis={{ trend: 'decreasing', value: 14 }}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Box
                      width="100%"
                      display="flex"
                      // flexShrink="1"
                      flexDirection="column"
                    >
                      <Typography variant="body1">
                        Key Item/ Recommendation1
                      </Typography>
                      <Typography variant="body1">
                        Key Item/ Recommendation2
                      </Typography>
                      <Typography variant="body1">
                        Key Item/ Recommendation3
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box m={1} />
        <Box display="flex" flexDirection="column" width={md ? '50%' : '100%'}>
          <Typography
            gutterBottom
            align="center"
            variant="subtitle2"
            color="textSecondary"
          >
            Previous Assessments
          </Typography>
          <TableContainer component={TablePaper}>
            <Table aria-label="simple table" padding="checkbox">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Box display="flex" flexDirection="row">
                      <Typography variant="subtitle1">Assessor:</Typography>
                      <Box mr={1} />
                      <Typography variant="subtitle1">Name</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      p={1}
                    >
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Typography variant="subtitle1">Date:</Typography>
                        <Box mr={1} />
                        <Typography variant="subtitle1">02-06-2021</Typography>
                      </Box>
                      <Button.Primary variant="contained">
                        View all
                      </Button.Primary>
                      {/* </Box> */}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" colSpan={2}>
                    <Box display="flex" flexDirection="row">
                      <CovidIcon
                        label
                        value={{
                          date_isolation_due_to_end: '2020-11-10T22:39:31.826Z',
                          suspected_covid_status: 'grey',
                          covid_test_request: {
                            date: '2020-11-10T22:39:31.826Z',
                            value: 'EXAMPLE TEXT',
                          },
                        }}
                      />

                      <News2Icon
                        label
                        news2={{
                          value: 3,
                          trend: 'first',
                          clinicalRisk: 'at0057',
                        }}
                      />
                      <DenwisIcon
                        label
                        denwis={{ trend: 'decreasing', value: 14 }}
                      />
                      <SepsisIcon value={{ value: 'red' }} label />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Wrapper>

      <Box width="100%" display="flex" justifyContent="center">
        <Button.Secondary onClick={() => console.log('maxi')} disabled={false}>
          Show more
        </Button.Secondary>
      </Box>
    </Box>
  );
};

const Wrapper = styled(Box)`
  width: 100%;
  overflow: hidden;
`;
