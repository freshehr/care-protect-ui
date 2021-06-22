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
  CardContent,
  AppBarSubpage,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Spinner,
} from 'components';
import { Nutrition } from './Nutrition';
import { TestStatus } from './TestStatus';

import { IsolationStatus } from './IsolationStatus';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IornAugmented } from './IornAugmented';
import { CovidStatus } from '../InfectionControl/CovidStatus';

export function TransferAssessment() {
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
        <title>{`Transfer Assessment`}</title>
        <meta name="description" content={`Transfer Assessment`} />
      </Helmet>
      <AppBarSubpage header={`Transfer Assessment`}>
        <IconButton
          color="inherit"
          onClick={goBack}
          edge="start"
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </AppBarSubpage>
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
              <CardContent
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
              <Grid container justify="center" spacing={4}>
                <Grid item xs={6} md={6}>
                  <Nutrition />
                </Grid>
                <Grid item xs={6} md={6}>
                  <IornAugmented />
                </Grid>
              </Grid>
            </Box>

            <Box p={1}>
              <Box p={1}></Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
