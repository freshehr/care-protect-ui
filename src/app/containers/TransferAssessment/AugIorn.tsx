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
  TextField,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCovidStatusDate,
  selectDayOfIsolation,
  selectID,
  selectIsolationDays,
  selectIsolationReason,
  selectIsolationStatus,
  selectResultCS,
} from './selectors';
import { actions } from './slice';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Dialog, DialogTitle, Spinner } from 'components';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../../utils/formatters/time';

import { AugIornChart } from './AugIornChart';

import VeryFit from '../Assessment/isbarContent/assests/very-fit.jpeg';
import Well from '../Assessment/isbarContent/assests/well.jpeg';
import ManagingWell from '../Assessment/isbarContent/assests/managing-well.jpeg';
import Vulnerable from '../Assessment/isbarContent/assests/vulnerable.jpeg';
import MildlyFrail from '../Assessment/isbarContent/assests/mildly-frail.jpeg';
import ModeratelyFrail from '../Assessment/isbarContent/assests/moderately-frail.jpeg';
import SeverelyFrail from '../Assessment/isbarContent/assests/severely-frail.jpeg';
import VerySeverelyFrail from '../Assessment/isbarContent/assests/very-severely-frail.jpeg';
import TerminallyIll from '../Assessment/isbarContent/assests/terminally-ill.jpeg';
import { AugIornCard } from './AugIornCard';

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

export function AugIorn(props: { resultSet: any }) {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints?.between('xs', 'sm'));
  const large = useMediaQuery(theme.breakpoints?.up(1280));

  const id = useSelector(selectID);
  const result = useSelector(selectResultCS);
  const { pending, success, error } = result;
  const { control, handleSubmit, watch } = useForm();

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (success) {
      dispatch(actions.loadInfectionControl(id));
      setOpen(false);
    }
  }, [success, id, dispatch]);

  const resultSet = props.resultSet;

  if (resultSet === undefined || resultSet.length == 0) return null;

  const augIornData: any = resultSet.map(row => {
    console.dir(resultSet);

    const out: any = {
      cfs: {
        code: row[11],
        value: row[10],
        terminology: 'local',
        ordinal: row[6],
        date: row[2],
      },
      adlScore: {
        magnitude: 4,
        date: row[2],
      },
      group: {
        code: row[7],
        value: row[8],
        terminology: 'local',
        ordinal: row[8].charCodeAt(0) - 65,
        date: row[2],
      },
    };

    return out;
  });

  const onSubmit = data => {};

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      style={{ height: `${small ? 'auto' : large ? '100%' : '800px'}` }}
    >
      <Grid item>
        <AugIornChart augIornData={augIornData} />
        <AugIornCard augIornData={augIornData} />
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
}
