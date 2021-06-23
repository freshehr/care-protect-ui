import React from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  FormLabel,
  DialogActions,
  DialogContent,
  Card,
  CardContent,
  CardActions,
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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Dialog, NativeSelect, DialogTitle, Spinner } from 'components';
import { useForm } from 'react-hook-form';
import { Line } from 'react-chartjs-2';
import { formatDate } from '../../../utils/formatters/time';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const iornData = [
  {
    cfs: {
      code: 'Moderate',
      value: 'at0005',
      terminology: 'local',
      ordinal: 6,
      date: '2020-01-10T00:00:00.000Z',
    },
    adlScore: {
      magnitude: 4,
      date: '2020-01-10T00:00:00.000Z',
    },
    group: {
      code: 'at0004',
      value: 'C',
      terminology: 'local',
      ordinal: 3,
      date: '2020-01-10T00:00:00.000Z',
    },
  },
  {
    cfs: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      ordinal: 6,
      date: '2020-02-10T00:00:00.000Z',
    },
    adlScore: {
      magnitude: 3,
      date: '2020-02-10T00:00:00.000Z',
    },
    group: {
      code: 'C',
      value: 'at0005',
      terminology: 'local',
      ordinal: 3,
      date: '2020-02-10T00:00:00.000Z',
    },
  },
  {
    cfs: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      ordinal: 6,
      date: '2020-03-10T00:00:00.000Z',
    },
    adlScore: {
      magnitude: 2,
      date: '2020-03-10T00:00:00.000Z',
    },
    group: {
      code: 'A',
      value: 'A',
      terminology: 'local',
      ordinal: 1,
      date: '2020-03-10T00:00:00.000Z',
    },
  },
  {
    cfs: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      ordinal: 6,
      date: '2020-04-10T00:00:00.000Z',
    },
    adlScore: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      magnitude: 1,
      date: '2020-04-10T00:00:00.000Z',
    },
    group: {
      code: 'A',
      value: 'A',
      terminology: 'local',
      ordinal: 1,
      date: '2020-04-10T00:00:00.000Z',
    },
  },
  {
    cfs: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      ordinal: 6,
      date: '2020-05-10T00:00:00.000Z',
    },
    adlScore: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      magnitude: 2,
      date: '2020-05-10T00:00:00.000Z',
    },
    group: {
      code: 'A',
      value: 'A',
      terminology: 'local',
      ordinal: 1,
      date: '2020-05-10T00:00:00.000Z',
    },
  },
  {
    cfs: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      ordinal: 6,
      date: '2020-06-10T00:00:00.000Z',
    },
    adlScore: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      magnitude: 4,
      date: '2020-06-10T00:00:00.000Z',
    },
    group: {
      code: 'A',
      value: 'D',
      terminology: 'local',
      ordinal: 4,
      date: '2020-06-10T00:00:00.000Z',
    },
  },
  {
    cfs: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      ordinal: 6,
      date: '2020-07-10T00:00:00.000Z',
    },
    adlScore: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      magnitude: 3,
      date: '2020-07-10T00:00:00.000Z',
    },
    group: {
      code: 'A',
      value: 'D',
      terminology: 'local',
      ordinal: 4,
      date: '2020-07-10T00:00:00.000Z',
    },
  },
  {
    cfs: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      ordinal: 6,
      date: '2020-08-10T00:00:00.000Z',
    },
    adlScore: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      magnitude: 6,
      date: '2020-08-10T00:00:00.000Z',
    },
    group: {
      code: 'A',
      value: 'E',
      terminology: 'local',
      ordinal: 5,
      date: '2020-08-10T00:00:00.000Z',
    },
  },
  {
    cfs: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      ordinal: 6,
      date: '2020-09-10T00:00:00.000Z',
    },
    adlScore: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      magnitude: 6,
      date: '2020-09-10T00:00:00.000Z',
    },
    group: {
      code: 'A',
      value: 'E',
      terminology: 'local',
      ordinal: 5,
      date: '2020-09-10T00:00:00.000Z',
    },
  },
  {
    cfs: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      ordinal: 7,
      date: '2020-10-10T00:00:00.000Z',
    },
    adlScore: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      magnitude: 6,
      date: '2020-10-10T00:00:00.000Z',
    },
    group: {
      code: 'A',
      value: 'F',
      terminology: 'local',
      ordinal: 6,
      date: '2020-10-10T00:00:00.000Z',
    },
  },
  {
    cfs: {
      code: '840544004',
      value: 'Severe',
      terminology: 'local',
      ordinal: 8,
      date: '2020-11-10T00:00:00.000Z',
    },
    adlScore: {
      code: '840544004',
      value: 'at0005',
      terminology: 'local',
      magnitude: 7,
      date: '2020-11-10T00:00:00.000Z',
    },
    group: {
      code: 'A',
      value: 'G',
      terminology: 'local',
      ordinal: 7,
      date: '2020-11-10T00:00:00.000Z',
    },
  },
  {
    cfs: {
      code: '840544004',
      value: 'Severe',
      terminology: 'local',
      ordinal: 8,
      date: '2020-12-10T00:00:00.000Z',
    },
    adlScore: {
      code: '840544004',
      value: 'at00',
      terminology: 'local',
      magnitude: 8,
      date: '2020-12-10T00:00:00.000Z',
    },
    group: {
      code: 'A',
      value: 'G',
      terminology: 'local',
      ordinal: 7,
      date: '2020-12-10T00:00:00.000Z',
    },
  },
];

