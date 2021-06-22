import React from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  DialogContent,
  DialogActions,
  Card,
  CardActions,
  CardContent,
  Slider,
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
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Line } from 'react-chartjs-2';
import { formatDate } from '../../../utils/formatters/time';

export function Nutrition() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));
  const large = useMediaQuery(theme.breakpoints?.up(1280));

  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const [open, setOpen] = React.useState(false);

  const covidStatus = useSelector(selectCovidStatus);
  const covideUpdateDate = useSelector(selectCovidStatusDate);

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

  const nutritionData = [
    {
      height: {
        magnitude: '156',
        units: 'cm',
        date: '2020-01-10T00:00:00.000Z',
      },
      weight: {
        magnitude: '52',
        units: 'kg',
        date: '2020-01-10T00:00:00.000Z',
      },
      bmi: {
        magnitude: '18.4',
        units: 'kg/cm2',
        date: '2020-01-10T00:00:00.000Z',
      },
      mustScore: {
        magnitude: '4',
        date: '2020-01-10T00:00:00.000Z',
      },
    },
    {
      height: {
        magnitude: '156',
        units: 'cm',
        date: '2020-02-10T00:00:00.000Z',
      },
      weight: {
        magnitude: '51.5',
        units: 'kg',
        date: '2020-02-10T00:00:00.000Z',
      },
      bmi: {
        magnitude: '21.1',
        units: 'kg/cm2',
        date: '2020-02-10T00:00:00.000Z',
      },
      mustScore: {
        magnitude: '1',
        date: '2020-02-10T00:00:00.000Z',
      },
    },
    {
      height: {
        magnitude: '156',
        units: 'cm',
        date: '2020-03-10T00:00:00.000Z',
      },
      weight: {
        magnitude: '52.2',
        units: 'kg',
        date: '2020-03-10T00:00:00.000Z',
      },
      bmi: {
        magnitude: '21.4',
        units: 'kg/cm2',
        date: '2020-03-10T00:00:00.000Z',
      },
      mustScore: {
        magnitude: '0',
        date: '2020-03-10T00:00:00.000Z',
      },
    },
    {
      height: {
        magnitude: '156',
        units: 'cm',
        date: '2020-04-10T00:00:00.000Z',
      },
      weight: {
        magnitude: '52.5',
        units: 'kg',
        date: '2020-04-10T00:00:00.000Z',
      },
      bmi: {
        magnitude: '21.5',
        units: 'kg/cm2',
        date: '2020-04-10T00:00:00.000Z',
      },
      mustScore: {
        magnitude: '0',
        date: '2020-04-10T00:00:00.000Z',
      },
    },
    {
      height: {
        magnitude: '156',
        units: 'cm',
        date: '2020-05-10T00:00:00.000Z',
      },
      weight: {
        magnitude: '51.7',
        units: 'kg',
        date: '2020-05-10T00:00:00.000Z',
      },
      bmi: {
        magnitude: '21.2',
        units: 'kg/cm2',
        date: '2020-05-10T00:00:00.000Z',
      },
      mustScore: {
        magnitude: '0',
        date: '2020-05-10T00:00:00.000Z',
      },
    },
    {
      height: {
        magnitude: '156',
        units: 'cm',
        date: '2020-06-10T00:00:00.000Z',
      },
      weight: {
        magnitude: '51.0',
        units: 'kg',
        date: '2020-06-10T00:00:00.000Z',
      },
      bmi: {
        magnitude: '20.9',
        units: 'kg/cm2',
        date: '2020-06-10T00:00:00.000Z',
      },
      mustScore: {
        magnitude: '0',
        date: '2020-06-10T00:00:00.000Z',
      },
    },
    {
      height: {
        magnitude: '156',
        units: 'cm',
        date: '2020-07-10T00:00:00.000Z',
      },
      weight: {
        magnitude: '49.8',
        units: 'kg',
        date: '2020-07-10T00:00:00.000Z',
      },
      bmi: {
        magnitude: '20.4',
        units: 'kg/cm2',
        date: '2020-07-10T00:00:00.000Z',
      },
      mustScore: {
        magnitude: '1',
        date: '2020-07-10T00:00:00.000Z',
      },
    },
    {
      height: {
        magnitude: '156',
        units: 'cm',
        date: '2020-08-10T00:00:00.000Z',
      },
      weight: {
        magnitude: '49.8',
        units: 'kg',
        date: '2020-08-10T00:00:00.000Z',
      },
      bmi: {
        magnitude: '20.4',
        units: 'kg/cm2',
        date: '2020-08-10T00:00:00.000Z',
      },
      mustScore: {
        magnitude: '1',
        date: '2020-08-10T00:00:00.000Z',
      },
    },
    {
      height: {
        magnitude: '156',
        units: 'cm',
        date: '2020-09-10T00:00:00.000Z',
      },
      weight: {
        magnitude: '47.6',
        units: 'kg',
        date: '2020-09-10T00:00:00.000Z',
      },
      bmi: {
        magnitude: '19.5',
        units: 'kg/cm2',
        date: '2020-09-10T00:00:00.000Z',
      },
      mustScore: {
        magnitude: '2',
        date: '2020-09-10T00:00:00.000Z',
      },
    },
    {
      height: {
        magnitude: '156',
        units: 'cm',
        date: '2020-10-10T00:00:00.000Z',
      },
      weight: {
        magnitude: '46.6',
        units: 'kg',
        date: '2020-10-10T00:00:00.000Z',
      },
      bmi: {
        magnitude: '19.1',
        units: 'kg/cm2',
        date: '2020-10-10T00:00:00.000Z',
      },
      mustScore: {
        magnitude: '3',
        date: '2020-10-10T00:00:00.000Z',
      },
    },
    {
      height: {
        magnitude: '156',
        units: 'cm',
        date: '2020-11-10T00:00:00.000Z',
      },
      weight: {
        magnitude: '45.5',
        units: 'kg',
        date: '2020-11-10T00:00:00.000Z',
      },
      bmi: {
        magnitude: '18.6',
        units: 'kg/cm2',
        date: '2020-11-10T00:00:00.000Z',
      },
      mustScore: {
        magnitude: '3',
        date: '2020-11-10T00:00:00.000Z',
      },
    },
    {
      height: {
        magnitude: '156',
        units: 'cm',
        date: '2020-12-10T00:00:00.000Z',
      },
      weight: {
        magnitude: '45',
        units: 'kg',
        date: '2020-12-10T00:00:00.000Z',
      },
      bmi: {
        magnitude: '18.4',
        units: 'kg/cm2',
        date: '2020-12-10T00:00:00.000Z',
      },
      mustScore: {
        magnitude: '4',
        date: '2020-12-10T00:00:00.000Z',
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
        label: 'Weight',
        data: nutritionData.map(function (nutrition) {
          return nutrition.weight.magnitude;
        }),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y',
      },
      {
        label: 'MUST Score',
        data: nutritionData.map(function (nutrition) {
          return nutrition.mustScore.magnitude;
        }),
        fill: false,
        backgroundColor: 'rgb(39, 129, 37)',
        borderColor: 'rgba(39, 129, 37, 0.2)',
        yAxisID: 'y1',
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
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        min: 0,
        max: 10,

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  };

  const LineChart = () => (
    <>
      <h1>Nutrition</h1>
      <Line data={lineData} options={options} type={'bar'} />
    </>
  );

  function NutritionCard() {
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
              Weight: {nutritionData[11].weight.magnitude}{' '}
              {nutritionData[11].weight.units} on{' '}
              {formatDate(nutritionData[11].weight.date)}{' '}
            </li>
            <li>
              {' '}
              Height: {nutritionData[11].height.magnitude}{' '}
              {nutritionData[11].height.units} on{' '}
              {formatDate(nutritionData[11].height.date)}{' '}
            </li>
            <li>
              {' '}
              MUST score: {nutritionData[11].mustScore.magnitude} on{' '}
              {formatDate(nutritionData[11].mustScore.date)}{' '}
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

  const today: string = new Date().toISOString().slice(0, 10);

  console.log(today);
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
            <NutritionCard />
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="title" onClose={handleClose}>
          <Typography component="div" noWrap variant="h6">
            Update Nutrition Record
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
                  <TextField
                    size="small"
                    label="Date"
                    name={'date'}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    type="date"
                    variant="outlined"
                    defaultValue={today}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    label="Height"
                    name={'height'}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    label="Weight"
                    name={'weight'}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography id="discrete-slider-small-steps" gutterBottom>
                    MUST score
                  </Typography>
                  <Slider
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    valueLabelDisplay="on"
                    marks
                    min={0}
                    max={10}
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
