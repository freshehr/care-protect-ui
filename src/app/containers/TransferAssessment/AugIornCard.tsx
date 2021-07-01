import React from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  DialogActions,
  DialogContent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
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
import { iornData } from './datamodels/augiorn-aql.json';

export function AugIornCard(props) {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const [open, setOpen] = React.useState(false);

  const result = useSelector(selectResultCS);

  const { pending, success, error } = result;

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const onSubmit = data => dispatch(actions.pending(data));

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

  if (props.augIornData?.length == 0) return null;

  const latestAugIornData = props.augIornData[props.augIornData.length - 1];

  return (
    <>
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
              Frailty Score: {latestAugIornData.cfs.value} [
              {latestAugIornData.cfs.ordinal}] on{' '}
              {formatDate(latestAugIornData.cfs.date)}{' '}
            </li>
            <li>
              {' '}
              ADL Score: {latestAugIornData.adlScore.magnitude} on{' '}
              {formatDate(latestAugIornData.adlScore.date)}{' '}
            </li>
            <li>
              {' '}
              Augmented ioRN Group: {latestAugIornData.group.value} on{' '}
              {formatDate(latestAugIornData.group.date)}{' '}
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
                  <TextField
                    size="small"
                    label="Date"
                    name={'iornDate'}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    size="small"
                    label="ADL Score"
                    name={'adl-score'}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel id="demo-simple-select-label">
                    Clinical Frailty Score
                  </InputLabel>
                  <Select
                    labelId="cfs"
                    id="cfs-select"
                    fullWidth
                    name={'cfs-score'}
                  >
                    <MenuItem value={'at0005'}>1. Very Fit</MenuItem>
                    <MenuItem value={'at0006'}>2. Well</MenuItem>
                    <MenuItem value={'at0007'}>3. Managing well</MenuItem>
                    <MenuItem value={'at0008'}>4. Vulnerable</MenuItem>
                    <MenuItem value={'at0009'}>5. Mildly Frail</MenuItem>
                    <MenuItem value={'at0010'}>6. Moderately Frail</MenuItem>
                    <MenuItem value={'at0011'}>7. Severely Frail</MenuItem>
                    <MenuItem value={'at0012'}>8. Very Severely Frail</MenuItem>
                    <MenuItem value={'at0013'}>9. Terminally Ill</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <InputLabel id="demo-simple-select-label">
                    ioRN Group
                  </InputLabel>
                  <Select
                    labelId="iornGroup"
                    id="group-select"
                    fullWidth
                    name={'iorn-group'}
                  >
                    <MenuItem value={'at0080'}>
                      A. Low Activities of Daily Living score + Low Risk &
                      Behavioural Support Needs score.
                    </MenuItem>
                    <MenuItem value={'at0081'}>
                      B. Low Activities of Daily Living score + High Risk &
                      Behavioural Support Needs score.
                    </MenuItem>
                    <MenuItem value={'at0082'}>
                      C. Medium Activities of Daily Living score + Low Risk &
                      Behavioural Support Needs score.
                    </MenuItem>
                    <MenuItem value={'at0083'}>
                      D. Medium Activities of Daily Living score + Medium Risk &
                      Behavioural Support Needs score.
                    </MenuItem>
                    <MenuItem value={'at0084'}>
                      E. Medium Activities of Daily Living score + High Risk &
                      Behavioural Support Needs score.
                    </MenuItem>
                    <MenuItem value={'at0085'}>
                      F. High Activities of Daily Living score + Low continence
                      score + Low Risk & Behavioural Support Needs score.
                    </MenuItem>
                    <MenuItem value={'at0086'}>
                      G. High Activities of Daily Living score + Low continence
                      score + High Risk & Behavioural Support Needs score.
                    </MenuItem>
                    <MenuItem value={'at0087'}>
                      H. High Activities of Daily Living score + High continence
                      score.
                    </MenuItem>
                  </Select>
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
