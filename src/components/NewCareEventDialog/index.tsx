import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAssessmentType } from 'store/assessmentTypeReducer';

import {
  Grid,
  Typography,
  DialogContent,
  Divider,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from '../Button';
import Dialog from '../Dialog';
import { DialogTitle } from '../Dialog/DialogTitle';

const useStyles = makeStyles({
  content: { padding: 24 },
});
interface Props {
  open: boolean;
  title?: string;
  id: string;
  identifier: string;
  handleClose: () => void;
}
const NewCareEventDialog: React.FC<Props> = ({
  open,
  handleClose,
  title = '',
  identifier,
  id,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [path, setPath] = React.useState<never | string>();

  React.useEffect(() => {
    if (path) {
      history.push(path);
    }
  }, [path, history]);

  const handleRedirect = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    const { value } = event.currentTarget as HTMLButtonElement;
    setPath(`/assessment/${id}/0/${value}`);
    history.push(`/assessment/${id}/0/${value}`);
    dispatch(setAssessmentType(value));
  };
  const dispatch = useDispatch();

  const redirectToProfile = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    history.push(`/patient-overview/${id}`);
  };
  const startCovidPathway = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    history.push(`/covid-management/${id}`);
  };

  const startTransferAssessment = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    history.push(`/transfer-assessment/${id}`);
  };

  const showSBRIDash = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    history.push(`/sbri-dash/${id}`);
  };

  const showImportExport = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    history.push(`/import-export/${id}`);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="title" onClose={handleClose}>
        <Typography component="div" noWrap variant="h5">
          {title}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {identifier}
        </Typography>
      </DialogTitle>

      <DialogContent className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button.Primary
              onClick={startCovidPathway}
              variant="outlined"
              fullWidth
            >
              Covid Pathway
            </Button.Primary>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button.Primary
              onClick={redirectToProfile}
              variant="outlined"
              fullWidth
            >
              Patient Details
            </Button.Primary>
          </Grid>
        </Grid>
        <Box mt={3} mb={3}>
          <Divider variant="middle" />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary" align="center">
              New Care Event:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button.Primary
              onClick={handleRedirect}
              variant="outlined"
              value="news2"
              fullWidth
            >
              Observation
            </Button.Primary>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button.Primary
              onClick={handleRedirect}
              variant="outlined"
              value="denwis"
              fullWidth
            >
              Concern
            </Button.Primary>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button.Primary
              onClick={handleRedirect}
              variant="outlined"
              value="sepsis"
              fullWidth
            >
              SEPSIS Screening
            </Button.Primary>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary" align="center">
              SBRI Platform demo:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {' '}
            <Button.Primary
              onClick={handleRedirect}
              variant="outlined"
              value="covid"
              fullWidth
            >
              COVID Assessment
            </Button.Primary>
          </Grid>
          <Grid item xs={12} sm={6}>
            {' '}
            <Button.Primary
              onClick={startTransferAssessment}
              variant="outlined"
              value="transfer"
              fullWidth
            >
              Transfer Assessment
            </Button.Primary>
          </Grid>
          <Grid item xs={12} sm={6}>
            {' '}
            <Button.Primary
              onClick={showSBRIDash}
              variant="outlined"
              value="sbridash"
              fullWidth
            >
              SBRI Dashboard
            </Button.Primary>
          </Grid>
          <Grid item xs={12} sm={6}>
            {' '}
            <Button.Primary
              onClick={showImportExport}
              variant="outlined"
              value="importexport"
              fullWidth
            >
              Interoperability
            </Button.Primary>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default NewCareEventDialog;
