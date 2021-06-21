import React from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  FormLabel,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsolationStatus,
  selectIsolationReason,
  selectCovidStatusDate,
  selectIsolationDays,
  selectDayOfIsolation,
  selectResultCS,
  selectID,
} from './selectors';
import { actions } from './slice';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Dialog, NativeSelect, DialogTitle, Spinner } from 'components';
import { useForm } from 'react-hook-form';

const iorn2 = {
  adl: {
    code: '840544004',
    value: 'at0005',
    terminology: 'local',
    ordinal: 3,
  },
  pcfp: {
    code: '840544004',
    value: 'at0005',
    terminology: 'local',
    ordinal: 6,
  },
  mwab: {
    code: '840544004',
    value: 'at0005',
    terminology: 'local',
    ordinal: 3,
  },
  group: {
    code: '840544004',
    value: 'at0005',
    terminology: 'local',
    ordinal: 12,
  },
};
export function Iorn2() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));
  const large = useMediaQuery(theme.breakpoints?.up(1280));

  const isolationReason = useSelector(selectIsolationReason);
  const isolationStatus = useSelector(selectIsolationStatus);
  const updateDate = useSelector(selectCovidStatusDate);
  const isolationDays = useSelector(selectIsolationDays);
  const dayOfIsolation = useSelector(selectDayOfIsolation);

  const id = useSelector(selectID);
  const result = useSelector(selectResultCS);
  const { pending, success, error } = result;
  const { control, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [isolated, setIsolated] = React.useState(false);

  React.useEffect(() => {
    if (success) {
      dispatch(actions.loadInfectionControl(id));
      setOpen(false);
    }
  }, [success, id, dispatch]);

  React.useEffect(() => {
    const value = watch('isolationStatus') || isolationStatus;
    if ((value && value === 'Isolating') || value === 'Isolating Completed') {
      setIsolated(true);
    } else setIsolated(false);
  }, [watch, isolationStatus]);

  const onSubmit = data => {
    const end = new Date(data.isolationEndDate);
    const startDate = end.getDate() - parseInt(isolationDays);

    //  dispatch(actions.pending(isolation));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Grid
        container
        direction="column"
        justify="space-between"
        style={{ height: `${small ? 'auto' : large ? '245px' : '450px'}` }}
      >
        <Grid item>
          <Grid container justify="flex-start" alignItems="stretch" spacing={2}>
            <Grid item xs={12}>
              <FormLabel component="legend">Iorn2</FormLabel>
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                size="small"
                id="read-only-input-isolation-days"
                label="ADL score"
                value={iorn2.adl.ordinal || ''}
                // defaultValue={isolationStatus}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                size="small"
                id="outlined-read-only-input"
                label="PCFP score"
                value={iorn2.pcfp.ordinal || ''}
                // defaultValue={isolationReason}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                size="small"
                id="read-only-input-isolation-date"
                label="MWB score"
                type="numeric"
                InputLabelProps={{ shrink: true }}
                value={iorn2.mwab.ordinal || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                size="small"
                id="outlined-read-only-input"
                label="Group"
                type="string"
                defaultValue={'B3'}
                value={iorn2.group.value || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                <Box fontWeight={500}></Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="title" onClose={handleClose}>
          <Typography component="div" noWrap variant="h6">
            Update Isolation Status
          </Typography>
        </DialogTitle>
        <DialogContent>
          {error && <p>{error}</p>}
          {pending && <Spinner />}
          <Box m={4}>
            <form id="isolation-status-form" onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                spacing={4}
              >
                <Grid item xs={12}>
                  <NativeSelect
                    id="isolation-status-select"
                    options={[
                      {
                        value: 'Isolation not required',
                        label: 'Isolation not required',
                      },

                      {
                        value: 'Isolating',
                        label: 'Isolating',
                      },
                      {
                        value: 'Isolating Completed',
                        label: 'Isolating Completed',
                      },
                    ]}
                    label="Isolation Status"
                    name="isolationStatus"
                    control={control}
                    defaultValue={'Isolating Completed' || ''}
                  />
                </Grid>

                {isolated && (
                  <>
                    <Grid item xs={12}>
                      <NativeSelect
                        id="isolation-reason-select"
                        options={[
                          {
                            value: 'Symptoms (10 days)',
                            label: 'Symptoms (10 days)',
                          },

                          {
                            value: 'Tested Positive (10 days)',
                            label: 'Tested Positive (10 days)',
                          },
                          {
                            value:
                              'Contact with Symptoms or Positive Case (14 days)',
                            label:
                              'Contact with Symptoms or Positive Case (14 days)',
                          },
                          {
                            value: 'Following discharge (14 days)',
                            label: 'Following discharge (14 days)',
                          },
                        ]}
                        label="Isolation Reason"
                        name="reasonForIsolation"
                        control={control}
                        defaultValue={'Tested Positive (10 days)'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        label="Isolation End Date"
                        name={'isolationEndDate'}
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        defaultValue={'2021-01-14'}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
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
                type="submit"
                form="isolation-status-form"
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
