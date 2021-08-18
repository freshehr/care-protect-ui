/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectError, selectLoading, selectPatient } from './selectors';

import { Box, Grid, Button, IconButton } from '@material-ui/core';
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

  const [formUrl, setFormUrl] = useState<string>();
  const [formId, setFormId] = useState<string>();
  const [ehrId, setEhrId] = useState<string>();
  const [compositionId, setCompositionId] = useState<string>();

  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const id = (params as any)?.id;
  const classes = useStyles();

  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const patient = useSelector(selectPatient);

  useEffect(() => {
    // Good!
    if (!isLoading) {
      configFormUrl();
    }
  }, [formId, ehrId]);

  const configFormUrl = async () => {
    try {
      const formApp = process.env.PUBLIC_URL + '/formrender.html';
      const formUrl =
        compositionId === undefined
          ? `${formApp}?ehrId=${ehrId}&form=${formId}`
          : `${formApp}?ehrId=${ehrId}&form=${formId}&uid=${compositionId}`;

      setFormUrl(formUrl);
      console.log('Setting url');
    } catch (e) {
      console.log(e.message);
    }
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(actions.loadRecord(id));
    setEhrId('02164170-e263-44c1-bd76-0871c62659c9');
  });

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
        <Button
          variant="contained"
          color="primary"
          className={classes.closeButton}
          onClick={() => {
            setFormId('EA - About Me.v0');
          }}
        >
          About Me
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.closeButton}
          onClick={() => {
            setFormId('East Accord - End of life care plan');
          }}
        >
          Advance Care planning
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.closeButton}
          onClick={() => {
            setFormId('East Accord - Respect v3');
          }}
        >
          ReSPECT form
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.closeButton}
          onClick={() => {
            setFormId('OL - Frailty Care plan');
          }}
        >
          Frailty assessment
        </Button>
      </>
    );
  };

  console.log('Rendering');
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

            {formId && ehrId && formUrl && (
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
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
