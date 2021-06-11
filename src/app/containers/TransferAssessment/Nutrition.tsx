import React from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  DialogContent,
  DialogActions,
  FormLabel,
} from '@material-ui/core';
import {
  selectCovidStatus,
  selectCovidStatusDate,
  selectResultCS,
  selectID,
} from './selectors';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './slice';
import { Button, NativeSelect, Dialog, DialogTitle, Spinner } from 'components';
import { useForm } from 'react-hook-form';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export function Nutrition() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));
  const large = useMediaQuery(theme.breakpoints?.up(1280));

  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const [open, setOpen] = React.useState(false);

  const covidStatus = useSelector(selectCovidStatus);
  const covideUpdateDate = useSelector(selectCovidStatusDate);

  const height = '137';
  const heightDate = '2021-03-01';
  const weight = '62.3';
  const weightDate = '2021-03-01';
  const bmi = '22.3';
  const bmiDate = '2021-03-01';
  const must = '12';
  const mustDate = '2021-05-02';

  const id = useSelector(selectID);
  const result = useSelector(selectResultCS);
  const { pending, success, error } = result;

  React.useEffect(() => {
    if (success) {
      dispatch(actions.loadInfectionControl(id));
      setOpen(false);
    }
  }, [success, id, dispatch]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const onSubmit = data => dispatch(actions.pending(data));
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
              <FormLabel component="legend">Nutrition</FormLabel>
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                size="small"
                label="Height"
                value={height || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                name={'height'}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                id="read-only-input-height-date"
                label="Height date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={heightDate || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                size="small"
                name="heightDate"
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                size="small"
                label="Weight"
                value={weight || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                name={'weight'}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                id="read-only-input-weight-date"
                label="Weight Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={weightDate || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                size="small"
                name="weightDate"
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                size="small"
                label="BMI"
                value={bmi || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                name={'bmi'}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                id="read-only-input-bmi-date"
                label="BMI Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={bmiDate || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                size="small"
                name="weightDate"
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                size="small"
                label="MUST"
                value={must || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                name={'bmi'}
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <TextField
                id="read-only-input-must-date"
                label="MUST Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={mustDate || ''}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                size="small"
                name="weightDate"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item>
            <Box mt={1}>
              <Button.Secondary
                variant="outlined"
                color="secondary"
                onClick={handleOpen}
              >
                Update Status
              </Button.Secondary>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="title" onClose={handleClose}>
          <Typography component="div" noWrap variant="h6">
            Update Nutrition Status
          </Typography>
        </DialogTitle>
        <DialogContent>
          {error && <p>{error}</p>}
          {pending && <Spinner />}
          <Box m={4}>
            <form id="nutrition-status-form" onSubmit={handleSubmit(onSubmit)}>
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
                form="nutrition-status-form"
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
