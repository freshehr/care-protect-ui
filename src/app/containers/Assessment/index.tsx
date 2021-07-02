/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectSaga, useInjectReducer } from 'utils/redux-injectors';
import {
  assessmentTypeSelector,
  assessmentsTypesArraySelector,
  setAssessmentType,
} from 'store/assessmentTypeReducer';

import { assessmentEventSaga } from './saga';
import { sliceKey, actions, reducer } from './slice';
import { useHistory, useParams } from 'react-router-dom';
import { selectError, selectLoading, selectPatient } from './selectors';

import {
  DialogContent,
  DialogContentText,
  Box,
  Typography,
  IconButton,
} from '@material-ui/core';

import { useStyles } from './style';
import Header from '../Patient/Header';

import {
  Card,
  Record,
  AppBarSubpage,
  Spinner,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
} from 'components';
import ISBR from './ISBR';

export function Assessment() {
  useInjectSaga({ key: sliceKey, saga: assessmentEventSaga });
  useInjectReducer({ key: sliceKey, reducer });

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const id = (params as any)?.id;
  const obsType = (params as any)?.obsType;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const patient = useSelector(selectPatient);
  const assessmentType = useSelector(assessmentTypeSelector) || obsType;
  const assessmentsTypesArray: [] = useSelector(assessmentsTypesArraySelector);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(actions.cleanAssessment());
    dispatch(actions.loadRecord(id));
    updateAssessmentsTypesArray();
  });

  const updateAssessmentsTypesArray = () => {
    if (!include(assessmentsTypesArray, assessmentType)) {
      dispatch(setAssessmentType(assessmentType));
    }
  };

  const include = (assessmentsTypesArray: Array<string>, key: string) =>
    assessmentsTypesArray.includes(key);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cleanStore = () => {
    dispatch(actions.cleanAssessment());
  };
  const exitEvent = () => {
    cleanStore();
    history.push('/');
  };
  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <Spinner />;
  }
  const header = assessmentType.toUpperCase();
  return (
    <>
      <Helmet>
        <title>{`Assessment- ${header}`}</title>
        <meta name="description" content={`A Assessment Event- ${header}`} />
      </Helmet>

      <Header title={`Assessment: ${header}`} />

      <Box mr={1} ml={1}>
        <Card
          name={patient?.name}
          identifier={patient?.nhsnumber}
          assesments={patient?.assessment}
          id={patient?.id}
        >
          <Record
            birthDate={patient?.birthDate}
            gender={patient?.gender}
            location={patient?.location}
          />
        </Card>
      </Box>
      <Box className={classes.root}>
        <ISBR />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="title" onClose={handleClose}>
          <Typography component="div" noWrap variant="h6">
            Are you sure?
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            You will go back to the patient list and you will lose all filled
            out fields.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button.Primary onClick={handleClose} color="primary">
            Cancel
          </Button.Primary>
          <Button.Secondary
            color="primary"
            variant="contained"
            onClick={exitEvent}
          >
            Confirm
          </Button.Secondary>
        </DialogActions>
      </Dialog>
    </>
  );
}
