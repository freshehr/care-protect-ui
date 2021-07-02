import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
// import SituationIlnessStatment from './SituationIlnessStatment';
import Patient from '../../Patient';
import { useStyles } from '../styles';
import clsx from 'clsx';
// import SitutationBackground from './SituationBackground';
// import ContingencyPlanning from './ContingencyPlanning';
// import { useOverviewSlice } from '../slice';
import { PresentComplainsPreview } from './PresentComplains/Preview';
import { TaskListPreview } from './TaskList/Preview';
import { AssessmentOverviewPreview } from './AssessmentOverview/Prview';
import { Monitoring } from './Monitoring';
import { RecommendationsPreview } from './Recomendations/Preview';

const Sections = () => {
  //   const { actions } = useOverviewSlice();

  const classes = useStyles();
  const dispatch = useDispatch();

  //   React.useEffect(() => {
  //     dispatch(actions.loadSituationBackgrond());
  //     dispatch(actions.loadContingencyPlanning());
  //   }, [actions, dispatch]);

  return (
    <div className={classes.fullWidth}>
      <Box
        display="flex"
        flexWrap="nowrap"
        flexDirection="column"
        css={{ maxWidth: '100%' }}
        height="100%"
      >
        <Box width="100%">
          <Patient />
        </Box>
        <Box width="100%">
          <Grid container justify="center" direction="row">
            <Grid item xs={12} className={classes.section}>
              <TaskListPreview />
            </Grid>
            <Grid item xs={12} className={classes.section}>
              <PresentComplainsPreview />
              {/* <SitutationBackground /> */}
            </Grid>
            <Grid item xs={12} className={classes.section}>
              <AssessmentOverviewPreview />
            </Grid>
            <Grid item xs={12} className={classes.section}>
              <Monitoring />
            </Grid>
            <Grid item xs={12} className={classes.section}>
              <RecommendationsPreview />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};
export default Sections;
