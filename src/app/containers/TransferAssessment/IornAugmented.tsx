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
  InputAdornment,
  MenuItem,
  Avatar,
  ListItemText,
  Select,
  InputLabel,
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
import {
  Button,
  Dialog,
  NativeSelect,
  DialogTitle,
  Spinner,
  ErrorMsg,
} from 'components';
import { useForm } from 'react-hook-form';
import { Line } from 'react-chartjs-2';
import { formatDate } from '../../../utils/formatters/time';
import VeryFit from '../Assessment/isbarContent/assests/very-fit.jpeg';
import Well from '../Assessment/isbarContent/assests/well.jpeg';
import ManagingWell from '../Assessment/isbarContent/assests/managing-well.jpeg';
import Vulnerable from '../Assessment/isbarContent/assests/vulnerable.jpeg';
import MildlyFrail from '../Assessment/isbarContent/assests/mildly-frail.jpeg';
import ModeratelyFrail from '../Assessment/isbarContent/assests/moderately-frail.jpeg';
import SeverelyFrail from '../Assessment/isbarContent/assests/severely-frail.jpeg';
import VerySeverelyFrail from '../Assessment/isbarContent/assests/very-severely-frail.jpeg';
import TerminallyIll from '../Assessment/isbarContent/assests/terminally-ill.jpeg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import uniqid from 'uniqid';

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
      value: '8. Very Severely Frail',
      terminology: 'local',
      ordinal: 8,
      date: '2020-12-10T00:00:00.000Z',
    },
    adlScore: {
      code: '840544004',
      value: 'at0012',
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

const FRAILTY_OPTIONS = [
  {
    icon: VeryFit,
    label: '1. Very Fit',
    value: 'Very Fit',
    code: 'at0005',
    ordinal: 0,
  },
  { icon: Well, label: '2. Well', value: 'Well', code: 'at0006', ordinal: 1 },
  {
    icon: ManagingWell,
    label: '3. Managing Well',
    value: 'Managing Well',
    code: 'at0007',
    ordinal: 2,
  },
  {
    icon: Vulnerable,
    label: '4. Vurnerable',
    value: 'Vurnerable',
    code: 'at0008',
    ordinal: 3,
  },
  {
    icon: MildlyFrail,
    label: '5. Mildly Frail',
    value: 'Mildy Frail',
    code: 'at0009',
    ordinal: 4,
  },
  {
    icon: ModeratelyFrail,
    label: '6. Moderately Frail',
    value: 'Moderately Frail',
    code: 'at0010',
    ordinal: 5,
  },
  {
    icon: SeverelyFrail,
    label: '7. Severely Frail',
    value: 'Severely Frail',
    code: 'at0011',
    ordinal: 6,
  },
  {
    icon: VerySeverelyFrail,
    label: '8. Very SeverelyFrail',
    value: 'Very Severely Frail',
    code: 'at0012',
    ordinal: 7,
  },
  {
    icon: TerminallyIll,
    label: '9. Terminally Ill',
    value: 'Terminally Ill',
    code: 'at0013',
    ordinal: 8,
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
          return label < 1 ? '' : String.fromCharCode(label + 64); //Convert ordinal to A-G
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
    <h1>Augmented ioRN</h1>
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
              Frailty Score: {iornData[11].cfs.value} on{' '}
              {formatDate(iornData[11].cfs.date)}{' '}
            </li>
            <li>
              {' '}
              ADL Score: {iornData[11].adlScore.magnitude} on{' '}
              {formatDate(iornData[11].adlScore.date)}{' '}
            </li>
            <li>
              {' '}
              Augmented ioRN Group: {iornData[11].group.value} on{' '}
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
