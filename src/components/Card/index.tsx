import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IAssessmentIcons } from 'types';

import {
  CardHeader,
  CardActions,
  Box,
  IconButton,
  CardActionArea,
  Divider,
  Typography,
} from '@material-ui/core';
import MuiCardContent from '@material-ui/core/CardContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useTheme } from '@material-ui/core/styles';

import { useStyles } from './style';
import clsx from 'clsx';

import NewCareEventDialog from '../NewCareEventDialog';
import LatestResponse from './LatestResponse';

const Record = withStyles({
  root: {
    paddingTop: 0,
    paddingRight: '16px',
    paddingBottom: '16px',
  },
})(MuiCardContent);

interface Props {
  name?: string;
  identifier?: string;
  id?: string;
  children?: JSX.Element;
  assesments?: IAssessmentIcons;
}

const Card: React.FC<Props> = ({
  name,
  identifier,
  assesments,
  children,
  id,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const history = useHistory();
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.up('md'));
  const latestResponseBar = (
    <LatestResponse sm={!sm} assessments={assesments} id={id} />
  );

  const redirectToPatientOverview = () =>
    history.push(`/patient-overview/${id}`);
  return (
    <>
      <Box className={clsx(classes.card, classes.roundedCorners)}>
        <CardHeader
          title={
            <CardActionArea onClick={redirectToPatientOverview}>
              <Typography
                variant="h5"
                display="block"
                style={{
                  fontSize: '1.25rem',
                  fontFamily: "'Cabin', sans-serif",
                  fontWeight: 400,
                  lineHeight: '1.334',
                }}
              >
                {name}
              </Typography>
            </CardActionArea>
          }
          subheader={
            <CardActionArea onClick={redirectToPatientOverview}>
              <Typography
                style={{
                  fontSize: '1rem',
                  fontFamily: "'Cabin', sans-serif",
                  fontWeight: 400,
                  lineHeight: '1.5',
                }}
                variant="body1"
                color="textSecondary"
              >
                {identifier}
              </Typography>
            </CardActionArea>
          }
          action={
            <CardActions disableSpacing>
              {sm && latestResponseBar}
              <Divider orientation="vertical" flexItem />
              <IconButton edge={'end'} onClick={handleOpen}>
                <MoreVertIcon />
              </IconButton>
            </CardActions>
          }
        />
        {children && (
          <CardActionArea onClick={redirectToPatientOverview}>
            <Record className={classes.rootContent}>{children}</Record>
          </CardActionArea>
        )}
        {!sm && (
          <>
            <Divider variant="middle" />

            <CardActions>{latestResponseBar}</CardActions>
          </>
        )}
      </Box>
      {open && (
        <NewCareEventDialog
          open={open}
          handleClose={handleClose}
          title={name}
          identifier={identifier || ''}
          id={id || ''}
        />
      )}
    </>
  );
};

export default Card;
export * from './Record';