const lineData = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Ap',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      label: 'ADL score',
      data: iornData.map(function (iorn) {
        return iorn.adlScore.magnitude;
      }),
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
      yAxisID: 'y',
      min: 1,
      max: 15,
    },
    {
      label: 'Frailty',
      data: iornData.map(function (iorn) {
        return iorn.cfs.ordinal;
      }),
      fill: false,
      backgroundColor: 'rgb(39, 129, 37)',
      borderColor: 'rgba(39, 129, 37, 0.2)',
      yAxisID: 'y',
    },
    {
      label: 'Augmented IORN Group',
      data: iornData.map(function (iorn) {
        return [iorn.group.ordinal - 0.5, iorn.group.ordinal + 0.5];
      }),
      fill: false,
      backgroundColor: 'rgb(33,55,221)',
      borderColor: 'rgba(33,55,221, 0.2)',
      yAxisID: 'y1',
      type: 'bar',
    },
  ],
};

const options = {
  responsive: true,
  stacked: false,
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'right',
      title: {
        display: true,
        text: 'CFS / ADL',
      },
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'left',
      ticks: {
        callback: label => {
          console.log(label);
          return label < 1 ? '' : String.fromCharCode(label + 64);
        },
      },

      // grid line settings
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
      title: {
        display: true,
        text: 'Augmented IoRN Group',
      },
    },
  },
};

const LineChart = () => (
  <>
    <h1>Augmented IORN</h1>
    <Line data={lineData} options={options} type={'bar'} />
  </>
);

/*const formatDate = (isoDate: any) =>{
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  }).format(date)
}*/

export function IornAugmented() {
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

  function IornCard() {
    const classes = useStyles();

    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Most recent records
          </Typography>
          <Typography variant="body2" component="p">
            <li>
              {' '}
              Frailty Score: {iornData[11].cfs.ordinal} {iornData[11].cfs.value}{' '}
              on {formatDate(iornData[11].cfs.date)}{' '}
            </li>
            <li>
              {' '}
              ADL Score: {iornData[11].adlScore.magnitude} on{' '}
              {formatDate(iornData[11].adlScore.date)}{' '}
            </li>
            <li>
              {' '}
              Augmented IoRN Group: {iornData[11].group.value} on{' '}
              {formatDate(iornData[11].group.date)}{' '}
            </li>
          </Typography>
        </CardContent>
        <CardActions>
          <Button.Secondary
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleOpen}
          >
            New record
          </Button.Secondary>
        </CardActions>
      </Card>
    );
  }

  return (
    <>
      <Grid
        container
        direction="column"
        justify="space-between"
        style={{ height: `${small ? 'auto' : large ? '100%' : '800px'}` }}
      >
        <Grid item>
          <Grid item>
            <LineChart />
          </Grid>
          <Grid item>
            <IornCard />
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
