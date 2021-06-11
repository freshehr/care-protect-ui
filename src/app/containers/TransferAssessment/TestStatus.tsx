import React from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  FormLabel,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { Button, Dialog, NativeSelect, DialogTitle, Spinner } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  selectTestRequestReason,
  selectCurrentTestRequest,
  selectResultCS,
  selectID,
} from './selectors';
import { actions } from './slice';

export function TestStatus() {
  const [open, setOpen] = React.useState(false);
  const [requestTest, setRequestTest] = React.useState(false);

  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));
  const upLG = useMediaQuery(theme.breakpoints?.up(1280));

  const testRequestReason = useSelector(selectTestRequestReason);
  const testRequestStatus = useSelector(selectCurrentTestRequest);

  const closeRequest = () => setRequestTest(false);
  const openRequest = () => setRequestTest(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { control, handleSubmit } = useForm();
  const {
    control: controlResult,
    handleSubmit: handleSubmitResult,
  } = useForm();
  const dispatch = useDispatch();

  const id = useSelector(selectID);
  const result = useSelector(selectResultCS);
  const { pending, success, error } = result;

  React.useEffect(() => {
    if (success) {
      dispatch(actions.loadInfectionControl(id));
      setOpen(false);
    }
  }, [success, id, dispatch]);

  const onSubmit = data => {
    const testRequest = {
      covidTestRequest: {
        reasonForRequest: data.reasonForRequest,
        status:
          testRequestStatus === 'Service request sent'
            ? {
                code: 'at0026',
                value: 'Service request sent',
                terminology: 'localy',
              }
            : {
                code: 'at0005',
                value: 'Service activity complete',
                terminology: 'local',
              },
        statusTime: Date.now(),
      },
    };
    const testResult = {
      covidTestResult: {
        testResult:
          data.testResult === 'Positive'
            ? {
                code: '1300721000000109',
                value: 'COVID-19 confirmed by laboratory test',
                terminology: 'SNOMED-CT',
              }
            : {
                code: '1321111000000101',
                value: 'COVID-19 excluded by laboratory test',
                terminology: 'SNOMED-CT',
              },
        specimenTakenTime: Date.now(),
      },
    };
    dispatch(actions.pending({ ...testRequest, ...testResult }));
  };

  return (
    <>
      <Grid
        container
        justify="space-between"
        spacing={2}
        style={{ height: `${small ? 'auto' : upLG ? '245px' : '450px'}` }}
      >
        <Grid item lg={6} xs={12}>
          <Grid
            container
            direction="column"
            justify="space-between"
            style={{ height: `${small ? 'auto' : upLG ? '249px' : '225px'}` }}
            spacing={1}
          >
            <Grid item>
              <FormLabel component="legend">Testing</FormLabel>
            </Grid>
            <Grid item>
              <TextField
                size="small"
                id="read-only-input-test"
                label="Current Test Status"
                defaultValue={testRequestStatus || 'No tests requested'}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                id="read-only-input-reason"
                label="Test Reason"
                defaultValue={testRequestReason || 'N/A'}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                id="read-only-input-test-date"
                label="Date Last Updated"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={'2021-01-15' || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid>
              <Box mt={1}>
                <Button.Secondary
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={openRequest}
                >
                  Request Test
                </Button.Secondary>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Grid
            container
            direction="column"
            justify="space-between"
            style={{ height: `${small ? 'auto' : upLG ? '253px' : '225px'}` }}
            spacing={1}
          >
            <Grid item>
              <FormLabel component="legend">Test Result</FormLabel>
            </Grid>
            <Grid item>
              <TextField
                size="small"
                id="read-only-input-test-recent"
                label="Most Recent Result"
                defaultValue="Negative"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                id="read-only-input"
                label="Date Last Result Received"
                type="date"
                defaultValue="2021-01-15"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item>
              <Box mt={1}>
                <Button.Secondary
                  color="secondary"
                  variant="outlined"
                  onClick={handleOpen}
                >
                  Update Status
                </Button.Secondary>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={requestTest} onClose={closeRequest}>
        <DialogTitle id="title" onClose={closeRequest}>
          <Typography component="div" noWrap variant="h6">
            Request Test
          </Typography>
        </DialogTitle>

        <DialogContent>
          {error && <p>{error}</p>}
          {pending && <Spinner />}

          <Box m={4}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              <form id="test-status-form" onSubmit={handleSubmit(onSubmit)}>
                <NativeSelect
                  id="test-reason-select"
                  options={[
                    { value: 'Symptoms', label: 'Symptoms' },

                    { value: 'Recovery Check', label: 'Recovery Check' },
                    {
                      value: 'Contact with symptoms',
                      label: 'Contact with symptoms',
                    },
                    { value: 'Routine Test', label: 'Routine Test' },
                    { value: 'No test requested', label: 'No test requested' },
                  ]}
                  label="Reason for test"
                  name="reasonForRequest"
                  control={control}
                  defaultValue={'No test requested' || 'N/A'}
                />
              </form>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            spacing={2}
          >
            <Grid item>
              <Button.Primary onClick={closeRequest}>Cancel</Button.Primary>
            </Grid>
            <Grid item>
              <Button.Secondary
                variant="contained"
                type="submit"
                form="test-status-form"
              >
                Confirm
              </Button.Secondary>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="title" onClose={handleClose}>
          <Typography variant="h6">Update Test Result</Typography>
        </DialogTitle>

        <DialogContent>
          <Box m={4}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              <form
                id="test-result-form"
                onSubmit={handleSubmitResult(onSubmit)}
              >
                <NativeSelect
                  id="test-result-select"
                  options={[
                    { value: 'Positive', label: 'Positive' },

                    { value: 'Negative', label: 'Negative' },
                  ]}
                  label="Test Result"
                  name="testResult"
                  control={controlResult}
                  defaultValue="Negative"
                />
              </form>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            spacing={2}
          >
            <Grid item>
              <Button.Primary onClick={handleClose}>Cancel</Button.Primary>
            </Grid>
            <Grid item>
              <Button.Secondary
                variant="contained"
                form="test-result-form"
                type="submit"
              >
                Confirm
              </Button.Secondary>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
