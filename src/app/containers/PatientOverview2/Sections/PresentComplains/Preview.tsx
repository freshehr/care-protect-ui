import React from 'react';
import {
  Grid,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
} from '@material-ui/core';
import uniqid from 'uniqid';
import { Carousel, Button } from 'components';
import { useHistory } from 'react-router';
import { Allergies } from './Allergies';
import { Respect } from './Respect';
import { HealthCondition } from './HealthCondition';
import { TreatmentsMedicines } from './TreatmentsMedicines';
import { AdmissionDetails } from './AdmissionDetails';

import styled from 'styled-components';

export const CarouselCard = ({ title, onClick, children }) => {
  return (
    <Card>
      <Box width="100%" p={1}>
        <Typography
          gutterBottom
          align="center"
          variant="subtitle1"
          color="textSecondary"
        >
          {title}
        </Typography>
        {children ? (
          <Wrapper> {children}</Wrapper>
        ) : (
          <Typography gutterBottom align="center">
            No data available
          </Typography>
        )}
      </Box>
      <Box width="100%" display="flex" justifyContent="center">
        <Button.Secondary onClick={onClick} disabled={false}>
          Show more
        </Button.Secondary>
      </Box>
    </Card>
  );
};

export const PresentComplainsPreview = () => {
  // const { actions } = useOverviewSlice();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints?.up('lg'));
  const history = useHistory();
  // const dispatch = useDispatch();

  //   const situationBackground = useSelector(selectSituationBackground);

  // React.useEffect(() => {
  //   dispatch(actions.loadSituationBackgrond());
  // }, [actions, dispatch]);

  //   const maximize = () =>
  //     history.push(`${history?.location?.pathname}/situation-background`);
  const maximize = () => console.log('s');
  return (
    <Box flexDirection="column">
      <Typography align="center" variant="h6" color="textSecondary">
        Presenting Complaint & Problems
      </Typography>
      <Carousel>
        {md
          ? [
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                key={uniqid()}
                spacing={1}
              >
                <Grid item lg={6} xs={12}>
                  <CarouselCard onClick={maximize} title="RESPECT">
                    <Box m={2}>
                      {' '}
                      <Respect />{' '}
                    </Box>
                  </CarouselCard>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <CarouselCard onClick={maximize} title="Health Condition">
                    <Box m={2}>
                      <HealthCondition />{' '}
                    </Box>
                  </CarouselCard>
                </Grid>
              </Grid>,
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                key={uniqid()}
                spacing={1}
              >
                <Grid item lg={6} xs={12}>
                  <CarouselCard
                    key={uniqid()}
                    onClick={maximize}
                    title="Allergies and Past Reactions"
                  >
                    {' '}
                    <Allergies />
                  </CarouselCard>
                </Grid>
                <Grid item lg={6} xs={12}>
                  <CarouselCard
                    key={uniqid()}
                    onClick={maximize}
                    title="Treatments and Medicines"
                  >
                    <TreatmentsMedicines />{' '}
                  </CarouselCard>
                  ,
                </Grid>
              </Grid>,
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                key={uniqid()}
                spacing={1}
              >
                <Grid item lg={6} xs={12}>
                  <CarouselCard
                    key={uniqid()}
                    onClick={maximize}
                    title="Admission details"
                  >
                    {' '}
                    <AdmissionDetails />
                  </CarouselCard>
                </Grid>
              </Grid>,
            ]
          : [
              <CarouselCard onClick={maximize} title="RESPECT">
                {' '}
                <Respect />{' '}
              </CarouselCard>,
              <CarouselCard onClick={maximize} title="Health Condition">
                <HealthCondition />{' '}
              </CarouselCard>,
              <CarouselCard
                key={uniqid()}
                onClick={maximize}
                title="Allergies and Past Reactions"
              >
                <Allergies />
              </CarouselCard>,

              <CarouselCard
                key={uniqid()}
                onClick={maximize}
                title="Treatments and Medicines"
              >
                <TreatmentsMedicines />{' '}
              </CarouselCard>,
              <CarouselCard
                key={uniqid()}
                onClick={maximize}
                title="Admission details"
              >
                {' '}
                <AdmissionDetails />
              </CarouselCard>,
            ]}
      </Carousel>
    </Box>
  );
};

const Wrapper = styled.div`
  height: 300px;
  overflow: hidden;
`;

const Card = styled.div`
  @media (min-width: 1280px) {
    background: #fafafa;
    margin: 8px;
    border-radius: 35px;
  }
`;
