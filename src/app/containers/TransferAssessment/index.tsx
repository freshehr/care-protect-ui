/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga, useInjectReducer } from 'utils/redux-injectors';
import { infectionControlSaga } from './saga';
import { sliceKey, actions, reducer } from './slice';
import { useParams, useHistory } from 'react-router-dom';
import { selectError, selectLoading, selectPatient } from './selectors';

import { Box, Grid, IconButton } from '@material-ui/core';
import { useStyles } from './style';
import CloseIcon from '@material-ui/icons/Close';

import { Card, CardContent, AppBarSubpage, Spinner } from 'components';
import { Nutrition } from './Nutrition';
import { AugIorn } from './AugIorn';
import axios, { AxiosRequestConfig } from 'axios';

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

  const [resultSet, setResultSet] = useState([]);

  const aql = `SELECT c/uid/value AS uid,
    e/ehr_id/value AS ehrId,
    c/context/start_time/value AS obsDate,
    u/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/magnitude AS Height,
  i/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude AS Weight,
  w/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/magnitude AS Body_mass_index,
  o/data[at0001]/events[at0002]/data[at0003]/items[at0015]/value/magnitude AS MUST_score,
  b/data[at0001]/events[at0002]/data[at0003]/items[at0079]/value/defining_code/code_string AS AIorNGroupCode,
  b/data[at0001]/events[at0002]/data[at0003]/items[at0079]/value/value AS AIorNGroupText,
  f/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/value AS CFSOrdinal,
  f/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/symbol/value AS CFSText,
  f/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/symbol/defining_code/code_string AS CFSCode
  FROM EHR e[ehr_id/value = '3e674739-950c-4b8a-976b-5aef21c618c5']
  CONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.report.v1]
  CONTAINS (OBSERVATION u[openEHR-EHR-OBSERVATION.height.v2] or OBSERVATION i[openEHR-EHR-OBSERVATION.body_weight.v2] or OBSERVATION w[openEHR-EHR-OBSERVATION.body_mass_index.v2] or OBSERVATION o[openEHR-EHR-OBSERVATION.must.v0] and OBSERVATION b[openEHR-EHR-OBSERVATION.augmented_iorn.v0] or OBSERVATION f[openEHR-EHR-OBSERVATION.clinical_frailty_scale.v1])
  WHERE c/name/value = 'Transfer assessment'
  ORDER BY c/context/start_time/value ASC`;

  const config: AxiosRequestConfig = {
    method: 'post',
    url: 'https://cdr.code4health.org/rest/openehr/v1/query/aql',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        'Basic YTgxZjQ3YzYtYTc1Ny00ZTM0LWI2NDQtM2NjYzYyYjRhMDFjOiQyYSQxMCQ2MTlraQ==',
    },
    data: JSON.stringify({ q: aql }),
  };

  const fetchData = async () => {
    const { data } = await axios(config);
    setResultSet(data.rows);
  };

  // Trigger the fetchData after the initial render by using the useEffect hook
  useEffect(() => {
    fetchData();
  }, []);

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
              <Grid container justify="center" spacing={6}>
                <Grid item xs={6} md={6}>
                  <Nutrition resultSet={resultSet} />
                </Grid>
                <Grid item xs={6} md={6}>
                  <AugIorn resultSet={resultSet} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
