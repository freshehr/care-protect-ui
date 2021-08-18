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
import CDRService from '../../../services/cdr/CDRService';

export function SmartEhr() {
  let partyId = '52';

  useInjectSaga({ key: sliceKey, saga: infectionControlSaga });
  useInjectReducer({ key: sliceKey, reducer });

  const cdrService = new CDRService('one-london');
  const [formUrl, setFormUrl] = useState<string>();
  const [formId, setFormId] = useState<string>();
  const [templateId, setTemplateId] = useState<string>('');
  const [formPresentationMode, setFormPresentationMode] = useState<boolean>(
    false,
  );
  const [ehrId, setEhrId] = useState<string>('');
  const [compositionId, setCompositionId] = useState<string>();

  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const id = (params as any)?.id;
  const classes = useStyles();

  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const patient = useSelector(selectPatient);

  const findEhr = async nhsNumber => {
    const partyId = 52;

    setEhrId(await cdrService.findEhrIdBySubjectId(partyId, 'default'));
  };

  findEhr(patient?.nhsnumber);

  useEffect(() => {
    // Good!
    if (!isLoading) {
      configFormUrl();
    }
  }, [formId, ehrId]);

  useEffect(() => {
    if (!isLoading) {
      findLatestComposition();
    }
  }, [ehrId, templateId]);

  const findLatestComposition = async () => {
    const aqlString = `SELECT c/archetype_details/template_id/value as templateId,
       c/uid/value as uid,
       e/ehr_id/value as ehrId
        FROM EHR e
        CONTAINS COMPOSITION c
        WHERE c/archetype_details/template_id/value = '${templateId}'
        AND e/ehr_id/value = '${ehrId}'
        ORDER BY c/context/start_time/value DESC
        OFFSET 0 LIMIT 1`;

    const resultSet = await cdrService.runQuery(aqlString);

    console.log('aql = ' + aqlString);
    if (resultSet !== undefined) {
      console.dir(resultSet);
      setCompositionId(resultSet[0].uid);
    }
  };

  const configFormUrl = async () => {
    try {
      const formApp = process.env.PUBLIC_URL + '/formrender.html';
      const formUrl =
        compositionId === undefined
          ? `${formApp}?ehrId=${ehrId}&form=${formId}&pMode=${formPresentationMode}`
          : `${formApp}?ehrId=${ehrId}&form=${formId}&pMode=${formPresentationMode}&uid=${compositionId}`;

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
            setFormPresentationMode(false);
          }}
        >
          About Me
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.closeButton}
          onClick={() => {
            setFormId('East Accord - End of Life Summary');
            setTemplateId('East Accord - End of life care plan');
            setFormPresentationMode(true);
          }}
        >
          EoL Summary
        </Button>

        <Button
          variant="contained"
          color="primary"
          className={classes.closeButton}
          onClick={() => {
            setFormId('East Accord - End of life care plan');
            setTemplateId('East Accord - End of life care plan');
            setFormPresentationMode(false);
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
            setTemplateId('East Accord - End of life care plan');
            setFormPresentationMode(false);
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
            setTemplateId('East Accord - End of life care plan');
            setFormPresentationMode(false);
          }}
        >
          Frailty assessment
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.closeButton}
          onClick={() => {
            setFormId('Care Protect plus demo');
            setTemplateId('East Accord - End of life care plan');
          }}
        >
          Care home assessment
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
