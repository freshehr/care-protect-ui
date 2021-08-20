/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectError, selectLoading, selectPatient } from './selectors';

import {
  Box,
  Grid,
  Button,
  IconButton,
  ButtonGroup,
  CircularProgress,
} from '@material-ui/core';
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
  const [formLoading, setFormLoading] = useState<boolean>(false);
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
  }, [formId, ehrId, compositionId]);

  useEffect(() => {
    if (!isLoading && templateId && ehrId) {
      findLatestComposition();
      setFormLoading(true);
    }
  }, [formUrl]);

  const findLatestComposition = async () => {
    const aqlString = `SELECT c/archetype_details/template_id/value as templateId,
       c/uid/value as uid,
       e/ehr_id/value as ehrId
        FROM EHR e
        contains version v
        CONTAINS COMPOSITION c
        WHERE c/archetype_details/template_id/value = '${templateId}'
        AND e/ehr_id/value = '${ehrId}'
        AND c TAGGED BY 'formName::${{ formId }}'
        ORDER BY v/commit_audit/time_committed desc
        OFFSET 0 LIMIT 1`;

    const resultSet = await cdrService.runQuery(aqlString);

    if (resultSet !== undefined) {
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
      console.log('Config form-loading', formLoading);
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
      <Grid item xs={12} sm={12} md={12}>
        <ButtonGroup color="primary" size="small">
          <Button
            variant="contained"
            color="primary"
            className={classes.closeButton}
            onClick={() => {
              setFormId('East Accord - End of Life Summary');
              setTemplateId('EA - End of life Care.v0');
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
              setTemplateId('Composed document');
              setFormPresentationMode(false);
            }}
          >
            EoL Care Plan
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.closeButton}
            onClick={() => {
              setFormId('East Accord - Respect v3');
              setTemplateId('EA - ReSPECT-3.v0');
              setFormPresentationMode(false);
            }}
          >
            ReSPECT
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.closeButton}
            onClick={() => {
              setFormId('EA - About Me.v0');
              setTemplateId('EA - About Me.v0');
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
              setFormId('OL - Frailty Care plan');
              setTemplateId('Composed document');
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
              setTemplateId('Care Protect Plus');
            }}
          >
            Care home assessment
          </Button>
        </ButtonGroup>
        {showSpinner()}
      </Grid>
    );
  };

  const showSpinner = () => {
    console.log('Show spinner', formLoading);
    return formLoading ? <CircularProgress /> : null;
  };

  const showIFrame = () => {
    if (formId && ehrId && formUrl)
      return (
        <Grid item xs={12} sm={12} md={12}>
          <Box p={1} width="100%">
            <Iframe
              url={formUrl}
              width="100%"
              height="800"
              id="myId"
              loading="lazy"
              onLoad={() => {
                setFormLoading(false);
              }}
              className="myClassname"
              position="relative"
            />
          </Box>
        </Grid>
      );
    else return null;
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
            {formButtons()}

            {showIFrame()}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
