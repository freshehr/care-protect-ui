import React from 'react';
import {
  Grid,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
} from '@material-ui/core';
import uniqid from 'uniqid';
import { Button, Carousel } from 'components';
import VitalSignsTable from 'app/containers/Assessment/isbarContent/response/VitalSignsTable';

import { useSelector } from 'react-redux';
import { fake } from 'utils/fake';
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
export const Monitoring = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints?.up('lg'));
  const maximize = () => console.log('a');
  const news2 = useSelector;

  return (
    <Box flexDirection="column" p={1} display="flex">
      <Typography
        gutterBottom
        align="center"
        variant="h6"
        color="textSecondary"
      >
        Monitoring
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
                  <CarouselCard
                    onClick={maximize}
                    title="Latest face to face monitoring vital signs"
                  >
                    <Box m={2}>
                      {' '}
                      <VitalSignsTable
                        flowRate={null}
                        news2={{
                          ...fake.ASSESSMENTS_RESULT.news2.news2.score,
                          systolicBloodPressure: {
                            code: 'at0017',
                            ordinal: 3,
                            value: '≤90',
                          },
                        }}
                      />
                    </Box>
                  </CarouselCard>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <CarouselCard
                    onClick={maximize}
                    title="Latest machine monitoring vital signs"
                  >
                    <Box m={2}>
                      <VitalSignsTable
                        flowRate={null}
                        news2={fake.ASSESSMENTS_RESULT.news2.news2.score}
                      />
                    </Box>
                  </CarouselCard>
                </Grid>
              </Grid>,
            ]
          : [
              <CarouselCard
                onClick={maximize}
                title="Latest face to face monitoring vital signs"
              >
                <VitalSignsTable
                  flowRate={null}
                  news2={fake.ASSESSMENTS_RESULT.news2.news2.score}
                />
              </CarouselCard>,

              <CarouselCard
                onClick={maximize}
                title="Latest machine monitoring vital signs"
              >
                <VitalSignsTable
                  flowRate={null}
                  news2={fake.ASSESSMENTS_RESULT.news2.news2.score}
                />
              </CarouselCard>,
            ]}
      </Carousel>
    </Box>
  );
};
const Wrapper = styled.div`
  height: 120px;
  overflow: hidden;
`;

const Card = styled.div``;
