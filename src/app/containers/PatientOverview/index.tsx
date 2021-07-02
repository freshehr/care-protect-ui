import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useInjectSaga, useInjectReducer } from 'utils/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { sliceKey, actions, reducer } from './slice';
import { patientOverviewSaga } from './saga';

import { Spinner, AppBarSubpage, Card, Record, Carousel } from 'components';
import { IconButton, Box, Typography } from '@material-ui/core';
import { selectError, selectLoading, selectPatient } from './selectors';
import CloseIcon from '@material-ui/icons/Close';
import { SituationBackgroundSteps } from './Secitons/SituatiionBackground';
import { AssesmentOverview } from './Secitons/AssesmentOverview';
import { RecomendationsActions } from './Secitons/RecomendationsActions';
import { useStyles } from './style';
import { useHistory, useParams } from 'react-router-dom';

export function PatientOverview() {
  useInjectSaga({ key: sliceKey, saga: patientOverviewSaga });
  useInjectReducer({ key: sliceKey, reducer });

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const id = (params as any)?.id;
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const patient = useSelector(selectPatient);

  React.useEffect(() => {
    dispatch(actions.loadRecord(id));
  }, [dispatch, id]);

  const goBack = () => history.go(-1);

  const situationBackgroundSteps = SituationBackgroundSteps();
  const assesmentOverview = AssesmentOverview({
    news2: { value: 9, clinicalRisk: 'at0057', trend: 'same' },
    denwis: {
      value: {
        trend: 'decreasing',
        value: 14,
      },
    },
    sepsis: {
      value: {
        value: 'amber',
      },
    },
    covid: {
      value: {
        date_isolation_due_to_end: '2020-11-10T22:39:31.826Z',
        suspected_covid_status: 'grey',
        covid_test_request: {
          date: '2020-11-10T22:39:31.826Z',
          value: 'EXAMPLE TEXT',
        },
      },
    },
  });
  const recomendationsActions = RecomendationsActions();

  if (isLoading) <Spinner />;

  if (error) <p>{error}</p>;

  return (
    <>
      <Helmet>
        <title>{`Patient Overview`}</title>
        <meta name="description" content={`Patient Overview`} />
      </Helmet>
      <AppBarSubpage header={`Patient Overview`}>
        <IconButton
          color="inherit"
          onClick={goBack}
          edge="start"
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </AppBarSubpage>

      {patient && (
        <Box
          display="flex"
          flexWrap="nowrap"
          flexDirection="column"
          css={{ maxWidth: '100%' }}
        >
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

          <Box mt={1} mb={1} className={classes.section}>
            <Typography align="center" variant="subtitle1">
              <Box mr={1} fontWeight="fontWeightBold">
                Presenting Complaint & Background
              </Box>
            </Typography>
            <Carousel>{situationBackgroundSteps}</Carousel>
          </Box>

          <Box mt={1} mb={1} className={classes.section}>
            <Typography align="center" variant="subtitle1">
              <Box mr={1} fontWeight="fontWeightBold">
                Assessment Overview{' '}
              </Box>
            </Typography>
            <Carousel>{assesmentOverview}</Carousel>
          </Box>

          <Box mt={1} mb={1} className={classes.section}>
            <Typography align="center" variant="subtitle1">
              <Box mr={1} fontWeight="fontWeightBold">
                Recomendations & Actions
              </Box>
            </Typography>
            <Carousel>{recomendationsActions}</Carousel>
          </Box>
        </Box>
      )}
    </>
  );
}
