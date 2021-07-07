import React from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  DialogActions,
  DialogContent,
  Grid,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { formatDate } from '../../../utils/formatters/time';
import { Button, Dialog, DialogTitle, Spinner } from '../../../components';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectID, selectResultCS } from './selectors';
import { actions } from './slice';

export function NutritionCard(props) {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const [open, setOpen] = React.useState(false);

  const result = useSelector(selectResultCS);

  const { pending, success, error } = result;

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  const onSubmit = data => dispatch(actions.pending(data));

  const useStyles = makeStyles({
    root: {
      minWidth: 100,
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

  // if (props.nutritionData === undefined || props.nutritionData.length == 0) return null

  const nutritionLatest = props.nutritionData[props.nutritionData.length - 1];

  return (
    <Grid>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="body2" component="p">
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Most recent records
            </Typography>
            <ul>
              <li>
                {' '}
                Weight: {nutritionLatest.weight.magnitude}{' '}
                {nutritionLatest.weight.units} on{' '}
                {formatDate(nutritionLatest.weight.date)}{' '}
              </li>
              <li>
                {' '}
                Height: {nutritionLatest.height.magnitude}{' '}
                {nutritionLatest.height.units} on{' '}
                {formatDate(nutritionLatest.height.date)}{' '}
              </li>
              <li>
                {' '}
                MUST score: {nutritionLatest.mustScore.magnitude} on{' '}
                {formatDate(nutritionLatest.mustScore.date)}{' '}
              </li>
            </ul>
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
            <form id="nutrition-status-form" onSubmit={onSubmit}>
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
    </Grid>
  );
}
