/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectError, selectLoading, selectPatient } from './selectors';

import { Box, Grid, Typography, Button, IconButton } from '@material-ui/core';
import { useStyles } from './style';
import CloseIcon from '@material-ui/icons/Close';

import { Card, CardContent, AppBarSubpage, Spinner } from 'components';
import Iframe from 'react-iframe';
import { actions, reducer, sliceKey } from '../InfectionControl/slice';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors';
import { infectionControlSaga } from '../InfectionControl/saga';

export function SmartEhr() {
  useInjectSaga({ key: sliceKey, saga: infectionControlSaga });
  useInjectReducer({ key: sliceKey, reducer });

  const [formUrl, setFormUrl] = useState('https://freshehr.com');
  const [formId, setFormId] = useState('');
  const [ehrId, setEhrId] = useState('');
  const [compositionId, setCompositionId] = useState('');

  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const id = (params as any)?.id;
  const classes = useStyles();

  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const patient = useSelector(selectPatient);

  const configFormUrl = async () => {
    try {
      const formApp = process.env.PUBLIC_URL + '/formrender.html';
      const formUrl =
        compositionId === ''
          ? `${formApp}?ehrId=${ehrId}&form=${formId}`
          : `${formApp}?ehrId=${ehrId}&form=${formId}&uid=${compositionId}`;

      setFormUrl(formUrl);
    } catch (e) {
      console.log(e.message);
    }
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.loadRecord(id));
  });

  const handleClick = async () => {
    await configFormUrl();
  };

  const goBack = () => history.push('/');
  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <Spinner />;
  }

  const formButtons = () => {
    return (
      <>
        <Button onClick={handleClick}>About Me</Button>
        <Button onClick={handleClick}>Advance Care planning</Button>
        <Button onClick={handleClick}>ResPECT</Button>
        <Button onClick={handleClick}>Frailty assessment</Button>
        <Button onClick={handleClick}>Transfer assessment</Button>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>{`Better Embedded Forms`}</title>
        <meta name="description" content={`Better Embedded Forms`} />
      </Helmet>
      <AppBarSubpage header={`Better Embedded Forms`}>
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
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={12} md={12}>
              {' '}
              {formButtons()}
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Box p={1} width="100%">
                <Iframe
                  url={formUrl}
                  width="100%"
                  height="800"
                  id="myId"
                  className="myClassname"
                  position="relative"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
