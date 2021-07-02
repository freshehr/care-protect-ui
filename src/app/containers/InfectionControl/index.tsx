/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga, useInjectReducer } from 'utils/redux-injectors';
import { infectionControlSaga } from './saga';
import { sliceKey, actions, reducer } from './slice';
import { useParams, useHistory } from 'react-router-dom';
import { selectError, selectLoading, selectPatient } from './selectors';

import {
  Box,
  Grid,
  Typography,
  IconButton,
  List,
  ListItemText,
  ListItem,
} from '@material-ui/core';
import { useStyles } from './style';
import CloseIcon from '@material-ui/icons/Close';

import {
  Card,
  Record,
  AppBarSubpage,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Spinner,
} from 'components';
import { CovidStatus } from './CovidStatus';
import Header from '../Patient/Header';

import { TestStatus } from './TestStatus';
import { IsolationStatus } from './IsolationStatus';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export function InfectionControl() {
  useInjectSaga({ key: sliceKey, saga: infectionControlSaga });
  useInjectReducer({ key: sliceKey, reducer });

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const id = (params as any)?.id;
  const classes = useStyles();
  // const ref = React.useRef(null);

  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const patient = useSelector(selectPatient);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(actions.loadRecord(id));
    dispatch(actions.loadInfectionControl(id));
  });

  const [expanded, setExpanded] = React.useState({
    covid: 'covid',
    test: 'test',
    isolation: 'isolation',
  });

  const handleChange = panel => (event, isExpanded) => {
    setExpanded({ ...expanded, [panel]: isExpanded ? panel : false });
  };
  const goBack = () => history.push('/');
  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Helmet>
        <title>{`Patient Covid Status`}</title>
        <meta name="description" content={`Patient Covid Status`} />
      </Helmet>
      <Header title={'Patient Covid Status'} />

      <Box
        display="flex"
        flexWrap="nowrap"
        flexDirection="column"
        css={{ maxWidth: '100%' }}
      >
        {patient && (
          <Box width="100%">
            <Card
              name={patient?.name || ''}
              identifier={patient?.nhsnumber || ''}
              assesments={patient?.assessment}
              id={patient?.id || ''}
            >
              <Record
                birthDate={patient?.birthDate || ''}
                gender={patient?.gender || ''}
                location={patient?.location || ''}
              />
            </Card>
          </Box>
        )}

        <Box width="100%" className={classes.section}>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Box p={1} width="100%">
              <Grid container justify="center">
                <Grid item xs={12} md={4}>
                  <Accordion
                    expanded={expanded.covid === 'covid'}
                    onChange={handleChange('covid')}
                  >
                    <AccordionSummary
                      IconButtonProps={{ color: 'inherit' }}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography variant="subtitle2" component="h6">
                        <Box fontWeight={900}>COVID</Box>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <CovidStatus />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Accordion
                    expanded={expanded.test === 'test'}
                    onChange={handleChange('test')}
                  >
                    <AccordionSummary
                      IconButtonProps={{ color: 'inherit' }}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography variant="subtitle2" component="h6">
                        <Box fontWeight={900}>Test Status</Box>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TestStatus />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Accordion
                    expanded={expanded.isolation === 'isolation'}
                    onChange={handleChange('isolation')}
                  >
                    <AccordionSummary
                      IconButtonProps={{ color: 'inherit' }}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography variant="subtitle2" component="h6">
                        <Box fontWeight={900}>Isolation Status</Box>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <IsolationStatus />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Box p={1}>
            <Box p={1}>
              <Typography align="left" variant="subtitle1">
                <Box mr={1} fontWeight="fontWeightBold">
                  Covid History
                </Box>
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemText primary="User ZYX - Requested Test" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="User ZYX - Requested Test and 14 days Isolation" />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
