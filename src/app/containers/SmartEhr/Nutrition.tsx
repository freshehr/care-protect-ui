import React from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  DialogContent,
  DialogActions,
  FormLabel,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

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

  const nutrition = [
    {
      height: {
        magnitude: '137',
        units: 'cm',
        date: '2021-03-01',
      },
      weight: {
        magnitude: '137',
        units: 'cm',
        date: '2021-03-01',
      },
      bmi: {
        magnitude: '137',
        units: 'kg/cm2',
        date: '2021-03-01',
      },
      mustScore: {
        magnitude: '137',
        date: '2021-03-01',
      },
    },
  ];

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

  const columns = [
    {
      field: 'height',
      headerName: 'Height',
      type: 'number',
      width: 160,
    },
    {
      field: 'weight',
      headerName: 'Weight',
      type: 'number',
      width: 160,
    },
    {
      field: 'bmi',
      headerName: 'BMI',
      width: 160,
    },
  ];

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
              <Typography variant="subtitle2">
                <Box fontWeight={1000}>
                  <DataGrid rows={[]} columns={columns} pageSize={5} />
                </Box>
              </Typography>
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
