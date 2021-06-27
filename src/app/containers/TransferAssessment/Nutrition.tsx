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
import { nutritionData } from './datamodels/nutrition-aql.json';
import { NutritionChart } from './NutritionChart';

export function Nutrition() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));
  const large = useMediaQuery(theme.breakpoints?.up(1280));

  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const [open, setOpen] = React.useState(false);

  const covidStatus = useSelector(selectCovidStatus);
  const covideUpdateDate = useSelector(selectCovidStatusDate);

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

  function NutritionCard() {
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
            <NutritionChart />
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
                    defaultValue={new Date().toISOString().slice(0, 10)}
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
